const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS (important for embedded app inside Shopify)
app.use(cors());
app.use(express.static('public'));

// Root route for proxy iframe
app.get('/', (req, res) => {
  const host = req.query.host;
  const shop = req.query.shop;

  // Basic validation
  if (!host || !shop) {
    return res.status(400).send('Missing required query parameters.');
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Auto Discount App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://unpkg.com/@shopify/app-bridge@3"></script>
      </head>
      <body>
        <h2>🎉 Auto Discount App is successfully installed on your store!</h2>
        <script>
          const AppBridge = window['app-bridge'];
          const createApp = AppBridge.default;
          const app = createApp({
            apiKey: '76618cf077e5143dcf1460d096d6580a', // ✅ Make sure this matches your app's real API Key
            host: '${host}',
            forceRedirect: true
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(\`🚀 App is running at http://localhost:\${PORT}\`);
});
