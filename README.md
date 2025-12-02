# Texas Idea Generator

> Part of the **MBTQ Ecosystem** | Powered by **360 Business Magician**

[![Build Status](https://img.shields.io/github/actions/workflow/status/pinkycollie/v0-texas_idea_generator/ci.yml?branch=main&style=for-the-badge)](https://github.com/pinkycollie/v0-texas_idea_generator/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![MBTQ Ecosystem](https://img.shields.io/badge/MBTQ-Ecosystem-purple?style=for-the-badge)](https://mbtq.dev)
[![360 Business Magician](https://img.shields.io/badge/360-Business%20Magician-indigo?style=for-the-badge)](https://360businessmagician.mbtquniverse.com)

## Overview

The **Texas Idea Generator** is an innovative web application designed to assist entrepreneurs in discovering business opportunities specifically tailored for the Texas market. This application is a key component of the **MBTQ Ecosystem** and the **360 Business Magician** platform, which helps entrepreneurs build, grow, and manage modular business processes.

### Features

- 🎯 **Category-based Idea Generation**: Generate ideas for Jobs, Businesses, Self-Employment, and Contracts
- 🌟 **Texas-focused Opportunities**: Ideas specifically designed for the Texas market
- ♿ **Accessibility Options**: Specialized services for all users including accessibility features
- 🎨 **Modern UI**: Clean, responsive design with dark mode support
- 🚀 **Fast & Lightweight**: Optimized Next.js application with static export

## MBTQ Ecosystem Integration

This application is part of the larger MBTQ ecosystem:

- **Mbtq.dev**: Central hub for modular business processes
- **360 Business Magician**: Platform to assist entrepreneurs
- **Texas Idea Generator**: Specialized tool for Texas market opportunities

## Deployment Options

This project supports multiple deployment methods:

### Option 1: Nginx Deployment (Recommended for Self-Hosting)

#### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t texas-idea-generator .
docker run -p 3000:80 texas-idea-generator
```

The application will be available at `http://localhost:3000`

#### Manual Nginx Setup

1. Build the static export:
```bash
npm install --legacy-peer-deps
npm run build
```

2. Copy the `out` directory to your nginx web root:
```bash
sudo cp -r out/* /var/www/html/
```

3. Use the provided nginx configuration:
```bash
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf
sudo nginx -s reload
```

### Option 2: Vercel Deployment (Cloud-Based)

This project can also be deployed on Vercel for a serverless experience:

1. Fork or connect this repository to your Vercel account
2. Vercel will automatically detect the Next.js configuration
3. Deploy with one click

**Note**: For Vercel deployment, you may want to comment out the `output: 'export'` line in `next.config.mjs` to enable server-side features.

### Option 3: Other Static Hosting

Since this project exports to static HTML/CSS/JS, it can be hosted on:

- **AWS S3 + CloudFront**
- **GitHub Pages**
- **Netlify**
- **Cloudflare Pages**
- Any web server capable of serving static files

## Development

### Prerequisites

- Node.js 20+ 
- npm or pnpm

### Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server (for non-static mode)
npm start
```

### Project Structure

```
texas-idea-generator/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── idea-generator.tsx  # Main idea generator component
│   ├── accessibility-banner.tsx
│   ├── theme-provider.tsx
│   └── ui/                 # UI components (shadcn/ui)
├── lib/                    # Utility functions
│   ├── idea-generator.ts   # Idea generation logic
│   └── utils.ts            # Helper utilities
├── nginx/                  # Nginx configuration
│   └── nginx.conf          # Production nginx config
├── public/                 # Static assets
├── Dockerfile              # Docker build configuration
├── docker-compose.yml      # Docker Compose setup
└── .github/
    └── workflows/
        └── ci.yml          # GitHub Actions CI/CD
```

## Configuration

### Environment Variables

No environment variables are required for basic functionality. The application uses client-side JavaScript and does not require a backend server.

### Nginx Configuration

The nginx configuration is located at `nginx/nginx.conf` and includes:

- Gzip compression
- Static asset caching
- Security headers
- Health check endpoint at `/health`
- SPA routing support

## Contributing

We welcome contributions to the Texas Idea Generator! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Related Projects

- [MBTQ Platform](https://mbtq.dev) - Main MBTQ ecosystem hub
- [360 Business Magician](https://360businessmagician.mbtquniverse.com) - Full business assistance platform

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- 🌐 Visit [mbtq.dev](https://mbtq.dev)
- 📧 Contact through [360 Business Magician](https://360businessmagician.mbtquniverse.com)

---

**Built with ❤️ for Texas Entrepreneurs by the MBTQ Ecosystem**