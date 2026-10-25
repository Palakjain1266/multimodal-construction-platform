import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.crack import CrackDetectionResponse
from app.services.crack_service import CrackService

router = APIRouter(prefix="/api/crack", tags=["Crack Detection & Analysis"])

@router.post("/detect", response_model=CrackDetectionResponse, summary="Detect and Classify Concrete / Masonry Cracks")
async def detect_cracks(file: UploadFile = File(...)):
    """
    Upload a concrete or structural image to analyze crack patterns,
    estimate width, evaluate structural integrity risks, and get repair specs.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image (JPEG/PNG/WebP).")

    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        result = CrackService.analyze_image(contents, file.filename)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze structural crack: {str(e)}")

@router.get("/sample", response_model=CrackDetectionResponse, summary="Run Crack Detection on Built-in Sample Image")
async def detect_sample_crack():
    """
    Runs crack detection on the bundled structural concrete sample image.
    """
    sample_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "sample_data", "sample_concrete_crack.jpg")
    if not os.path.exists(sample_path):
        from PIL import Image, ImageDraw
        img = Image.new("RGB", (640, 480), color=(180, 180, 180))
        d = ImageDraw.Draw(img)
        # Draw a jagged crack line
        points = [(100, 100), (180, 160), (240, 220), (320, 290), (410, 360), (520, 430)]
        for i in range(len(points) - 1):
            d.line([points[i], points[i+1]], fill=(40, 40, 40), width=4)
        os.makedirs(os.path.dirname(sample_path), exist_ok=True)
        img.save(sample_path, format="JPEG")

    with open(sample_path, "rb") as f:
        data = f.read()

    return CrackService.analyze_image(data, "sample_concrete_crack.jpg")
