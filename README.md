# RetroMMO Website

Static website for RetroMMO with organized file structure and build process.

## Project Structure

```
src/
└── static/         # All static files (HTML, CSS, JS, images, fonts, etc.)
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

The build process copies everything from `src/static/` to `/out`:

- Run build only: `npm run build`
- All files are copied from `src/static/` to `out/`
- The server serves files from `/out`

### Adding New Pages

1. Add your HTML file to `src/static/`
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

- `build.js`: Build script that copies `src/static/` to `out/`
- `package.json`: npm scripts and dependencies
- `.github/workflows/deploy.yml`: GitHub Pages deployment configuration