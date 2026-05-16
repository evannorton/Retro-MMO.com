const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

// Build function to process mustache templates and copy static files
function buildStatic() {
  const srcStaticDir = path.join(__dirname, 'src', 'static');
  const srcPagesDir = path.join(__dirname, 'src', 'pages');
  const outDir = path.join(__dirname, 'out');
  
  // Clean out directory
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });
  
  // Copy src/static to out (if it exists)
  if (fs.existsSync(srcStaticDir)) {
    fs.cpSync(srcStaticDir, outDir, { recursive: true });
    console.log('Copied: src/static -> out');
  }
  
  // Load partials if they exist
  const partialsDir = path.join(__dirname, 'src', 'partials');
  let partials = {};
  if (fs.existsSync(partialsDir)) {
    const partialFiles = fs.readdirSync(partialsDir).filter(file => file.endsWith('.mustache'));
    partialFiles.forEach(partialFile => {
      const partialName = path.basename(partialFile, '.mustache');
      const partialPath = path.join(partialsDir, partialFile);
      partials[partialName] = fs.readFileSync(partialPath, 'utf8');
    });
    console.log(`Loaded ${partialFiles.length} partials`);
  }
  
  // Load global data if it exists
  const dataPath = path.join(__dirname, 'src', 'data.json');
  let globalData = {
    year: new Date().getFullYear(),
    buildTime: new Date().toISOString()
  };
  
  if (fs.existsSync(dataPath)) {
    const fileData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    globalData = { ...globalData, ...fileData };
    console.log('Loaded global data from data.json');
  }
  
  // Load the main template
  const mainTemplatePath = path.join(__dirname, 'src', 'template.mustache');
  if (!fs.existsSync(mainTemplatePath)) {
    console.error('Error: src/template.mustache does not exist');
    process.exit(1);
  }
  
  const mainTemplate = fs.readFileSync(mainTemplatePath, 'utf8');
  console.log('Loaded main template: template.mustache');
  
  // Process HTML files from src/pages
  if (fs.existsSync(srcPagesDir)) {
    const pageFiles = fs.readdirSync(srcPagesDir).filter(file => file.endsWith('.html'));
    
    pageFiles.forEach(pageFile => {
      const pagePath = path.join(srcPagesDir, pageFile);
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      // Look for page-specific data file
      const pageDataPath = path.join(srcPagesDir, pageFile.replace('.html', '.json'));
      let pageData = {};
      if (fs.existsSync(pageDataPath)) {
        pageData = JSON.parse(fs.readFileSync(pageDataPath, 'utf8'));
      }
      
      // Combine global and page-specific data, with content from HTML file
      const templateData = { 
        ...globalData, 
        ...pageData,
        content: pageContent 
      };
      
      // Render the main template with the page content and data
      const renderedHtml = mustache.render(mainTemplate, templateData, partials);
      
      // Output filename stays the same
      const outputPath = path.join(outDir, pageFile);
      
      // Write the rendered HTML
      fs.writeFileSync(outputPath, renderedHtml);
      console.log(`Processed: ${pageFile} -> ${pageFile}`);
    });
  } else {
    console.warn('Warning: src/pages directory does not exist');
  }
  
  console.log('Build complete!');
}

// Run build when script is executed directly
if (require.main === module) {
  buildStatic();
}

module.exports = { buildStatic };