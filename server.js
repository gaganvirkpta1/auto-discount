require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Shopify App Credentials (from .env)
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SCOPES = process.env.SCOPES;
const APP_URL = process.env.APP_URL;

app.use(express.static('public'));

// ✅ Main page (when auth is done)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Auto Discount App</title>
        <script src="https://unpkg.com/@shopify/app-bridge@3"></script>
      </head>
      <body>
        <h2>🎉 Auto Discount App is successfully installed!</h2>
        <script>
          const AppBridge = window['app-bridge'];
          const createApp = AppBridge.default;
          const app = createApp({
            apiKey: '${SHOPIFY_API_KEY}',
            host: new URLSearchParams(window.location.search).get('host'),
            forceRedirect: true
          });
        </script>
      </body>
    </html>
  `);
});

// 🔐 OAuth start
app.get('/auth', (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(400).send('Missing shop parameter.');

  const redirectUri = `${APP_URL}/auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES}&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
});

// 🔑 OAuth callback
app.get('/auth/callback', (req, res) => {
  const { shop, code } = req.query;
  if (!shop || !code) return res.status(400).send('Missing shop or code.');

  // Here: ideally exchange `code` for access token (left out for simplicity)
  res.redirect(`/?shop=${shop}`);
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
