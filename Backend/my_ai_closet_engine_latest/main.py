import gradio as gr
import sqlite3
import os
import pandas as pd
from core.database import DB_PATH
from core.recommender import recommend_with_sqlite

def get_theme_css(mbti, state):
    """MBTI와 심리 상태에 따른 동적 테마 CSS 생성"""
    if mbti == "INFJ" and state == "CALM":
        return """
        :root { --primary: #004d40; --secondary: #f1f8e9; --accent: #81c784; }
        body, .gradio-container { background-color: var(--secondary) !important; color: var(--primary); }
        .main-banner { background: linear-gradient(135deg, var(--primary), #6d4c41); color: white; padding: 20px; border-radius: 15px; text-align: center; }
        """
    elif mbti == "ENFP" and state == "ENERGY":
        return """
        :root { --primary: #ff3d00; --secondary: #fffde7; --accent: #ffeb3b; }
        body, .gradio-container { background-color: var(--secondary) !important; color: var(--primary); }
        .main-banner { background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; padding: 20px; border-radius: 15px; text-align: center; }
        """
    elif mbti == "INTJ" and state == "CONFIDENCE":
        return """
        :root { --primary: #212121; --secondary: #f3e5f5; --accent: #6a1b9a; }
        body, .gradio-container { background-color: var(--secondary) !important; color: var(--primary); }
        .main-banner { background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; padding: 20px; border-radius: 15px; text-align: center; }
        """
    elif mbti == "ENTP" and state == "ENERGY":
        return """
        :root { --primary: #d50000; --secondary: #eceff1; --accent: #1a237e; }
        body, .gradio-container { background-color: var(--secondary) !important; color: var(--primary); }
        .main-banner { background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; padding: 20px; border-radius: 15px; text-align: center; }
        """
    else:
        return """
        :root { --primary: #1a73e8; --secondary: #f8f9fa; --accent: #8ab4f8; }
        body, .gradio-container { background-color: var(--secondary); color: var(--primary); }
        .main-banner { background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; padding: 20px; border-radius: 15px; text-align: center; }
        """

def update_ui(mbti, state):
    css = get_theme_css(mbti, state)
    banner_html = f'''
    <div class="main-banner">
        <h1>My Shopper - {mbti} Mode ({state})</h1>
        <p style="font-size: 0.6em; opacity: 0.8; letter-spacing: 0.2em; margin-top: 10px;">
            Powered by Local SQLite High-Speed Indexing Engine & Firebase Cloud Infrastructure
        </p>
    </div>
    '''
    return banner_html, css

def handle_recommend(gender, mbti, state, tpo, weather):
    # 유저 정보 업데이트 (성별 포함)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT OR REPLACE INTO User (id, gender, mbti, psychology_state) VALUES (1, ?, ?, ?)", (gender, mbti, state))
    conn.commit()
    conn.close()
    
    results = recommend_with_sqlite(1, tpo, weather)
    
    html = '<div style="display: flex; flex-wrap: wrap; gap: 17px; justify-content: center;">'
    for r in results:
        img_path = r.get('file_path', '')
        # 이미지 소스 처리 (Gradio에서 로컬 파일을 보여주려면 환경 설정이 필요할 수 있으나, 여기선 스코어로 구분)
        html += f'''
        <div style="border: 1px solid #eee; padding: 15px; border-radius: 12px; width: 180px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="font-size: 0.8em; color: #888; margin-bottom: 5px;">{r.get('type')}</div>
            <p style="font-weight: bold; margin: 0;">{r.get('category')}</p>
            <p style="font-size: 0.9em; margin: 5px 0;">{r.get('detail')}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                <span style="font-size: 0.75em; color: #444;">{r.get('color', '')} | {r.get('gender', '')}</span>
                <span style="background: #eef2ff; color: #4f46e5; padding: 2px 8px; border-radius: 20px; font-size: 0.8em; font-weight: bold;">{int(r.get('score'))}점</span>
            </div>
        </div>
        '''
    html += '</div>'
    return html

def sync_docs():
    import pandas as pd
    log_entry = f"\n- [Update] {pd.Timestamp.now()}: 커스텀 성별 필터 및 무작위성(다양성) 알고리즘 주입 완료.\n"
    
    # Problem.md 업데이트
    prob_path = "../Problem.md"
    if os.path.exists(prob_path):
        with open(prob_path, "a", encoding="utf-8") as f:
            f.write(log_entry)
            
    return "문서 동기화 완료!"

with gr.Blocks(css=".gradio-container { max-width: 1200px !important; font-family: 'Inter', sans-serif; }") as demo:
    theme_state = gr.State("")
    
    banner = gr.HTML('<div class="main-banner"><h1>My Shopper</h1></div>')
    
    with gr.Row():
        with gr.Column(scale=1):
            gender_input = gr.Radio(choices=["남성", "여성"], label="성별 (Gender)", value="남성")
            mbti_input = gr.Dropdown(choices=["INFJ", "ENFP", "INTJ", "ENTP", "ISTJ", "ESTJ"], label="MBTI", value="INFJ")
            state_input = gr.Radio(choices=["ENERGY", "CALM", "CONFIDENCE"], label="Psychology State", value="CALM")
            tpo_input = gr.Textbox(label="TPO (상황)", placeholder="예: 출근, 데이트, 운동")
            weather_input = gr.Textbox(label="날씨/기온", value="맑음, 24도")
            req_btn = gr.Button("스타일 추천 받기", variant="primary")
            sync_btn = gr.Button("시스템 문서 동기화 (Update Log)")
            sync_output = gr.Textbox(label="Sync Status")
            
        with gr.Column(scale=2):
            output_html = gr.HTML("<div style='text-align: center; color: #888; padding: 40px;'>추천 결과가 여기에 표시됩니다.</div>")
            dynamic_css = gr.HTML(visible=False) # CSS 주입용
            
    # 이벤트 바인딩
    mbti_input.change(update_ui, inputs=[mbti_input, state_input], outputs=[banner, dynamic_css])
    state_input.change(update_ui, inputs=[mbti_input, state_input], outputs=[banner, dynamic_css])
    
    req_btn.click(handle_recommend, inputs=[gender_input, mbti_input, state_input, tpo_input, weather_input], outputs=[output_html])
    sync_btn.click(sync_docs, outputs=[sync_output])

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 7860))
    demo.launch(server_name="0.0.0.0", server_port=port, share=False)
