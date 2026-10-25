import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.safety import SafetyAnalysisResponse
from app.services.safety_service import SafetyService

router = APIRouter(prefix="/api/safety", tags=["Site Safety Analysis"])

@router.post("/analyze", response_model=SafetyAnalysisResponse, summary="Analyze Construction Site Safety Image")
async def analyze_site_safety(file: UploadFile = File(...)):
    """
    Upload a construction site image (JPEG, PNG, WebP) to detect PPE compliance,
    identify safety hazards, and compute an OSHA-aligned safety index.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image (JPEG/PNG/WebP).")

    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        result = SafetyService.analyze_image(contents, file.filename)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process safety image: {str(e)}")

@router.get("/sample", response_model=SafetyAnalysisResponse, summary="Run Safety Analysis on Built-in Sample Image")
async def analyze_sample_safety():
    """
    Runs safety analysis on the bundled construction site sample image.
    """
    sample_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "sample_data", "sample_safety_site.jpg")
    if not os.path.exists(sample_path):
        # Create a small valid test image if missing
        from PIL import Image, ImageDraw
        img = Image.new("RGB", (640, 480), color=(140, 150, 160))
        d = ImageDraw.Draw(img)
        d.rectangle([(100, 200), (200, 400)], fill=(220, 100, 50))
        d.rectangle([(300, 150), (450, 450)], fill=(80, 80, 80))
        os.makedirs(os.path.dirname(sample_path), exist_ok=True)
        img.save(sample_path, format="JPEG")

    with open(sample_path, "rb") as f:
        data = f.read()

    return SafetyService.analyze_image(data, "sample_safety_site.jpg")
