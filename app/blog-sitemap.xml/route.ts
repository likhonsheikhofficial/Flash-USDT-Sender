/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

export const dynamic = "force-static"

export async function GET() {
  const baseUrl = "https://procryptoflashers.vip"

  // Blog posts for sitemap
  const blogPosts = [
    {
      slug: "what-is-flash-usdt-sender",
      lastModified: "2023-11-15T08:00:00+00:00",
    },
    {
      slug: "usdt-sending-fees-explained",
      lastModified: "2023-12-01T08:00:00+00:00",
    },
    {
      slug: "flash-usdt-sender-vs-alternatives",
      lastModified: "2024-01-10T08:00:00+00:00",
    },
    {
      slug: "sending-usdt-from-trust-wallet",
      lastModified: "2024-01-25T08:00:00+00:00",
    },
    {
      slug: "how-tether-usdt-works",
      lastModified: "2024-02-08T08:00:00+00:00",
    },
    {
      slug: "flash-usdt-sender-version-comparison",
      lastModified: "2024-02-20T08:00:00+00:00",
    },
    {
      slug: "usdt-scam-warning",
      lastModified: "2024-04-15T08:00:00+00:00",
    },
  ]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${blogPosts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <lastmod>${post.lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
