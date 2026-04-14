import sqlite3
from pathlib import Path

DB_PATH = Path("data/telegram.db")


def get_connection():
    DB_PATH.parent.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS channels (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            username    TEXT UNIQUE NOT NULL,
            title       TEXT,
            description TEXT,
            subscribers INTEGER,
            scraped_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS messages (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id  INTEGER NOT NULL,
            channel     TEXT NOT NULL,
            date        TIMESTAMP NOT NULL,
            text        TEXT,
            media_type  TEXT,
            media_path  TEXT,
            file_size   INTEGER,
            duration    INTEGER,
            width       INTEGER,
            height      INTEGER,
            views       INTEGER,
            forwards    INTEGER,
            reply_count INTEGER,
            reactions   TEXT,
            scraped_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(channel, message_id)
        );

        -- Tracks the actual last message_id seen per channel (not just sampled ones).
        -- Needed because we only store sampled messages, so MAX(message_id) in messages
        -- could be from the middle of a month, causing resume to re-process partial months.
        CREATE TABLE IF NOT EXISTS scrape_progress (
            channel         TEXT PRIMARY KEY,
            last_message_id INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel);
        CREATE INDEX IF NOT EXISTS idx_messages_date    ON messages(date);
        CREATE INDEX IF NOT EXISTS idx_messages_media   ON messages(media_type);
    """)
    conn.commit()
    conn.close()
    print(f"Database initialised at {DB_PATH}")


def get_last_scraped_id(channel: str) -> int:
    """Return the last message_id we fully processed for a channel (0 if none)."""
    conn = get_connection()
    row = conn.execute(
        "SELECT last_message_id FROM scrape_progress WHERE channel = ?", (channel,)
    ).fetchone()
    conn.close()
    return row[0] if row else 0


def update_progress(conn, channel: str, last_message_id: int):
    """Record that we have fully processed up to last_message_id for this channel."""
    conn.execute("""
        INSERT INTO scrape_progress (channel, last_message_id)
        VALUES (?, ?)
        ON CONFLICT(channel) DO UPDATE SET last_message_id = excluded.last_message_id
    """, (channel, last_message_id))


def upsert_message(conn, data: dict):
    conn.execute("""
        INSERT OR IGNORE INTO messages
            (message_id, channel, date, text, media_type, media_path,
             file_size, duration, width, height, views, forwards,
             reply_count, reactions)
        VALUES
            (:message_id, :channel, :date, :text, :media_type, :media_path,
             :file_size, :duration, :width, :height, :views, :forwards,
             :reply_count, :reactions)
    """, data)


def upsert_channel(conn, data: dict):
    conn.execute("""
        INSERT INTO channels (username, title, description, subscribers)
        VALUES (:username, :title, :description, :subscribers)
        ON CONFLICT(username) DO UPDATE SET
            title       = excluded.title,
            description = excluded.description,
            subscribers = excluded.subscribers,
            scraped_at  = CURRENT_TIMESTAMP
    """, data)
