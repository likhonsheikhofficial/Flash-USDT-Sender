/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import JsonLd from "@/components/json-ld"

export default function NotFound() {
  // 404 page structured data
  const notFoundData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://flash-usdt-sender.com/404/#webpage",
    url: "https://flash-usdt-sender.com/404/",
    name: "Page Not Found - Flash USDT Sender",
    description: "The page you are looking for doesn't exist or has been moved.",
    isPartOf: {
      "@id": "https://flash-usdt-sender.com/#website",
    },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <JsonLd data={notFoundData} />
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Home className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
    </div>
  )
}
