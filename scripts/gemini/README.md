# Gemini image-enhancement workflow

Secure, standalone image enhancement for Pakizm product photos. Independent of
Claude Code auth — the key lives only in the git-ignored `.env`.

## Setup
1. Add your key to the project `.env` (not `.env.example`):
   ```
   GEMINI_API_KEY=your_key_here
   ```
   `.env` is git-ignored and the key is never printed.
2. Use the project venv:
   ```
   source .venv/bin/activate   # from the Pakizm/ project root
   ```

## Verify the model (do this before any generation)
Lists the image-capable models your key actually has access to, so we use a
real, supported model identifier:
```
python scripts/gemini/enhance.py verify
```
Optionally pin one in `.env`: `GEMINI_MODEL=gemini-2.5-flash-image`

## Test on ONE image (safe)
Writes to `work/gemini-test-output/` and never touches the source:
```
python scripts/gemini/enhance.py test /path/to/one_image.png
```

## Notes
- Originals are opened read-only; nothing is overwritten.
- `work/` and `.env` are git-ignored.
- Accuracy caveat: AI editing can alter fine instrument detail (teeth,
  serrations). The prompt instructs the model to preserve geometry exactly —
  review each result before using it on the live catalog.
