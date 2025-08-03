const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Shopify App Credentials
const SHOPIFY_API_KEY = '76618cf077e5143dcf1460d096d6580a';
const SHOPIFY_API_SECRET = 'YOUR_SECRET_KEY'; // Replace this
const SCOPES = 'read_products,write_discounts'; // Customize if needed
const APP_URL = 'https://auto-discount.onrender.com';

app.use(express.static('public'));

// Main Page (Optional)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Auto Discount App</title>
        <script src="https://unpkg.com/@shopify/app-bridge@3"></script>
      </head>
      <body>
        <h2>🎉 Auto Discount App is successfully installed on your store!</h2>
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

// 🔒 Shopify OAuth Start
app.get('/auth', (req, res) => {
  const shop = req.query.shop;
  if (!shop) {
    return res.status(400).send('Missing shop parameter.');
  }

  const redirectUri = `${APP_URL}/auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES}&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
});

// 🔑 Shopify OAuth Callback
app.get('/auth/callback', (req, res) => {
  const { shop, code } = req.query;

  if (!shop || !code) {
    return res.status(400).send('Missing shop or code.');
  }

  // Ideally: Verify HMAC + Exchange code for access token here

  res.redirect(`/?shop=${shop}`);
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
