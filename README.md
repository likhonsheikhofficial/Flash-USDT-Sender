# Flash USDT Sender

A static website for sending USDT across multiple blockchain networks with low fees and instant transfers.

## Features

- Fast and secure USDT transfers across multiple blockchain networks
- Support for Ethereum (ERC20), Binance Smart Chain (BEP20), Polygon, Arbitrum, Optimism, and Avalanche
- Transaction history tracking
- Responsive design for all devices
- SEO optimized with structured data
- Static site generation for fast loading and easy deployment

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Project Structure

\`\`\`
flash-usdt-sender/
├── app/                    # Next.js App Router
│   ├── about/              # About page
│   ├── access/             # USDT sender page
│   ├── compliance/         # Compliance page
│   ├── disclaimer/         # Disclaimer page
│   ├── faq/                # FAQ page
│   ├── privacy/            # Privacy policy page
│   ├── robots.txt/         # Robots.txt route
│   ├── sitemap.xml/        # Sitemap route
│   ├── terms/              # Terms of service page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx       # 404 page
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── ui/                 # shadcn/ui components
│   ├── breadcrumb-schema.tsx # Breadcrumb schema component
│   ├── feature-card.tsx    # Feature card component
│   ├── footer.tsx          # Footer component
│   ├── hero-section.tsx    # Hero section component
│   ├── json-ld.tsx         # JSON-LD schema component
│   ├── navbar.tsx          # Navigation component
│   ├── testimonial-card.tsx # Testimonial card component
│   ├── transaction-history.tsx # Transaction history component
│   └── usdt-sender-form.tsx # USDT sender form component
├── public/                 # Static assets
│   ├── partners/           # Partner logos
│   ├── blockchain-office-flow.png
│   ├── confident-asian-professional.png
│   ├── confident-latino-professional.png
│   ├── confident-professional.png
│   ├── interconnected-nodes.png
│   └── og-image.png
├── docs/                   # Documentation
│   └── README.md           # Project documentation
├── next.config.mjs         # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS configuration

\`\`\`

## SEO Features

The website includes comprehensive SEO optimizations:

1. **Structured Data (JSON-LD)**:
   - Organization data
   - Website data
   - WebPage data for each page
   - Service data for USDT transfer service
   - FAQPage data for FAQ sections
   - BreadcrumbList data for navigation hierarchy
   - SoftwareApplication data for the USDT sender tool
   - Person data for team members

2. **Meta Tags**:
   - Title and description for all pages
   - Open Graph tags for social sharing
   - Twitter Card tags
   - Canonical URLs

3. **Technical SEO**:
   - XML Sitemap
   - Robots.txt
   - Semantic HTML structure
   - Responsive design
   - Accessible content

## Deployment

This project is configured for static export, making it easy to deploy to GitHub Pages or any static hosting service.

### Build for Production

\`\`\`bash
npm run build
# or
yarn build
# or
bun run build
\`\`\`

The static site will be generated in the `out` directory.

### GitHub Pages Deployment

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

## License

This project is licensed under the AGPL-3.0 License - see the LICENSE file for details.

## Author

[likhonsheikh](https://github.com/likhonsheikhofficial)
\`\`\`

Let's also create a documentation file for the structured data implementation:
