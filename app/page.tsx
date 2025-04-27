/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Clock, Globe, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import HeroSection from "@/components/hero-section"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import JsonLd from "@/components/json-ld"

export default function Home() {
  // Homepage structured data
  const homepageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://flash-usdt-sender.com/#webpage",
    url: "https://flash-usdt-sender.com/",
    name: "Flash USDT Sender - Fast & Secure USDT Transfers",
    description:
      "Send USDT across multiple networks instantly with low fees. Secure, fast, and reliable USDT transfer service.",
    isPartOf: {
      "@id": "https://flash-usdt-sender.com/#website",
    },
    about: {
      "@id": "https://flash-usdt-sender.com/#organization",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://flash-usdt-sender.com/og-image.png",
      width: 1200,
      height: 630,
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
      ],
    },
    keywords:
      "flash usdt sender, flash usdt sender online, flash usdt sender app, flash usdt sender tool, flash usdt sender wallet, usdt sending fee, tether usdt to usd, flash usdt trc20, sending usdt from trust wallet",
  }

  // Service structured data
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://flash-usdt-sender.com/#service",
    name: "USDT Transfer Service",
    description:
      "Fast and secure USDT transfers across multiple blockchain networks including Ethereum, BSC, Polygon, and more.",
    provider: {
      "@id": "https://flash-usdt-sender.com/#organization",
    },
    serviceType: "Cryptocurrency Transfer",
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: "0.5",
      priceCurrency: "USDT",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "0.5",
        priceCurrency: "USDT",
        unitText: "Percentage",
        description: "Average fee percentage for USDT transfers",
      },
    },
  }

  // FAQ structured data
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Flash USDT Sender?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Flash USDT Sender is a specialized tool designed to facilitate fast and secure transfers of USDT (Tether) across multiple blockchain networks with minimal fees and processing times.",
        },
      },
      {
        "@type": "Question",
        name: "Which blockchain networks are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support Ethereum (ERC20), Binance Smart Chain (BEP20), Polygon, Arbitrum, Optimism, and Avalanche networks.",
        },
      },
      {
        "@type": "Question",
        name: "What are the fees for sending USDT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fees vary by network, typically ranging from 0.2% to 1% of the transaction amount, with an average of 0.5%.",
        },
      },
      {
        "@type": "Question",
        name: "Can I send USDT from Trust Wallet using Flash USDT Sender?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Flash USDT Sender is compatible with Trust Wallet and other popular cryptocurrency wallets.",
        },
      },
    ],
  }

  // Software application structured data
  const softwareAppData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flash USDT Sender",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0.5",
      priceCurrency: "USDT",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "0.5",
        priceCurrency: "USDT",
        unitText: "Percentage",
        description: "Average fee percentage for USDT transfers",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    softwareVersion: "2.3",
  }

  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd data={[homepageData, serviceData, faqData, softwareAppData]} />
      <HeroSection />

      {/* Security Notice */}
      <div className="bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4 py-4">
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Security Notice</AlertTitle>
            <AlertDescription>
              Beware of scams claiming to "create" or "generate" USDT tokens. This is technically impossible and
              fraudulent. Our service only helps transfer your existing USDT across networks.{" "}
              <Link href="/education/usdt-safety" className="font-medium underline">
                Learn more
              </Link>
              .
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Flash USDT Sender</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-purple-600" />}
              title="Lightning Fast"
              description="Send USDT across networks in seconds, not minutes or hours."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-purple-600" />}
              title="Secure Transfers"
              description="Bank-grade encryption and security for all your transactions."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-purple-600" />}
              title="24/7 Availability"
              description="Send funds anytime, anywhere without restrictions."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-purple-600" />}
              title="Multi-Network"
              description="Support for Ethereum, BSC, Polygon, and more networks."
            />
          </div>
        </div>
      </section>

      {/* Version Info Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Flash USDT Sender Version 2.3</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Our latest version includes enhanced security features, support for additional networks, and an improved
            user interface. Experience the fastest USDT transfers with our most advanced version yet.
          </p>
          <div className="inline-flex items-center justify-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Latest Release: Version 2.3</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Sending USDT?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Flash USDT Sender for their daily transactions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/access">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                Send USDT Online <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog/what-is-flash-usdt-sender">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Wallet Compatibility Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Compatible With Popular Wallets</h2>
          <p className="text-center mb-10 max-w-3xl mx-auto">
            Flash USDT Sender works seamlessly with Trust Wallet, MetaMask, and other popular cryptocurrency wallets,
            making it easy to send USDT from any platform.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {["Trust Wallet", "MetaMask", "Coinbase Wallet", "Binance Wallet"].map((wallet) => (
              <div
                key={wallet}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20 text-center"
              >
                {wallet}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Flash USDT Sender saved me countless hours with its instant transfers. The fees are reasonable and the service is reliable."
              author="Alex Johnson"
              role="Crypto Trader"
            />
            <TestimonialCard
              quote="I've tried many USDT transfer services, but none match the speed and security of Flash USDT Sender."
              author="Sarah Williams"
              role="DeFi Investor"
            />
            <TestimonialCard
              quote="The multi-network support is a game-changer. I can send USDT to any network without worrying about compatibility."
              author="Michael Chen"
              role="Blockchain Developer"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
