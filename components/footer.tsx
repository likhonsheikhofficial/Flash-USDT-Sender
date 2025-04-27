/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import Link from "next/link"
import Image from "next/image"
import { Github, FileWarning } from "lucide-react"
import { FaTelegram, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"
import { Shield, AlertTriangle } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Partner logos for "Powered By" section
  const partners = [
    { name: "Microsoft Azure", logo: "/partners/microsoft-azure.webp", url: "https://azure.microsoft.com/" },
    { name: "Google Cloud", logo: "/partners/google-cloud.webp", url: "https://cloud.google.com/" },
    { name: "Oracle Cloud Infrastructure", logo: "/partners/oracle-cloud.webp", url: "https://www.oracle.com/cloud/" },
    { name: "VMware", logo: "/partners/vmware.webp", url: "https://www.vmware.com/" },
    { name: "Canonical MAAS", logo: "/partners/canonical-maas.webp", url: "https://maas.io/" },
    { name: "Joyent", logo: "/partners/joyent.webp", url: "https://www.joyent.com/" },
    { name: "Ubuntu Certified", logo: "/partners/ubuntu-certified.webp", url: "https://ubuntu.com/" },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12" itemScope itemType="https://schema.org/WPFooter">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4" itemProp="name">
              Flash USDT Sender
            </h3>
            <p className="mb-4 max-w-md" itemProp="description">
              The fastest and most secure way to send USDT across multiple blockchain networks. Low fees, instant
              transfers, and reliable service.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/likhonsheikhofficial"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/RecentCoders"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/procryptoflash"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/procryptoflashers"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/procryptoflashers"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/access" className="text-gray-400 hover:text-white">
                  Send USDT
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-gray-400 hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-400 hover:text-white">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-gray-400 hover:text-white">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/education/usdt-safety" className="text-gray-400 hover:text-white flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-red-400" /> USDT Safety Guide
                </Link>
              </li>
              <li>
                <Link href="/education/flash-usdt-scams" className="text-gray-400 hover:text-white flex items-center">
                  <FileWarning className="h-4 w-4 mr-1 text-yellow-400" /> Flash USDT Scams Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/usdt-scam-warning" className="text-gray-400 hover:text-white flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-yellow-400" /> Scam Warnings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-red-900/30 p-4 rounded-lg border border-red-700/50">
          <h4 className="text-lg font-semibold mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-400" /> Important Security Notice
          </h4>
          <p className="text-sm">
            Beware of scams claiming to "create" or "generate" USDT tokens. This is technically impossible and
            fraudulent. Flash USDT Sender only helps transfer your existing USDT across networks. Learn more in our{" "}
            <Link href="/education/flash-usdt-scams" className="text-red-300 hover:underline">
              Flash USDT Scams Guide
            </Link>
            .
          </p>
        </div>

        {/* Powered By Section */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <h4 className="text-lg font-semibold mb-6 text-center">Powered By</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-md flex items-center justify-center h-16 w-full"
                aria-label={`Visit ${partner.name}`}
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} - Flash USDT Sender Partner`}
                  width={100}
                  height={40}
                  className="object-contain h-full"
                />
              </a>
            ))}
          </div>
        </div>

        {/* SEO Enhanced Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p itemProp="copyrightNotice">© {currentYear} Flash USDT Sender. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Licensed under{" "}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              AGPL-3.0
            </a>
          </p>
          <div className="mt-4 text-sm max-w-3xl mx-auto">
            <p>
              Flash USDT Sender provides the fastest cross-chain USDT transfers with industry-leading security
              protocols. Supporting Ethereum (ERC20), Binance Smart Chain (BEP20), Polygon, Arbitrum, Optimism, and
              Avalanche networks.
            </p>
            <p className="mt-2">
              Our platform is trusted by thousands of users worldwide for daily cryptocurrency transactions with minimal
              fees and maximum reliability.
            </p>
            <p className="mt-2">
              Powered by{" "}
              <a
                href="https://procryptoflashers.vip/"
                className="underline hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                procryptoflashers.vip
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
