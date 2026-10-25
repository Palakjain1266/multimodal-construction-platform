import json
import base64
import logging
from typing import Optional, Dict, Any
import requests
from app.config import settings

logger = logging.getLogger(__name__)

class AIService:
    @staticmethod
    def is_gemini_available() -> bool:
        return bool(settings.GEMINI_API_KEY and len(settings.GEMINI_API_KEY.strip()) > 10)

    @staticmethod
    def call_multimodal_vision(prompt: str, image_bytes: bytes, mime_type: str = "image/jpeg") -> Optional[Dict[str, Any]]:
        """
        Calls Gemini Multimodal API if GEMINI_API_KEY is configured.
        Returns parsed JSON dictionary or None to allow fallback to heuristic engine.
        """
        if not AIService.is_gemini_available():
            logger.info("No Gemini API key detected. Using built-in intelligent fallback engine.")
            return None

        try:
            b64_data = base64.b64encode(image_bytes).decode("utf-8")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.GEMINI_MODEL}:generateContent?key={settings.GEMINI_API_KEY}"
            
            payload = {
                "contents": [
                    {
                        "parts": [
                            {"text": prompt + "\nRespond with valid strict JSON only. Do not wrap in markdown code blocks."},
                            {
                                "inline_data": {
                                    "mime_type": mime_type,
                                    "data": b64_data
                                }
                            }
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.2,
                    "response_mime_type": "application/json"
                }
            }

            resp = requests.post(url, json=payload, timeout=30)
            if resp.status_code == 200:
                data = resp.json()
                raw_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                if raw_text.startswith("```json"):
                    raw_text = raw_text[7:]
                if raw_text.startswith("```"):
                    raw_text = raw_text[3:]
                if raw_text.endswith("```"):
                    raw_text = raw_text[:-3]
                return json.loads(raw_text.strip())
            else:
                logger.warning(f"Gemini API returned status {resp.status_code}: {resp.text}")
                return None
        except Exception as e:
            logger.error(f"Error calling multimodal API: {e}")
            return None

    @staticmethod
    def call_text_llm(prompt: str) -> Optional[str]:
        """
        Calls text LLM if API key is provided, returns text or None.
        """
        if not AIService.is_gemini_available():
            return None

        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.GEMINI_MODEL}:generateContent?key={settings.GEMINI_API_KEY}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.3}
            }
            resp = requests.post(url, json=payload, timeout=20)
            if resp.status_code == 200:
                data = resp.json()
                return data["candidates"][0]["content"]["parts"][0]["text"].strip()
            return None
        except Exception as e:
            logger.error(f"Error calling text LLM: {e}")
            return None
