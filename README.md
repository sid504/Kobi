# Conversation → App Builder

A lightweight web app that converts a pasted conversation transcript into:

- Core app idea bullets
- Feature candidates
- User stories
- Tech-stack suggestions

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

I couldn't directly fetch external ChatGPT shared links from this environment, so this app focuses on transcript-first analysis: paste the conversation content and it will structure requirements instantly.
