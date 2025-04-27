/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import JsonLd from "@/components/json-ld"

export const dynamic = "force-static"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Flash USDT Sender?",
      answer:
        "Flash USDT Sender is a specialized tool designed to facilitate fast and secure transfers of USDT (Tether) across multiple blockchain networks. It offers lower fees, faster processing times, and a more user-friendly experience compared to traditional transfer methods.",
    },
    {
      question: "Is Flash USDT Sender a way to create or generate USDT?",
      answer:
        "No. Flash USDT Sender is NOT a tool for creating or generating USDT tokens. It is a legitimate service for transferring your existing USDT across different blockchain networks. Any service claiming to 'create' or 'generate' USDT is fraudulent. Only Tether Limited can mint new USDT tokens.",
      isWarning: true,
    },
    {
      question: "Can I sell 'Flash USDT' on Binance or other exchanges?",
      answer:
        "There is no such thing as 'Flash USDT' as a separate cryptocurrency. Our service name refers to the speed of transfers, not to a different type of USDT. Legitimate USDT (Tether) can be sold on exchanges like Binance, but any service claiming to offer 'Flash USDT' as a separate token is fraudulent.",
      isWarning: true,
    },
    {
      question: "How does Flash USDT Sender compare to other USDT transfer tools?",
      answer:
        "Flash USDT Sender offers several advantages over alternatives, including faster transaction times (under 30 seconds), lower fees (average 0.5%), support for more blockchain networks, and a more intuitive user interface. Our tool is specifically optimized for USDT transfers, unlike general cryptocurrency wallets.",
    },
    {
      question: "What versions of Flash USDT Sender are available?",
      answer:
        "Flash USDT Sender is currently available in version 2.3, which is the latest release with enhanced security features and expanded network support. Previous versions include 2.0 and 2.2, each with progressive improvements in speed, security, and user experience.",
    },
    {
      question: "Is Flash USDT Sender available on GitHub?",
      answer:
        "Yes, Flash USDT Sender's open-source components are available on GitHub under the AGPL-3.0 license. You can access the repository at github.com/likhonsheikhofficial for code review, contributions, or to report issues.",
    },
    {
      question: "How fast are USDT transfers with Flash USDT Sender?",
      answer:
        "Flash USDT Sender completes most transfers in under 30 seconds, depending on network conditions. Our optimized infrastructure ensures that your transactions are processed as quickly as possible, regardless of which blockchain network you're using.",
    },
    {
      question: "Which blockchain networks are supported?",
      answer:
        "We support Ethereum (ERC20), Binance Smart Chain (BEP20), Polygon, Arbitrum, Optimism, and Avalanche networks. We're constantly working to add support for additional networks based on user demand and market trends.",
    },
    {
      question: "What are the fees for sending USDT?",
      answer:
        "Fees vary by network, typically ranging from 0.2% to 1% of the transaction amount, with an average of 0.5%. Ethereum network transfers tend to have slightly higher fees due to network congestion, while newer networks like Arbitrum and Optimism offer lower fees.",
    },
    {
      question: "Is Flash USDT Sender secure?",
      answer:
        "Yes, we implement bank-grade encryption and security protocols to ensure all transactions are secure and protected. We use multi-factor authentication, secure API endpoints, and regular security audits to maintain the highest level of security for our users.",
    },
    {
      question: "Can I send USDT from Trust Wallet using Flash USDT Sender?",
      answer:
        "Yes, Flash USDT Sender is compatible with Trust Wallet. You can initiate a transfer from your Trust Wallet to any supported destination address. Our system will guide you through the process to ensure a smooth transfer experience.",
    },
    {
      question: "What happens if I send USDT to an ETH address?",
      answer:
        "When sending USDT to an ETH address, it's important to ensure the address supports the specific token standard you're using (e.g., ERC20). If the address is compatible, the transaction will complete normally. If not, the funds may be lost. Flash USDT Sender includes address validation to help prevent such errors.",
    },
    {
      question: "How does Tether (USDT) work?",
      answer:
        "Tether (USDT) is a stablecoin pegged to the US dollar, meaning each USDT token is designed to maintain a value of approximately $1 USD. Tether Limited, the company behind USDT, claims to hold reserves equal to the value of all USDT in circulation. USDT exists on multiple blockchain networks, allowing for different transaction speeds and fee structures.",
    },
    {
      question: "Is USDT considered a security?",
      answer:
        "The regulatory status of USDT varies by jurisdiction. In most countries, USDT is currently treated as a digital asset or virtual currency rather than a security. However, regulatory frameworks are evolving, and users should stay informed about the legal status of USDT in their respective jurisdictions.",
    },
    {
      question: "What are the USDT sending fees on different networks?",
      answer:
        "USDT sending fees vary significantly across networks: Ethereum (ERC20) typically has the highest fees (often $5-20 during congestion), Binance Smart Chain (BEP20) offers lower fees ($0.20-1.00), Polygon fees are very low ($0.01-0.10), and networks like Arbitrum and Optimism fall in between ($0.50-3.00). Flash USDT Sender helps you select the most cost-effective network for your transfers.",
    },
    {
      question: "Is there a Flash USDT Sender mobile app?",
      answer:
        "Yes, Flash USDT Sender is available as a mobile app for both Android and iOS devices. The app offers the same functionality as our web platform, allowing you to send USDT across multiple networks from your mobile device with the same speed and security features.",
    },
    {
      question: "Can I add USDT to Trust Wallet using Flash USDT Sender?",
      answer:
        "While Flash USDT Sender is primarily designed for sending USDT, you can use it to transfer USDT to your Trust Wallet address. To add USDT to Trust Wallet, you'll need to ensure you've added the USDT token in Trust Wallet (for the correct network), then use Flash USDT Sender to send USDT to your Trust Wallet address.",
    },
    {
      question: "Is USDT safe and trustworthy?",
      answer:
        "Legitimate USDT (Tether) is one of the most widely used stablecoins in the cryptocurrency ecosystem. While it has become an essential part of the crypto market, users should be aware that all cryptocurrencies carry risks. Tether Limited claims that each USDT token is backed by assets in their reserves, though there have been discussions in the industry about the exact nature of these reserves. As with any cryptocurrency, it's important to do your own research.",
    },
    {
      question: "What's the difference between USDT on different networks?",
      answer:
        "USDT exists on multiple blockchain networks including Ethereum (ERC20), Binance Smart Chain (BEP20), and Tron (TRC20). The value is the same across all networks (approximately 1 USD), but the transaction fees, processing times, and wallet compatibility vary. For example, TRC20 USDT typically has much lower fees than ERC20 USDT, but you must ensure your destination wallet supports the specific network you're using.",
    },
  ]

  // FAQ page structured data
  const faqPageData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://flash-usdt-sender.com/faq/#webpage",
    url: "https://flash-usdt-sender.com/faq/",
    name: "Frequently Asked Questions - Flash USDT Sender",
    description: "Find answers to common questions about Flash USDT Sender's services, fees, security, and more.",
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
          name: "FAQ",
          item: "https://flash-usdt-sender.com/faq/",
        },
      ],
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <JsonLd data={faqPageData} />
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Security Notice</AlertTitle>
          <AlertDescription>
            Beware of scams claiming to "create" or "generate" USDT tokens. This is technically impossible and
            fraudulent. Our service only helps transfer your existing USDT across networks.{" "}
            <Link href="/education/usdt-safety" className="font-medium underline">
              Learn more about USDT safety
            </Link>
            .
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.isWarning ? (
                  <span className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    {faq.question}
                  </span>
                ) : (
                  faq.question
                )}
              </AccordionTrigger>
              <AccordionContent>
                <p className={`${faq.isWarning ? "text-red-600 font-medium" : "text-gray-700"}`}>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-lg">Still have questions?</p>
          <p className="mt-2">
            <a href="mailto:support@flash-usdt-sender.com" className="text-purple-600 hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
