const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Auto Discount App is working!');
});

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});