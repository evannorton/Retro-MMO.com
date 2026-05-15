const fs = require('fs');
const path = require('path');

// Build function to copy src/static to /out
function buildStatic() {
  const srcStaticDir = path.join(__dirname, 'src', 'static');
  const outDir = path.join(__dirname, 'out');
  
  // Clean out directory
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  
  // Copy src/static to out
  if (fs.existsSync(srcStaticDir)) {
    fs.cpSync(srcStaticDir, outDir, { recursive: true });
    console.log('Copied: src/static -> out');
  } else {
    console.error('Error: src/static directory does not exist');
    process.exit(1);
  }
  
  console.log('Build complete!');
}

// Run build when script is executed directly
if (require.main === module) {
  buildStatic();
}

module.exports = { buildStatic };