require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SCOPES = process.env.SCOPES;
const APP_URL = process.env.APP_URL;

app.get('/', (req, res) => {
  const shop = req.query.shop || 'Unknown';
  res.send(`
    <html>
      <head>
        <title>Auto Discount App</title>
      </head>
      <body>
        <h2>🎉 Auto Discount App Installed Successfully!</h2>
        <p>Store: ${shop}</p>
      </body>
    </html>
  `);
});

app.get('/auth', (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(400).send('Missing shop parameter.');

  const redirectUri = `${APP_URL}/auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES}&redirect_uri=${redirectUri}`;
  
  res.redirect(installUrl);
});

app.get('/auth/callback', (req, res) => {
  const { shop, code } = req.query;
  if (!shop || !code) return res.status(400).send('Missing shop or code.');
  
  // Token exchange logic should go here
  res.redirect(`/?shop=${shop}`);
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
