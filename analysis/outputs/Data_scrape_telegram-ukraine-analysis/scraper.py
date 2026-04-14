"""
Telegram channel scraper — sampled
Scrapes media-only messages, up to 1000 per channel per month (evenly spaced in time).

Usage:
  python3 scraper.py                                  # full range: 2022-02-24 to now
  python3 scraper.py --from 2022-02-24 --to 2023-12-31  # custom range
"""

import argparse
import asyncio
import json
import os
from pathlib import Path
from datetime import datetime, timezone

from dotenv import load_dotenv
from telethon import TelegramClient
from telethon.tl.types import (
    DocumentAttributeVideo,
    DocumentAttributeImageSize,
)

from database import (
    init_db, get_connection, get_last_scraped_id, update_progress,
    upsert_message, upsert_channel,
)

load_dotenv()

API_ID   = int(os.environ["TELEGRAM_API_ID"])
API_HASH = os.environ["TELEGRAM_API_HASH"]
PHONE    = os.environ["TELEGRAM_PHONE"]

CHANNELS = [
    "RVvoenkor",
    "rusich_army",
    "voenkorKotenok",
    "wargonzo",
    "donbassrealii",
    "ZA_FROHT",
    "kherson_non_fake",
    "a_shtirlitz",
    "hyevuy_dnepr",
    "voenacher",
]

MEDIA_DIR        = Path("data/media")
SAMPLE_PER_MONTH = 50
RATE_SLEEP       = 1.0
DEFAULT_START    = datetime(2022, 2, 24, tzinfo=timezone.utc)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _get_media_type(msg) -> str | None:
    if msg.photo:    return "photo"
    if msg.video:    return "video"
    if msg.voice:    return "voice"
    if msg.audio:    return "audio"
    if msg.sticker:  return "sticker"
    if msg.document: return "document"
    if msg.geo:      return "geo"
    return None


def _get_video_attrs(document) -> dict:
    for attr in document.attributes:
        if isinstance(attr, DocumentAttributeVideo):
            return {"duration": attr.duration, "width": attr.w, "height": attr.h}
    return {"duration": None, "width": None, "height": None}


def _get_image_attrs(document) -> dict:
    for attr in document.attributes:
        if isinstance(attr, DocumentAttributeImageSize):
            return {"width": attr.w, "height": attr.h, "duration": None}
    return {"width": None, "height": None, "duration": None}


def _get_reactions(msg) -> str | None:
    if not msg.reactions or not msg.reactions.results:
        return None
    counts = {}
    for r in msg.reactions.results:
        emoticon = getattr(r.reaction, "emoticon", None)
        if emoticon:
            counts[emoticon] = r.count
    return json.dumps(counts, ensure_ascii=False) if counts else None


def _select_sample(msgs: list, n: int) -> list:
    """Pick n evenly-spaced items from a chronologically ordered list."""
    if len(msgs) <= n:
        return msgs
    step = (len(msgs) - 1) / (n - 1)
    indices = {round(i * step) for i in range(n)}
    return [msgs[i] for i in sorted(indices)]


def _build_row(msg, channel: str, media_path: str | None) -> dict:
    media_type = _get_media_type(msg)
    file_size = width = height = duration = None

    if msg.document:
        file_size = msg.document.size
        if media_type == "video":
            attrs = _get_video_attrs(msg.document)
            width, height, duration = attrs["width"], attrs["height"], attrs["duration"]
        else:
            attrs = _get_image_attrs(msg.document)
            width, height = attrs["width"], attrs["height"]

    date = msg.date
    if date.tzinfo is None:
        date = date.replace(tzinfo=timezone.utc)

    return {
        "message_id":  msg.id,
        "channel":     channel,
        "date":        date.isoformat(),
        "text":        msg.text or None,
        "media_type":  media_type,
        "media_path":  media_path,
        "file_size":   file_size,
        "duration":    duration,
        "width":       width,
        "height":      height,
        "views":       getattr(msg, "views", None),
        "forwards":    getattr(msg, "forwards", None),
        "reply_count": msg.replies.replies if msg.replies else None,
        "reactions":   _get_reactions(msg),
    }


async def _download_thumbnail(client: TelegramClient, msg, channel: str) -> str | None:
    if not (msg.photo or msg.video or (msg.document and msg.document.thumbs)):
        return None

    MEDIA_DIR.mkdir(parents=True, exist_ok=True)
    filename = MEDIA_DIR / f"{channel}_{msg.id}.jpg"

    if filename.exists():
        return str(filename)

    try:
        await client.download_media(msg, file=str(filename), thumb=-1)
        return str(filename) if filename.exists() else None
    except Exception as e:
        print(f"  Thumbnail failed for {channel}/{msg.id}: {e}")
        return None


async def _process_month(
    client: TelegramClient, conn, channel: str,
    msgs: list, year: int, month: int, last_id_in_month: int
) -> int:
    """Sample a month's media messages, download thumbnails, store, update progress."""
    sampled = _select_sample(msgs, SAMPLE_PER_MONTH)
    for msg in sampled:
        media_path = await _download_thumbnail(client, msg, channel)
        upsert_message(conn, _build_row(msg, channel, media_path))

    # Record the actual last message_id seen in this month (not just the last sampled)
    update_progress(conn, channel, last_id_in_month)
    conn.commit()

    print(f"  {year}-{month:02d}: {len(sampled)} sampled / {len(msgs)} media messages")
    return len(sampled)


# ---------------------------------------------------------------------------
# Main scrape logic
# ---------------------------------------------------------------------------

async def scrape_channel(client: TelegramClient, username: str,
                         start_date: datetime, end_date: datetime):
    print(f"\n{'='*50}")
    print(f"Scraping @{username}  [{start_date.date()} → {end_date.date()}]")

    try:
        entity = await client.get_entity(username)
    except Exception as e:
        print(f"  Could not resolve @{username}: {e}")
        return

    conn = get_connection()
    upsert_channel(conn, {
        "username":    username,
        "title":       getattr(entity, "title", None),
        "description": getattr(entity, "about", None),
        "subscribers": getattr(entity, "participants_count", None),
    })
    conn.commit()

    last_id = get_last_scraped_id(username)
    if last_id == 0:
        print(f"  First scrape — starting from {start_date.date()}")
        iterator = client.iter_messages(entity, reverse=True, offset_date=start_date)
    else:
        print(f"  Resuming from message_id > {last_id}")
        iterator = client.iter_messages(entity, reverse=True, min_id=last_id)

    current_month    = None
    month_buffer     = []   # media messages for the current month
    last_id_in_month = None # actual last message_id seen (for progress tracking)
    total            = 0

    async for msg in iterator:
        date = msg.date
        if date.tzinfo is None:
            date = date.replace(tzinfo=timezone.utc)

        # Stop if we've passed the end date
        if date > end_date:
            break

        msg_month = (date.year, date.month)

        if current_month is None:
            current_month = msg_month

        if msg_month != current_month:
            # Month boundary — process the completed month
            total += await _process_month(
                client, conn, username,
                month_buffer, *current_month, last_id_in_month
            )
            month_buffer  = []
            current_month = msg_month

        # Always track the last seen id (for resume), only buffer media messages
        last_id_in_month = msg.id
        if _get_media_type(msg):
            month_buffer.append(msg)
            if len(month_buffer) % 200 == 0:
                print(f"  {current_month[0]}-{current_month[1]:02d}: {len(month_buffer)} media so far...")

    # Process the final (most recent / potentially partial) month
    if month_buffer and last_id_in_month:
        total += await _process_month(
            client, conn, username,
            month_buffer, *current_month, last_id_in_month
        )

    conn.close()
    print(f"  Done — {total} messages stored for @{username}")


def parse_args():
    parser = argparse.ArgumentParser(description="Telegram channel scraper")
    parser.add_argument("--from", dest="from_date", default="2022-02-24",
                        help="Start date YYYY-MM-DD (default: 2022-02-24)")
    parser.add_argument("--to", dest="to_date", default="2023-02-23",
                        help="End date YYYY-MM-DD (default: 2023-02-23)")
    return parser.parse_args()


async def main():
    args = parse_args()

    start_date = datetime.strptime(args.from_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    if args.to_date:
        end_date = datetime.strptime(args.to_date, "%Y-%m-%d").replace(
            hour=23, minute=59, second=59, tzinfo=timezone.utc)
    else:
        end_date = datetime.now(timezone.utc)

    print(f"Date range: {start_date.date()} → {end_date.date()}")
    init_db()

    async with TelegramClient("session/ukraine_scraper", API_ID, API_HASH) as client:
        await client.start(phone=PHONE)
        print("Connected to Telegram.")

        for username in CHANNELS:
            await scrape_channel(client, username, start_date, end_date)
            await asyncio.sleep(RATE_SLEEP)

    print("\nAll channels scraped.")


if __name__ == "__main__":
    Path("session").mkdir(exist_ok=True)
    asyncio.run(main())
