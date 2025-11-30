from fastapi import FastAPI, HTTPException
from models.deepfake_model import DeepfakeModel
from utils.media_loader import download_media, extract_frames
from utils.hashing import hash_file
from utils.scoring import compute_score
import datetime

app = FastAPI()
model = DeepfakeModel()
model = DeepfakeModel()

# Input model removed to avoid pydantic dependency; endpoint accepts plain JSON dict
@app.get("/health")
def health():
    return {"status": "ok", "worker": "deepfake detection worker running"}

@app.post("/check")
async def check_media(payload: dict):
    try:
        url = payload.get("mediaUrl")
        if not url:
            raise HTTPException(status_code=400, detail="mediaUrl is required")
        # download media
        filepath = download_media(url)
        if not filepath:
            raise HTTPException(status_code=400, detail="cannot download media")

        # compute media hash
        media_hash = hash_file(filepath)

        # extract frames
        frames = extract_frames(filepath)
        if not frames:
            raise HTTPException(status_code=400, detail="cannot extract frames")

        # run deepfake model
        score, confidence, explanation = model.predict(frames)

        report = {
            "mediaHash": media_hash,
            "mediaUrl": url,
            "isAuthentic": score < 0.5,
            "score": float(score),
            "confidence": float(confidence),
            "modelVersion": "alle_v1",
            "checkedAt": datetime.datetime.utcnow().isoformat(),
            "explanation": explanation
        }

        return report

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
