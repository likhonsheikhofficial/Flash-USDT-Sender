/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

export const dynamic = "force-static"

export async function GET() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Important pages
Allow: /access
Allow: /about
Allow: /blog/
Allow: /faq
Allow: /education/

# Sitemaps
Sitemap: https://procryptoflashers.vip/sitemap-index.xml
`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
