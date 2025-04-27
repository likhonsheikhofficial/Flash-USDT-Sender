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

  // Define all routes with their metadata
  const routes = [
    {
      url: "/",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "/about",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "/access",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "/blog",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "/faq",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "/education/usdt-safety",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "/education/flash-usdt-scams",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "/terms",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "/privacy",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "/disclaimer",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "/compliance",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]

  // Add blog posts to routes
  blogPosts.forEach((post) => {
    routes.push({
      url: `/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  })

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
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
