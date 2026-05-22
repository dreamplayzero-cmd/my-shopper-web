import sqlite3
import os
from config import CLOSET_DB_PATH, SHOPPING_DB_PATH, REF_DB_PATH

DB_PATH = "database.db"

def init_sqlite_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # User 테이블 생성
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        gender TEXT,
        mbti TEXT,
        psychology_state TEXT CHECK(psychology_state IN ('ENERGY', 'CALM', 'CONFIDENCE')),
        age_job TEXT,
        body_type TEXT
    )
    ''')
    
    # Product 테이블 생성 (내 옷장, 구매 후보, 스타일 교과서 통합 또는 분리)
    # 여기서는 추천을 위해 통합 Product 테이블을 사용하거나, type 필드로 구분
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Product (
        id TEXT PRIMARY KEY,
        type TEXT, -- 'CLOSET', 'SHOPPING', 'REFERENCE'
        category TEXT,
        detail TEXT,
        material TEXT,
        color TEXT,
        color_hex TEXT,
        season TEXT,
        weather_tag TEXT,
        mood_tag TEXT,
        style TEXT,
        file_path TEXT,
        gender TEXT,
        brand TEXT,
        price INTEGER,
        url TEXT,
        score INTEGER DEFAULT 0
    )
    ''')
    
    conn.commit()
    conn.close()

def import_json_to_sqlite():
    import json
    init_sqlite_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 내 옷장
    if os.path.exists(CLOSET_DB_PATH):
        with open(CLOSET_DB_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                cursor.execute('''
                INSERT OR REPLACE INTO Product (id, type, category, detail, color, season, style, file_path, gender)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (item.get("id"), 'CLOSET', item.get("category"), item.get("detail"), item.get("color"), item.get("season"), item.get("style"), item.get("file_path"), item.get("gender")))

    # 구매 후보
    if os.path.exists(SHOPPING_DB_PATH):
        with open(SHOPPING_DB_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                cursor.execute('''
                INSERT OR REPLACE INTO Product (id, type, category, detail, color, season, style, file_path, gender, brand, price, url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (item.get("id"), 'SHOPPING', item.get("category"), item.get("detail"), item.get("color"), item.get("season"), item.get("style"), item.get("file_path"), item.get("gender"), item.get("brand"), item.get("price"), item.get("url")))

    # 스타일 교과서 (Reference)
    if os.path.exists(REF_DB_PATH):
        with open(REF_DB_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                # Reference는 ID가 없는 경우 file_path나 style_name으로 생성
                ref_id = item.get("id") or item.get("file_path")
                cursor.execute('''
                INSERT OR REPLACE INTO Product (id, type, category, detail, color, season, style, file_path, gender)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (ref_id, 'REFERENCE', item.get("category_combination"), item.get("style_name"), item.get("color_combination"), item.get("season"), item.get("mood"), item.get("file_path"), item.get("gender")))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    import_json_to_sqlite()
