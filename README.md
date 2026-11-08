# Chatbot Creator Studio

> **Zero-Framework Customizable Chatbot Creator Micro-SaaS Platform**

A production-ready, lightweight, zero-dependency customer-support chatbot creation studio and runtime engine.

---

## Key Highlights
- **Zero Frameworks & Zero Build Dependencies**: Runs directly in modern browsers using native HTML5, CSS3, ES Modules, and native APIs. No `npm install`, Webpack, Vite, React, or Vue required.
- **Independent Chatbot Runtime**: The chatbot widget executes separately from the studio interface.
- **Deterministic Knowledge-Base Matching**: Keyword-weighted, tokenized matching with configurable confidence scoring.
- **Interactive Conversational Workflows**: Multi-step forms, lead qualification, user variable capture, and human escalation.
- **Isolated Shadow DOM Rendering**: Complete CSS and DOM isolation from the host website.
- **Multi-Channel Adapter Architecture**: Seamless integration for Website Chat, WhatsApp Business Cloud API, Telegram Bot API, and Generic Webhooks.
- **Production-Grade Templates**: 8 industry-tuned templates (Customer Support, FAQ Bot, E-Commerce Assistant, Booking Scheduler, Lead Gen, Tech Support, Business Info, and Education).

---

## Quickstart

Run a static web server from the repository root:
```bash
python3 -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## Running Automated Tests
Execute the automated test suite using native Node.js:
```bash
node tests/run-all.js
```
Or open `tests/index.html` in your browser.

---

## Documentation
- [Developer Guide (37 Sections)](docs/DEVELOPER-GUIDE.md)
- [Chatbot Owner Guide (30 Sections)](docs/CHATBOT-OWNER-GUIDE.md)
- [Website Installation & CMS Guide](docs/INSTALLATION-GUIDE.md)
- [Multi-Channel Integration Guide](docs/INTEGRATION-GUIDE.md)
- [Configuration Reference](docs/CONFIGURATION-REFERENCE.md)
- [API Reference](docs/API-REFERENCE.md)
- [Security & Privacy](docs/SECURITY-AND-PRIVACY.md)
- [Troubleshooting Manual](docs/TROUBLESHOOTING.md)
