#!/usr/bin/env python3
"""
Pakizm — Gemini image-enhancement workflow (secure).

- Reads GEMINI_API_KEY from the project .env via python-dotenv.
- NEVER prints or logs the key.
- Independent of Claude Code auth: the key lives only in .env (git-ignored)
  and is loaded into this process; nothing is written to any Claude config.
- Verifies the real, supported image model from the live API before calling.
- `test` runs ONE image and writes to a separate output folder; it never
  overwrites or modifies the source image.

Usage:
  python enhance.py verify
  python enhance.py test  <input_image>  [output_dir]
"""
from __future__ import annotations

import os
import sys
import base64
import mimetypes
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv

# project root = two levels up from this file (scripts/gemini/enhance.py)
PROJECT_ROOT = Path(__file__).resolve().parents[2]
ENV_PATH = PROJECT_ROOT / ".env"

DEFAULT_OUTPUT = PROJECT_ROOT / "work" / "gemini-test-output"
# Candidate image model, overridable via .env (GEMINI_MODEL). Verified against
# the live model list by `verify` before any real call.
FALLBACK_MODEL = "gemini-2.5-flash-image"

ENHANCE_PROMPT = (
    "This is a photo of a single surgical (orthopedic) instrument. "
    "Clean it up and place it on a pure white (#FFFFFF) studio background. "
    "Preserve the instrument EXACTLY: same shape, proportions, length, tips, "
    "teeth count, serrations, ratchets and every feature. Do NOT add, remove, "
    "invent, or restyle any detail. Only remove background artifacts and any "
    "watermark, even out lighting, and improve sharpness and clarity. "
    "Keep it photorealistic and faithful to the original instrument."
)


def get_key() -> str:
    """Load the key from .env without ever exposing it."""
    if not ENV_PATH.exists():
        sys.exit(f"ERROR: no .env at {ENV_PATH}")
    load_dotenv(dotenv_path=ENV_PATH)
    key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not key:
        sys.exit(
            "ERROR: GEMINI_API_KEY is not set in .env.\n"
            f"Add a line to {ENV_PATH}:  GEMINI_API_KEY=your_key_here\n"
            "(The key is never printed and .env is git-ignored.)"
        )
    return key


def make_client():
    from google import genai
    return genai.Client(api_key=get_key())


def cmd_verify():
    """List image-capable models the key actually has access to (authoritative)."""
    client = make_client()
    print("Querying live model list (authoritative model-ID check)...\n")
    image_models = []
    try:
        for m in client.models.list():
            name = getattr(m, "name", "") or ""
            actions = getattr(m, "supported_actions", None) or getattr(
                m, "supported_generation_methods", None
            ) or []
            short = name.split("/")[-1]
            if "image" in short.lower():
                image_models.append((short, list(actions)))
    except Exception as e:
        sys.exit(f"ERROR listing models (key/network/endpoint issue): {e}")

    if not image_models:
        print("No image-capable models found for this key. Full model list:")
        for m in client.models.list():
            print("  ", getattr(m, "name", "").split("/")[-1])
        return
    print("Image-capable models available to this key:")
    for short, actions in image_models:
        print(f"  {short}   actions={actions}")
    env_model = os.environ.get("GEMINI_MODEL")
    print(f"\nGEMINI_MODEL in .env: {env_model or '(not set)'}")
    print(f"Fallback default: {FALLBACK_MODEL}")


def _save_image_parts(resp, out_dir: Path, stem: str) -> list[Path]:
    saved = []
    cand = (resp.candidates or [])[0] if getattr(resp, "candidates", None) else None
    parts = getattr(getattr(cand, "content", None), "parts", None) or []
    idx = 0
    for part in parts:
        inline = getattr(part, "inline_data", None)
        if inline and getattr(inline, "data", None):
            data = inline.data
            if isinstance(data, str):  # some SDK paths return base64 text
                data = base64.b64decode(data)
            ext = mimetypes.guess_extension(getattr(inline, "mime_type", "") or "image/png") or ".png"
            out = out_dir / f"{stem}_enhanced{('' if idx == 0 else '_' + str(idx))}{ext}"
            out.write_bytes(data)
            saved.append(out)
            idx += 1
        elif getattr(part, "text", None):
            print("  model note:", part.text.strip()[:200])
    return saved


def cmd_test(input_path: str, output_dir: str | None):
    from google.genai import types
    from PIL import Image

    src = Path(input_path).resolve()
    if not src.exists():
        sys.exit(f"ERROR: input image not found: {src}")
    out_dir = Path(output_dir).resolve() if output_dir else DEFAULT_OUTPUT
    out_dir.mkdir(parents=True, exist_ok=True)

    model = os.environ.get("GEMINI_MODEL", FALLBACK_MODEL)
    client = make_client()  # loads .env

    # open read-only; never write back to the source
    img = Image.open(src)
    print(f"Input : {src}  ({img.size[0]}x{img.size[1]})  [original untouched]")
    print(f"Model : {model}")
    print(f"Output: {out_dir}")

    try:
        resp = client.models.generate_content(
            model=model,
            contents=[ENHANCE_PROMPT, img],
            config=types.GenerateContentConfig(response_modalities=["Image", "Text"]),
        )
    except Exception as e:
        sys.exit(f"ERROR during generation: {e}")

    stem = src.stem + "_" + datetime.now().strftime("%H%M%S")
    saved = _save_image_parts(resp, out_dir, stem)
    if not saved:
        sys.exit("No image returned by the model (check model ID via `verify`).")
    for p in saved:
        print("SAVED :", p)
    print("Done. Original image was not modified.")


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in {"verify", "test"}:
        print(__doc__)
        sys.exit(1)
    if sys.argv[1] == "verify":
        cmd_verify()
    else:
        cmd_test(sys.argv[2] if len(sys.argv) > 2 else "", sys.argv[3] if len(sys.argv) > 3 else None)


if __name__ == "__main__":
    main()
