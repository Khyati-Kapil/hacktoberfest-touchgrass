# Field Notes

Field Notes is a minimal doodle-themed, offline-friendly outdoor prompt deck. Draw a note, put the device away, and go notice something.

The interface uses three bespoke transparent doodle illustrations — fern, fox, and stream — with a paper-and-ink palette and a collectible prompt card.

The prompt deck is designed as a local model surface. The included notes are a deterministic offline fallback, while an open-weight model can generate or remix prompts locally without sending location, mood, or personal data to a hosted API.

Run with `python3 -m http.server 8000`, then open `http://localhost:8000`. The doodle images in `assets/` were generated for this project with the built-in image generation tool.
