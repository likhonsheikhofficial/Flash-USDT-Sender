/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-[url('/interconnected-nodes.png')] opacity-10 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Flash USDT Sender - Version 2.3</h1>
          <p className="text-xl mb-8 text-purple-100">
            The fastest, most secure way to transfer USDT between Ethereum, BSC, Polygon, TRC20, and other networks with
            minimal fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/access">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                Start Sending <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Networks Supported", value: "10+" },
              { label: "Transactions", value: "1M+" },
              { label: "Average Fee", value: "0.5%" },
              { label: "Transfer Time", value: "<30s" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
