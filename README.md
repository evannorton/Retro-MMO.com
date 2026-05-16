# RetroMMO Website

Static website for RetroMMO with organized file structure and build process.

## Project Structure

```
src/
├── template.mustache    # Main HTML template
├── pages/              # Page content and metadata
│   ├── index.html      # Page content (just the main section)
│   ├── index.json      # Page metadata (title, description, etc.)
│   ├── play.html
│   ├── play.json
│   └── ...
└── static/             # Static assets (CSS, JS, images, fonts, etc.)
```

## Development

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build and start the server:
   ```bash
   npm start
   ```

3. Visit `http://localhost:3000`

### Build Process

The build process uses Mustache templating:

- Run build only: `npm run build`
- Copies static files from `src/static/` to `out/`
- Uses `src/template.mustache` as the main template
- Combines page content from `src/pages/*.html` with metadata from `src/pages/*.json`
- Generates final HTML files in `/out`
- The server serves files from `/out`

### Adding New Pages

1. Add your content HTML file to `src/pages/` (just the main content, no full HTML structure)
2. Add corresponding JSON file with metadata (title, description, css, etc.)
3. Run `npm run build` to generate the final HTML
4. The server will automatically create a route for it
5. `index.html` serves at `/`, other files serve at `/{filename}`

### Template Variables

Each page can use these variables in its JSON file:
- `title`: Page title
- `description`: Meta description
- `keywords`: Meta keywords  
- `canonical`: Canonical URL
- `css`: CSS file path
- `js`: JavaScript file path (optional)

## Deployment

### GitHub Pages

The site automatically deploys to GitHub Pages when you push to the `main` branch:

1. GitHub Actions runs the build process (`npm run build`)
2. The `/out` directory is deployed to GitHub Pages
3. The site is available at your GitHub Pages URL

### Manual Deployment

For other hosting platforms:

1. Run `npm run build` to generate the `/out` directory
2. Deploy the contents of `/out` to your static hosting service

## Configuration

- `build.js`: Build script that copies `src/static/` to `out/`
- `package.json`: npm scripts and dependencies
- `.github/workflows/deploy.yml`: GitHub Pages deployment configuration