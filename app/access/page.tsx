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
import TransactionSecurityNotice from "@/components/transaction-security-notice"
import WalletConnection from "@/components/wallet-connection"
import JsonLd from "@/components/json-ld"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock, Shield, Zap, Globe, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

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
    <main className="flex min-h-screen flex-col py-12 bg-gradient-to-b from-white to-gray-50">
      <JsonLd data={[accessPageData, softwareAppData]} />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Flash USDT Sender
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The fastest and most secure way to transfer USDT across multiple blockchain networks with minimal fees.
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <WalletConnection />
        </div>

        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Send USDT Across Networks</CardTitle>
            <CardDescription className="text-purple-100">
              Transfer USDT between Ethereum, BSC, Polygon, and other networks with industry-leading security and
              minimal fees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                {
                  label: "Networks Supported",
                  value: "10+",
                  icon: <Globe className="h-6 w-6 mb-2 mx-auto text-purple-200" />,
                },
                { label: "Average Fee", value: "0.5%", icon: <Zap className="h-6 w-6 mb-2 mx-auto text-purple-200" /> },
                {
                  label: "Transfer Time",
                  value: "<30s",
                  icon: <Clock className="h-6 w-6 mb-2 mx-auto text-purple-200" />,
                },
                {
                  label: "Security Level",
                  value: "Enterprise",
                  icon: <Shield className="h-6 w-6 mb-2 mx-auto text-purple-200" />,
                },
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  {stat.icon}
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-purple-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="send" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="send" className="text-base py-3">
              Send USDT
            </TabsTrigger>
            <TabsTrigger value="history" className="text-base py-3">
              Transaction History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="mt-0">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <TransactionSecurityNotice />
              <UsdtSenderForm />
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <TransactionHistory />
            </div>
          </TabsContent>
        </Tabs>

        {activeTab === "send" && (
          <div className="mt-8 space-y-8">
            <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Important Security Notice</AlertTitle>
              <AlertDescription className="text-yellow-700">
                <p className="mb-2">
                  Beware of scams claiming to "create" or "generate" USDT tokens. This is technically impossible and
                  fraudulent. Our service only helps transfer your existing USDT across networks.
                </p>
                <p>
                  Flash USDT Sender is a legitimate service for transferring USDT between blockchain networks. We do not
                  create or generate USDT tokens, as this is technically impossible. Only Tether Limited, the company
                  behind USDT, can mint new tokens. Our service name refers to the speed of transfers, not to creating
                  tokens.
                </p>
                <div className="mt-2">
                  <Link
                    href="/education/usdt-safety"
                    className="text-yellow-800 font-medium hover:underline inline-flex items-center"
                  >
                    Learn more about USDT safety <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="mr-2 h-5 w-5 text-purple-600" /> USDT Transfer Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    USDT (Tether) is a stablecoin pegged to the US dollar, meaning each USDT token is designed to
                    maintain a value of approximately $1 USD. It exists on multiple blockchain networks, each with
                    different transaction speeds and fees.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-medium">Network Comparison:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>
                        <strong>Ethereum (ERC20):</strong> The original USDT network. Higher fees but widely accepted.
                      </li>
                      <li>
                        <strong>Binance Smart Chain (BEP20):</strong> Lower fees and faster transactions than Ethereum.
                      </li>
                      <li>
                        <strong>Polygon:</strong> Very low fees and fast transactions, growing adoption.
                      </li>
                      <li>
                        <strong>Arbitrum/Optimism:</strong> Ethereum Layer 2 solutions with lower fees and faster
                        transactions while maintaining Ethereum security.
                      </li>
                      <li>
                        <strong>Avalanche:</strong> Fast finality and low fees, popular for DeFi applications.
                      </li>
                    </ul>
                  </div>

                  <p>
                    When sending USDT, always ensure you're using the correct network that's supported by the
                    recipient's wallet or exchange. Sending USDT on the wrong network can result in lost funds.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-purple-600" /> Best Practices for USDT Transfers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Follow these best practices to ensure your USDT transfers are secure and successful:</p>

                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Double-check addresses:</strong> Always verify the full recipient address before
                      confirming any transaction. Even a single incorrect character will result in lost funds.
                    </li>
                    <li>
                      <strong>Verify network compatibility:</strong> Ensure the recipient supports the network you're
                      sending on. For example, if you send USDT on Polygon to an exchange that only supports ERC20, your
                      funds may be lost.
                    </li>
                    <li>
                      <strong>Start with small test transactions:</strong> When sending to a new address for the first
                      time, consider sending a small amount as a test before transferring larger sums.
                    </li>
                    <li>
                      <strong>Keep records:</strong> Save transaction hashes and confirmation details for all
                      significant transfers for future reference.
                    </li>
                    <li>
                      <strong>Use hardware wallets:</strong> For large amounts, consider using hardware wallets like
                      Ledger or Trezor for enhanced security.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">Important Information</h3>
              <div className="space-y-4">
                <p>
                  Flash USDT Sender provides a secure and efficient way to transfer USDT across multiple blockchain
                  networks. Our platform is designed with security and user experience as top priorities, ensuring your
                  transactions are processed quickly and safely.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All transactions are final and cannot be reversed once confirmed on the blockchain.</li>
                  <li>Network fees are estimated based on current network conditions and may vary slightly.</li>
                  <li>
                    For large transfers (over $10,000), additional verification may be required to comply with
                    regulatory requirements.
                  </li>
                  <li>
                    Our platform supports integration with popular cryptocurrency wallets including MetaMask, Trust
                    Wallet, and Coinbase Wallet.
                  </li>
                  <li>
                    Transaction times vary by network, with most completed in under 30 seconds, though Ethereum
                    transactions may take longer during periods of network congestion.
                  </li>
                  <li>
                    We employ industry-standard security measures including end-to-end encryption, secure API endpoints,
                    and regular security audits to protect your transactions.
                  </li>
                </ul>
                <p>
                  By using Flash USDT Sender, you acknowledge that you understand the risks associated with
                  cryptocurrency transactions and agree to our terms of service. We recommend reviewing our
                  comprehensive security guidelines before making significant transfers.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
