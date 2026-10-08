# Field Notes

Field Notes is a minimal doodle-themed, offline-friendly outdoor prompt deck. Draw a note, put the device away, and go notice something.

The interface uses three bespoke transparent doodle illustrations — fern, fox, and stream — with a paper-and-ink palette and a collectible prompt card.

The prompt deck now has a real **Best Use of Gemma** path. Click “try local Gemma” and the browser asks a local Ollama runtime for a short outdoor prompt using `gemma3:1b`. If Gemma is not running, the deterministic offline deck takes over immediately.

To enable the Gemma path locally:

```bash
ollama pull gemma3:1b
ollama serve
```

The browser calls `http://localhost:11434/api/generate`; no prompt is sent to a hosted API. Gemma is an open-weight model family designed to run on laptops and local hardware, which makes it a natural fit for this private, screen-shortening tool.

Run with `python3 -m http.server 8000`, then open `http://localhost:8000`. The doodle images in `assets/` were generated for this project with the built-in image generation tool.

## Prize category

This project is entering **Best Use of Gemma** because Gemma is integrated as a local prompt generator with a working offline fallback, not just mentioned in the README.
