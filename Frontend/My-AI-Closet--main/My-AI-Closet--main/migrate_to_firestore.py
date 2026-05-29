import sqlite3
import json
import requests
import time

PROJECT_ID = "my-shopper-2026"
BASE_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents"

def convert_to_firestore_format(row_dict):
    """Convert a flat dictionary to Firestore document fields format"""
    fields = {}
    for k, v in row_dict.items():
        if isinstance(v, int):
            fields[k] = {"integerValue": str(v)}
        elif isinstance(v, float):
            fields[k] = {"doubleValue": v}
        elif isinstance(v, bool):
            fields[k] = {"booleanValue": v}
        elif v is None:
            fields[k] = {"nullValue": None}
        else:
            fields[k] = {"stringValue": str(v)}
    return {"fields": fields}

def upload_table_to_firestore(db_path, table_name, collection_name):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()
    
    print(f"Migrating {len(rows)} records from {table_name} to {collection_name}...")
    for row in rows:
        data = convert_to_firestore_format(dict(row))
        # POST creates a document with auto-generated ID
        res = requests.post(f"{BASE_URL}/{collection_name}", json=data)
        if res.status_code != 200:
            print(f"Error uploading row to {collection_name}:", res.text)
        time.sleep(0.05) # Prevent rate limiting just in case
    conn.close()
    print(f"Finished {table_name}!")

def create_material_analysis():
    print("Creating material_analysis collection...")
    # Insert some dummy records for the scanner widget
    materials = [
        {"id": "mat_1", "category": "상의 (Tops)", "material": "면 100%", "desc": "우수한 땀 흡수력과 통기성을 지닌 코튼 소재가 감지되었습니다. 일상적인 쾌적함을 유지해줍니다.", "wash": "30도 이하 미온수 단독 세탁을 권장합니다."},
        {"id": "mat_2", "category": "바지 (Pants)", "material": "폴리에스터 60%, 울 40%", "desc": "내구성이 강하고 고급스러운 광택감을 지닌 울 혼방 슬랙스 소재입니다.", "wash": "중성세제를 사용한 가벼운 손세탁 또는 세탁망 사용을 권장합니다."},
        {"id": "mat_3", "category": "아우터 (Outer)", "material": "울 80%, 나일론 20%", "desc": "보온성이 뛰어나고 형태감이 탄탄한 울 소재입니다. 세련된 분위기를 연출합니다.", "wash": "반드시 드라이클리닝 하십시오."}
    ]
    for m in materials:
        data = convert_to_firestore_format(m)
        res = requests.post(f"{BASE_URL}/material_analysis", json=data)
        time.sleep(0.05)
    print("Finished material_analysis!")

if __name__ == "__main__":
    db_path = r"C:\Users\User\Desktop\My Shopper flow\DB구성\coordi.db"
    
    upload_table_to_firestore(db_path, "my_closet", "my_closet")
    # Limiting reference styles migration to 50 items for speed during presentation timeframe
    print("Limiting reference_styles to 50 for quick upload...")
    
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM reference_styles LIMIT 50")
    rows = cursor.fetchall()
    conn.close()
    
    print(f"Migrating {len(rows)} records to reference_styles...")
    for row in rows:
        data = convert_to_firestore_format(dict(row))
        res = requests.post(f"{BASE_URL}/reference_styles", json=data)
    print("Finished reference_styles!")
    
    create_material_analysis()
    
    print("All migrations completed successfully!")
