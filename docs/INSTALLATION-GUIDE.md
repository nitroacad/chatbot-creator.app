# Website Installation & CMS Embedding Guide

This guide explains how to install your published chatbot widget onto common website platforms and Content Management Systems.

---

## 1. The Standard Embedding Snippet
```html
<!-- Zero-Framework Custom Chatbot Widget -->
<script
  src="https://YOUR-DOMAIN.com/chatbot/loader.js"
  data-chatbot-id="YOUR-CHATBOT-ID"
  async
></script>
```

### Script Tag Attributes
- `src`: URL to `loader.js` hosted on your static server or CDN.
- `data-chatbot-id`: The unique ID of the chatbot configured in the studio.
- `async`: Loads the script in the background without delaying initial page render.

---

## 2. Platform-Specific Instructions

### HTML5 Static Websites
Paste the script tag directly before the closing `</body>` tag of your HTML pages.

### WordPress
1. In WordPress Admin, navigate to **Plugins > Add New**.
2. Search for and install **WPCode** (or any header/footer injection plugin).
3. Go to **Code Snippets > Header & Footer**.
4. Paste the snippet into the **Footer** section.
5. Save changes.

### Shopify Storefronts
1. Go to **Online Store > Themes**.
2. Click **... > Edit code**.
3. In the layout folder, open `theme.liquid`.
4. Scroll to the bottom and paste the snippet above the `</body>` tag.
5. Click **Save**.

### GitHub Pages, Netlify & Cloudflare Pages
Commit the script tag into your root `index.html` file and push changes to your Git repository.
