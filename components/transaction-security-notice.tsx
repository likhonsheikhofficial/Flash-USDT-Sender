/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert, ExternalLink, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TransactionSecurityNotice() {
  return (
    <div className="space-y-4 mb-6">
      <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <ShieldAlert className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Transaction Security</AlertTitle>
        <AlertDescription className="text-blue-700">
          <p className="mb-2">
            Flash USDT Sender employs industry-leading security protocols to ensure your transactions are protected. Our
            platform uses end-to-end encryption, secure API endpoints, and follows blockchain security best practices.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Always double-check the recipient address before confirming</li>
            <li>Ensure you're sending to the correct network (ERC20, BEP20, etc.)</li>
            <li>Transactions cannot be reversed once confirmed</li>
            <li>
              Be aware of{" "}
              <Link href="/education/usdt-safety" className="text-blue-600 hover:underline inline-flex items-center">
                common USDT scams <ExternalLink className="h-3 w-3 ml-0.5" />
              </Link>
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-3 rounded-md border border-green-100">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <h3 className="font-medium text-green-800">Secure Transfers</h3>
          </div>
          <p className="text-sm text-green-700">
            All transactions are secured with military-grade encryption and multi-factor authentication protocols.
          </p>
        </div>

        <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
            <h3 className="font-medium text-purple-800">Cross-Chain Support</h3>
          </div>
          <p className="text-sm text-purple-700">
            Send USDT across multiple networks including Ethereum, BSC, Polygon, and more with optimized fees.
          </p>
        </div>

        <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-4 w-4 text-indigo-600 mr-2" />
            <h3 className="font-medium text-indigo-800">Wallet Compatibility</h3>
          </div>
          <p className="text-sm text-indigo-700">
            Compatible with MetaMask, Trust Wallet, Coinbase Wallet, and other popular cryptocurrency wallets.
          </p>
        </div>
      </div>
    </div>
  )
}
