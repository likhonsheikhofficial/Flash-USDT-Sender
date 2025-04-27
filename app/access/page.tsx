/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsdtSenderForm from "@/components/usdt-sender-form"
import TransactionHistory from "@/components/transaction-history"
import JsonLd from "@/components/json-ld"

export default function AccessPage() {
  const [activeTab, setActiveTab] = useState("send")

  // Access page structured data
  const accessPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://flash-usdt-sender.com/access/#webpage",
    url: "https://flash-usdt-sender.com/access/",
    name: "Send USDT - Flash USDT Sender",
    description: "Send USDT across multiple blockchain networks with low fees and instant transfers.",
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
          name: "Send USDT",
          item: "https://flash-usdt-sender.com/access/",
        },
      ],
    },
  }

  // Software application structured data
  const softwareAppData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flash USDT Sender",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
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
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <JsonLd data={[accessPageData, softwareAppData]} />
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Flash USDT Sender</h1>

        <Tabs defaultValue="send" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="send">Send USDT</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <UsdtSenderForm />
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TransactionHistory />
            </div>
          </TabsContent>
        </Tabs>

        {activeTab === "send" && (
          <div className="mt-8 bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Important Information</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All transactions are final and cannot be reversed.</li>
              <li>Make sure to double-check the recipient address before sending.</li>
              <li>Network fees are estimated and may vary slightly.</li>
              <li>For large transfers (over $10,000), additional verification may be required.</li>
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
