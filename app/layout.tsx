import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import JsonLd from "@/components/json-ld"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flash USDT Sender - Fast & Secure USDT Transfers",
  description:
    "Send USDT across multiple networks instantly with low fees. Secure, fast, and reliable USDT transfer service.",
  keywords:
    "USDT, Tether, crypto transfer, blockchain, fast transfers, secure USDT, cross-chain, Ethereum, BSC, Polygon",
  authors: [{ name: "likhonsheikh", url: "https://github.com/likhonsheikhofficial" }],
  creator: "likhonsheikh",
  publisher: "Flash USDT Sender",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://procryptoflashers.vip",
    siteName: "Flash USDT Sender",
    title: "Flash USDT Sender - Fast & Secure USDT Transfers",
    description:
      "Send USDT across multiple networks instantly with low fees. Secure, fast, and reliable USDT transfer service.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flash USDT Sender - Fast & Secure USDT Transfers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash USDT Sender - Fast & Secure USDT Transfers",
    description:
      "Send USDT across multiple networks instantly with low fees. Secure, fast, and reliable USDT transfer service.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://procryptoflashers.vip",
  },
    generator: 'v0.dev'
}

// Organization structured data
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://procryptoflashers.vip/#organization",
  name: "Flash USDT Sender",
  url: "https://procryptoflashers.vip",
  logo: {
    "@type": "ImageObject",
    url: "https://procryptoflashers.vip/logo.png",
    width: 512,
    height: 512,
  },
  description: "The fastest and most secure way to send USDT across multiple blockchain networks.",
  sameAs: [
    "https://github.com/likhonsheikhofficial",
    "https://twitter.com/procryptoflash",
    "https://facebook.com/procryptoflashers",
    "https://instagram.com/procryptoflashers",
    "https://t.me/RecentCoders",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@procryptoflashers.vip",
    availableLanguage: ["English"],
  },
}

// Website structured data
const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://procryptoflashers.vip/#website",
  url: "https://procryptoflashers.vip",
  name: "Flash USDT Sender",
  description: "Fast & Secure USDT Transfers Across Multiple Networks",
  publisher: {
    "@id": "https://procryptoflashers.vip/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://procryptoflashers.vip/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <JsonLd data={[organizationData, websiteData]} />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
