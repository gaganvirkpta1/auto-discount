const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

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
            apiKey: '76618cf077e5143dcf1460d096d6580a',
            host: new URLSearchParams(window.location.search).get('host'),
            forceRedirect: true
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(\`App is running at http://localhost:\${PORT}\`);
});
