# Changelog

## [2.0.0] - 2025-12-14

### Major Changes - Migration to GitHub Pages

This release represents a complete migration from Vercel to GitHub Pages with automated CI/CD pipelines.

#### 🚀 Updates

- **Next.js**: Upgraded from 15.2.4 to 16.0.10
  - Fixed security vulnerability CVE-2025-66478
  - Zero vulnerabilities in current version
  - Updated to use Turbopack for faster builds
  - Removed deprecated `eslint` config from `next.config.mjs`

#### 🔧 Configuration Changes

- **Static Export**: Configured Next.js for static HTML export
  - Added `output: 'export'` to enable static site generation
  - Set `basePath: '/Justifed-Idea-Generator'` for GitHub Pages
  - Kept `images: { unoptimized: true }` for static export compatibility
  - Added `.nojekyll` file to prevent Jekyll processing

#### 🤖 Automated CI/CD

Added three GitHub Actions workflows:

1. **Deploy to GitHub Pages** (`.github/workflows/deploy.yml`)
   - Automatic deployment on push to `main` branch
   - Manual deployment trigger available
   - Builds and uploads static site to GitHub Pages

2. **Continuous Integration** (`.github/workflows/ci.yml`)
   - Runs on all pushes and pull requests to `main`
   - Validates build succeeds
   - Provides fast feedback on code quality

3. **Auto-merge Dependabot PRs** (`.github/workflows/auto-merge.yml`)
   - Automatically approves and merges patch/minor updates
   - Automatically merges security updates
   - Requires manual review for major version updates

#### 📦 Dependency Management

- **Dependabot Configuration** (`.github/dependabot.yml`)
  - Weekly checks for npm package updates (Mondays)
  - Weekly checks for GitHub Actions updates (Mondays)
  - Auto-creates up to 10 npm PRs and 5 GitHub Actions PRs
  - Adds helpful labels: `dependencies`, `automated`

#### 🗑️ Removed

- Vercel-specific references from documentation
- Vercel deployment badges and links
- Deprecated lint configuration from Next.js config

#### 📝 Documentation

- **Updated README.md**:
  - Replaced Vercel badges with GitHub Pages badges
  - Updated deployment section with GitHub Pages info
  - Updated technology stack versions
  - Added reference to deployment guide

- **Added DEPLOYMENT.md**:
  - Comprehensive setup guide for GitHub Pages
  - Step-by-step configuration instructions
  - Troubleshooting section
  - Migration notes from Vercel

- **Added CHANGELOG.md** (this file):
  - Documents all changes in this release

#### 🐛 Bug Fixes

- Fixed duplicate header in `app/page.tsx` that caused build errors
- Cleaned up `.gitignore` duplicate entries
- Added proper `.gitignore` entries for Vercel files

#### 🔐 Security

- ✅ Resolved CVE-2025-66478 in Next.js 15.2.4
- ✅ No known vulnerabilities in dependencies
- ✅ Automatic security updates via Dependabot

#### 🎯 Migration Summary

This release completes the migration from Vercel to GitHub Pages:

- ✅ Updated to latest Next.js with security fixes
- ✅ Configured for static export (GitHub Pages compatible)
- ✅ Automated CI/CD with GitHub Actions
- ✅ Automated dependency updates with Dependabot
- ✅ Auto-merge for patch/minor/security updates
- ✅ Comprehensive documentation
- ✅ Zero vulnerabilities

### Installation

```bash
# Fresh install
npm install --legacy-peer-deps

# Build
npm run build

# The static site will be in the /out directory
```

### Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for setup instructions.

### Breaking Changes

- The application now requires `basePath: '/Justifed-Idea-Generator'` in URLs
- All links must be prefixed with the base path
- Images must use the `unoptimized` property
- No server-side features (API routes, ISR, SSR) are available in static export mode

### Notes

- The `--legacy-peer-deps` flag is still required due to date-fns version conflicts with react-day-picker
- TypeScript build errors are ignored via `ignoreBuildErrors: true` (existing configuration)
