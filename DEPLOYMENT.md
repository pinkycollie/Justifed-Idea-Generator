# Deployment Guide

This document describes how to deploy this Next.js application to GitHub Pages with automated CI/CD.

## Quick Setup

Follow these steps to enable GitHub Pages deployment:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/pinkycollie/Justifed-Idea-Generator
2. Click on **Settings** > **Pages**
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
4. Save the settings

### 2. Enable GitHub Actions

1. Go to **Settings** > **Actions** > **General**
2. Under **Actions permissions**:
   - Select **Allow all actions and reusable workflows**
3. Under **Workflow permissions**:
   - Select **Read and write permissions**
   - Check **Allow GitHub Actions to create and approve pull requests**
4. Save the settings

### 3. Enable Auto-merge (Optional but Recommended)

1. Go to **Settings** > **General**
2. Scroll down to **Pull Requests**
3. Check **Allow auto-merge**
4. Save the settings

### 4. Trigger First Deployment

You can trigger the first deployment in two ways:

**Option A: Push to main branch**
```bash
git push origin copilot/update-nextjs-and-deploy:main
```

**Option B: Use GitHub Actions UI**
1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select `main` branch and run

### 5. Access Your Site

After successful deployment (2-5 minutes), your site will be available at:

**https://pinkycollie.github.io/Justifed-Idea-Generator/**

## Features

### Automated Workflows

This repository includes three GitHub Actions workflows:

#### 1. Deploy to GitHub Pages (`deploy.yml`)
- **Trigger**: Automatic on every push to `main` branch
- **Purpose**: Builds and deploys the Next.js app to GitHub Pages
- **Steps**:
  1. Checks out code
  2. Sets up Node.js 20
  3. Installs dependencies
  4. Builds the static site
  5. Uploads to GitHub Pages
  6. Deploys to production

#### 2. Continuous Integration (`ci.yml`)
- **Trigger**: Automatic on every push and pull request to `main`
- **Purpose**: Validates code quality and build success
- **Steps**:
  1. Checks out code
  2. Sets up Node.js 20
  3. Installs dependencies
  4. Builds the application

#### 3. Auto-merge Dependabot PRs (`auto-merge.yml`)
- **Trigger**: Automatic on Dependabot pull requests
- **Purpose**: Automatically approves and merges patch/minor dependency updates
- **Behavior**:
  - Automatically merges patch updates (e.g., 1.0.1 → 1.0.2)
  - Automatically merges minor updates (e.g., 1.0.0 → 1.1.0)
  - Automatically merges security updates
  - Manual review required for major updates

### Dependabot Configuration

Dependabot is configured to automatically check for updates:

- **NPM packages**: Weekly on Mondays
- **GitHub Actions**: Weekly on Mondays
- **Auto-creates PRs**: Up to 10 for npm, 5 for GitHub Actions
- **Labels**: Adds `dependencies` and `automated` labels

## Configuration Details

### Next.js Configuration

The `next.config.mjs` is configured for static export:

```javascript
const nextConfig = {
  output: 'export',              // Static HTML export
  basePath: '/Justifed-Idea-Generator',  // Repository name as base path
  typescript: {
    ignoreBuildErrors: true,     // Ignore TypeScript errors during build
  },
  images: {
    unoptimized: true,           // Required for static export
  },
}
```

### GitHub Pages Requirements

- `.nojekyll` file in `public/` directory prevents Jekyll processing
- Static export to `/out` directory
- Base path matches repository name
- Images are unoptimized (no Image Optimization API)

## Troubleshooting

### Deployment Not Working?

1. **Check Actions Status**:
   - Go to **Actions** tab in your repository
   - Look for failed workflows and check logs

2. **Common Issues**:
   - GitHub Pages not enabled: Follow Step 1 above
   - Insufficient permissions: Follow Step 2 above
   - Build errors: Check the build logs in Actions

3. **Manual Build Test**:
   ```bash
   npm install --legacy-peer-deps
   npm run build
   # Check if /out directory is created successfully
   ```

### Auto-merge Not Working?

1. **Check Settings**:
   - Auto-merge must be enabled in repository settings
   - Workflow permissions must include "create and approve pull requests"

2. **Branch Protection**:
   - If branch protection rules require reviews, adjust them to allow auto-merge
   - Or add an exception for Dependabot PRs

### Site Shows 404 Error?

1. **Check Base Path**:
   - Ensure `basePath` in `next.config.mjs` matches your repository name
   - If repository is renamed, update the base path

2. **Wait for Deployment**:
   - Initial deployment can take 5-10 minutes
   - Check Actions tab to see if deployment completed

## Development

### Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Build for Production

```bash
# Build static site
npm run build

# Output will be in /out directory
```

### Test Production Build Locally

```bash
# Install a simple HTTP server
npm install -g serve

# Serve the built site
serve out -p 3000
```

Note: When testing locally, assets will have the `/Justifed-Idea-Generator` base path, so some links may not work without a proper server configuration.

## Version Information

- **Next.js**: 16.0.10 (Latest stable, no security vulnerabilities)
- **React**: 19
- **Node.js**: 20 (required for GitHub Actions)

## Migration from Vercel

This project has been migrated from Vercel to GitHub Pages:

1. ✅ Updated Next.js from 15.2.4 to 16.0.10 (fixed CVE-2025-66478)
2. ✅ Configured static export for GitHub Pages
3. ✅ Removed Vercel-specific files and references
4. ✅ Added GitHub Actions workflows
5. ✅ Added Dependabot for automatic dependency updates
6. ✅ Added auto-merge for Dependabot PRs
7. ✅ Updated documentation

## Support

For issues or questions:
- Check the [README.md](README.md) for general project information
- Open an issue on GitHub
- Review GitHub Actions logs for deployment errors
