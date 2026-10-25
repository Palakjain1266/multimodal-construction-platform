import io
import pytest
from PIL import Image
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def create_test_image():
    img = Image.new("RGB", (300, 300), color=(120, 140, 160))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)
    return buf

def test_safety_analyze_endpoint():
    img_buf = create_test_image()
    response = client.post(
        "/api/safety/analyze",
        files={"file": ("test_site.jpg", img_buf, "image/jpeg")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "safety_score" in data
    assert 0 <= data["safety_score"] <= 100
    assert "risk_level" in data
    assert "ppe_checklist" in data
    assert len(data["ppe_checklist"]) > 0
    assert "detected_hazards" in data

def test_safety_sample_endpoint():
    response = client.get("/api/safety/sample")
    assert response.status_code == 200
    data = response.json()
    assert data["safety_score"] > 0
    assert data["ppe_compliance_rate"] >= 0.0

def test_safety_invalid_file_type():
    response = client.post(
        "/api/safety/analyze",
        files={"file": ("test.txt", io.BytesIO(b"not an image"), "text/plain")}
    )
    assert response.status_code == 400
