/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, Tag } from "lucide-react"
import JsonLd from "@/components/json-ld"

export const dynamic = "force-static"

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "what-is-flash-usdt-sender",
      title: "What is Flash USDT Sender and How Does It Work?",
      description:
        "A comprehensive guide to Flash USDT Sender, its features, and how it simplifies cross-chain USDT transfers.",
      date: "2023-11-15",
      readTime: "5 min read",
      tags: ["Flash USDT Sender", "Cryptocurrency", "USDT", "Blockchain"],
    },
    {
      slug: "usdt-sending-fees-explained",
      title: "USDT Sending Fees Explained: Network Comparison Guide",
      description:
        "Compare USDT sending fees across Ethereum, BSC, Polygon, and other networks to minimize transaction costs.",
      date: "2023-12-01",
      readTime: "4 min read",
      tags: ["USDT Fees", "Ethereum", "BSC", "Polygon"],
    },
    {
      slug: "flash-usdt-sender-vs-alternatives",
      title: "Flash USDT Sender vs. Alternatives: Which Tool is Best?",
      description:
        "An objective comparison between Flash USDT Sender and other popular USDT transfer tools in the market.",
      date: "2024-01-10",
      readTime: "6 min read",
      tags: ["USDT Tools", "Comparison", "Cryptocurrency Tools"],
    },
    {
      slug: "sending-usdt-from-trust-wallet",
      title: "Complete Guide to Sending USDT from Trust Wallet",
      description: "Step-by-step instructions for sending USDT from Trust Wallet to other wallets and exchanges.",
      date: "2024-01-25",
      readTime: "4 min read",
      tags: ["Trust Wallet", "USDT", "Wallet Transfer"],
    },
    {
      slug: "how-tether-usdt-works",
      title: "How Does Tether (USDT) Work? A Beginner's Guide",
      description:
        "Understanding the mechanics, backing, and use cases of Tether (USDT) in the cryptocurrency ecosystem.",
      date: "2024-02-08",
      readTime: "7 min read",
      tags: ["Tether", "USDT", "Stablecoins", "Cryptocurrency"],
    },
    {
      slug: "flash-usdt-sender-version-comparison",
      title: "Flash USDT Sender: Version 2.0 vs 2.2 vs 2.3 Comparison",
      description: "Explore the evolution of Flash USDT Sender through its versions and feature improvements.",
      date: "2024-02-20",
      readTime: "5 min read",
      tags: ["Flash USDT Sender", "Software Versions", "Feature Comparison"],
    },
  ]

  // Blog page structured data
  const blogPageData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://flash-usdt-sender.com/blog/#webpage",
    url: "https://flash-usdt-sender.com/blog/",
    name: "Flash USDT Sender Blog - USDT Transfer Guides & News",
    description:
      "Learn about USDT transfers, fees, wallet compatibility, and get the latest updates on Flash USDT Sender.",
    isPartOf: {
      "@id": "https://flash-usdt-sender.com/#website",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://flash-usdt-sender.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://flash-usdt-sender.com/blog/",
        },
      ],
    },
  }

  // Blog posts structured data
  const blogPostsData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `https://flash-usdt-sender.com/blog/${post.slug}/`,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: "Flash USDT Sender Team",
        },
        publisher: {
          "@id": "https://flash-usdt-sender.com/#organization",
        },
        keywords: post.tags.join(", "),
      },
    })),
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <JsonLd data={[blogPageData, blogPostsData]} />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Flash USDT Sender Blog</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Stay updated with the latest guides, tutorials, and news about USDT transfers, blockchain networks, and Flash
          USDT Sender features.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
