/**
 * Zero-Framework Chatbot Widget Embed Loader
 * Loads asynchronously, fetches remote or local chatbot JSON configuration,
 * creates an isolated container, and launches WebsiteAdapter.
 */

(function () {
  'use strict';

  // Prevent multiple loader initializations
  if (window.__CHATBOT_LOADER_INITIALIZED__) return;
  window.__CHATBOT_LOADER_INITIALIZED__ = true;

  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const chatbotId = currentScript ? currentScript.getAttribute('data-chatbot-id') : null;
  const configUrl = currentScript ? currentScript.getAttribute('data-config-url') : null;

  if (!chatbotId && !configUrl) {
    console.warn('[ChatbotLoader] Missing data-chatbot-id or data-config-url on script element.');
    return;
  }

  async function loadConfiguration() {
    if (configUrl) {
      const resp = await fetch(configUrl);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} fetching config`);
      return await resp.json();
    }

    // Try loading from localStorage or static data endpoint
    const local = localStorage.getItem(`chatbot_pub_${chatbotId}`) || localStorage.getItem('chatbot_creator_bots');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          const match = parsed.find(b => b.id === chatbotId);
          if (match) return match;
        } else if (parsed.id === chatbotId) {
          return parsed;
        }
      } catch (e) {
        // Continue
      }
    }

    // Try fetching static exported path
    const fallbackUrl = `./data/templates/${chatbotId}.json`;
    const resp = await fetch(fallbackUrl);
    if (!resp.ok) throw new Error(`Could not load configuration for bot: ${chatbotId}`);
    return await resp.json();
  }

  async function initWidget() {
    try {
      const config = await loadConfiguration();

      // Check domain restriction if configured
      if (
        config.integrations &&
        config.integrations.website &&
        config.integrations.website.requireDomainValidation &&
        Array.isArray(config.integrations.website.allowedDomains)
      ) {
        const allowed = config.integrations.website.allowedDomains;
        const currentHost = window.location.hostname;
        const isAllowed = allowed.includes('*') || allowed.some(d => d === currentHost || currentHost.endsWith('.' + d));
        if (!isAllowed) {
          console.error(`[Chatbot] Domain ${currentHost} is not authorized to embed this chatbot.`);
          return;
        }
      }

      // Dynamically import WebsiteAdapter
      const scriptUrl = currentScript.src;
      const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));
      const adapterModule = await import(`${baseUrl}/adapters/website.js`);
      const WebsiteAdapter = adapterModule.WebsiteAdapter;

      const adapter = new WebsiteAdapter(config);
      await adapter.connect();

      window[`ChatbotInstance_${config.id}`] = adapter;
    } catch (err) {
      console.warn('[ChatbotLoader] Initialization failed:', err.message);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
