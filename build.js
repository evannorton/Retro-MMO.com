const fs = require('fs');
const path = require('path');

// Build function to copy files from static.json to /out
function buildStatic() {
  const staticConfig = JSON.parse(fs.readFileSync('static.json', 'utf8'));
  const outDir = path.join(__dirname, 'out');
  
  // Clean out directory
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });
  
  // Copy each path specified in static.json
  staticConfig.forEach(srcPath => {
    const sourcePath = path.join(__dirname, srcPath);
    const fileName = path.basename(srcPath);
    const destPath = path.join(outDir, fileName);
    
    if (fs.existsSync(sourcePath)) {
      if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directory recursively
        fs.cpSync(sourcePath, destPath, { recursive: true });
      } else {
        // Copy file
        fs.copyFileSync(sourcePath, destPath);
      }
      console.log(`Copied: ${srcPath} -> out/${fileName}`);
    } else {
      console.warn(`Warning: ${srcPath} does not exist`);
    }
  });
  
  console.log('Build complete!');
}

// Run build when script is executed directly
if (require.main === module) {
  buildStatic();
}

module.exports = { buildStatic };