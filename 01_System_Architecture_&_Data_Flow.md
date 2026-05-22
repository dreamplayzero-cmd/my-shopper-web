# 01_System_Architecture_&_Data_Flow

## 시스템 아키텍처 개요
본 서비스는 현대적이고 세련된 React 프론트엔드와 강력한 분석력을 갖춘 Python 기반 백엔드 엔진이 통합된 구조를 가집니다.

### 1. Data Flow (데이터 흐름)
- **User Preference**: MBTI 및 심리 상태(ENERGY, CALM, CONFIDENCE) 데이터가 SQLite(User 테이블)에 저장됨.
- **Product Metadata**: 소재(Material), 색상코드(Hex), 날씨 태그가 포함된 상품 정보가 SQLite(Product 테이블)로 관리됨.
- **Recommendation Engine**: SQL 쿼리 시 가중치(`Score`) 상수를 적용하여 상위 추천 아이템을 정렬 및 추출함.

### 2. Component Structure
- **Frontend (Port 7860)**: React/Vite 기반 메인 UI 및 스타일 DNA 관리.
  - **Main Banner**: Terrazzo Texture + Infrastructure Sub-copy ("Powered by Local SQLite High-Speed Indexing Engine...").
- **Analysis Board (Port 8501)**: Streamlit 기반의 마네킹 보드 및 세부 분석 시각화.
- **Dynamic Theme Engine (Port 7861)**: Gradio 기반의 실시간 유저 성향 테마 전환 테스트베드.

## [2026-05-21] Architecture Upgrade Log (Final)
- **Score System Mapping**:
  - Weather/Material Match: +3
  - MBTI Personality Match: +2
  - Color Psychology Match: +2
- **Dynamic CSS Injection**: 전역 상태를 감지하여 MBTI(INFJ, ENFP 등)와 심리 상태에 맞춰 UI 컬러셋 실시간 변형 로직 주입 성공.
  - Theme A (INFJ+CALM): #004d40 Deep Green Highlights.
  - Theme B (ENFP+ENERGY): #ff3d00 Neon Orange Gradients.
  - Theme C (INTJ+CONFIDENCE): #212121 Deep Black & Purple Mood.
  - Theme D (ENTP+ENERGY): #d50000 Vibrant Red & Navy Mix.
