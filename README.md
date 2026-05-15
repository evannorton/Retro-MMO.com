# RetroMMO Website

Static website for RetroMMO with organized file structure and build process.

## Project Structure

```
src/
├── assets/          # Images, fonts, and other static assets
├── css/            # Stylesheets
├── html/           # HTML pages
├── js/             # JavaScript files
├── robots.txt      # Search engine directives
└── sitemap.xml     # Site structure for search engines
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

The build process is controlled by `static.json` which specifies which files/folders to copy to the `/out` directory:

- Run build only: `npm run build`
- Files are copied from `src/` to `out/` based on `static.json`
- The server serves files from `/out`

### Adding New Pages

1. Add your HTML file to `src/html/`
2. The server will automatically create a route for it
3. `index.html` serves at `/`, other files serve at `/{filename}`

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

- `static.json`: Controls which files are included in the build
- `package.json`: npm scripts and dependencies
- `.github/workflows/deploy.yml`: GitHub Pages deployment configuration