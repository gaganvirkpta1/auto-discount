app.get('/', (req, res) => {
  const shop = req.query.shop;
  const host = req.query.host;

  if (!shop || !host) {
    return res.status(400).send('Missing shop or host');
  }

  res.send(
    <!DOCTYPE html>
    <html>
      <head>
        <title>Auto Discount App</title>
        <script src="https://unpkg.com/@shopify/app-bridge@3"></script>
        <script src="https://unpkg.com/@shopify/app-bridge-utils@3"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <h1>🎉 Auto Discount App Loaded Inside Admin</h1>
        <p>Store: ${shop}</p>
        <script>
          const AppBridge = window['app-bridge'];
          const createApp = AppBridge.default;
          const actions = AppBridge.actions;

          const app = createApp({
            apiKey: '${SHOPIFY_API_KEY}',
            host: '${host}',
            forceRedirect: true
          });

          const TitleBar = actions.TitleBar;
          TitleBar.create(app, { title: "Auto Discount App" });
        </script>
      </body>
    </html>
  );
});
