FROM python:3.11-slim

WORKDIR /app

# 시스템 라이브러리 및 요구사항 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스코드 복사
COPY . .

# Cloud Run 기본 포트
ENV PORT=8080
EXPOSE 8080

# Streamlit 실행
CMD ["sh", "-c", "streamlit run app.py --server.port=$PORT --server.address=0.0.0.0"]
