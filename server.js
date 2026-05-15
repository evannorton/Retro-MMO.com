const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'out')));

// Dynamically create routes for all HTML files
const outDir = path.join(__dirname, 'out');
const htmlFiles = fs.readdirSync(outDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const routeName = file.replace('.html', '');
  const routePath = routeName === 'index' ? '/' : `/${routeName}`;
  
  app.get(routePath, (req, res) => {
    res.sendFile(path.join(outDir, file));
  });
});

// 404 handler for all other routes
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'out', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});