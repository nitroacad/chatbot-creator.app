# JavaScript API & Adapter Reference

This document details the public API contract for the runtime engine, adapters, and configuration tools.

---

## 1. ChatbotRuntime
Located in `chatbot/runtime.js`.

### Constructor
```javascript
new ChatbotRuntime(config, options)
```
- `config`: Chatbot JSON configuration object.
- `options`: Optional `{ sessionId, onStateChange, onHandoff }`.

### Methods
- `initializeSession()`: Computes opening message, evaluates business hours, and returns greeting payload.
- `processMessage(userText)`: Processes user query asynchronously, evaluates flows, matching FAQs, or triggering fallback/handoff.
- `resetSession()`: Clears active history and restarts conversation.

---

## 2. KnowledgeEngine
Located in `chatbot/knowledge-engine.js`.

### Methods
- `findBestMatch(query, knowledgeBase, confidenceThreshold)`:
  Returns `{ match: object|null, score: number, candidateCount: number }`.
- `stringSimilarity(str1, str2)`: Returns similarity score between 0.0 and 1.0.

---

## 3. AdapterInterface
Located in `chatbot/adapters/adapter-interface.js`.

All channel adapters must implement:
- `async connect()`: Sets up channel connections.
- `async disconnect()`: Destroys connection resources.
- `validateConfiguration()`: Checks that required channel settings exist.
- `normalizeIncomingMessage(rawPayload)`: Standardizes incoming messages into `{ senderId, text, metadata }`.
- `async sendMessage(recipientId, text, options)`: Sends outbound message.
- `verifyWebhook(headers, secretToken)`: Validates webhook authenticity.
