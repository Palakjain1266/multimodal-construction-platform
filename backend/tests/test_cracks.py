import io
import pytest
from PIL import Image, ImageDraw
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def create_crack_image():
    img = Image.new("RGB", (400, 400), color=(180, 180, 180))
    d = ImageDraw.Draw(img)
    d.line([(50, 50), (200, 200), (350, 350)], fill=(30, 30, 30), width=4)
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)
    return buf

def test_crack_detect_endpoint():
    img_buf = create_crack_image()
    response = client.post(
        "/api/crack/detect",
        files={"file": ("concrete_crack.jpg", img_buf, "image/jpeg")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["crack_detected"] is True
    assert "crack_type" in data
    assert "severity" in data
    assert 0 <= data["structural_risk_score"] <= 100
    assert len(data["recommended_repair_methods"]) > 0

def test_crack_sample_endpoint():
    response = client.get("/api/crack/sample")
    assert response.status_code == 200
    data = response.json()
    assert "structural_integrity_risk" in data
    assert "urgency_timeframe" in data
