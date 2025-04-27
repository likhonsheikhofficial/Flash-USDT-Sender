/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

export const dynamic = "force-static"

export async function GET() {
  const baseUrl = "https://procryptoflashers.vip"

  // Education pages for sitemap
  const educationPages = [
    {
      path: "/education/usdt-safety/",
      lastModified: new Date().toISOString(),
      changeFreq: "weekly",
      priority: 0.9,
    },
    {
      path: "/education/flash-usdt-scams/",
      lastModified: new Date().toISOString(),
      changeFreq: "weekly",
      priority: 0.9,
    },
  ]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${educationPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
