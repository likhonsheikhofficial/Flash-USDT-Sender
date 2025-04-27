/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, AlertCircle, Copy, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

// Wallet types supported
const WALLET_TYPES = {
  METAMASK: "metamask",
  TRUST_WALLET: "trustwallet",
  COINBASE: "coinbase",
  WALLET_CONNECT: "walletconnect",
}

// Wallet connection status
type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error"

// Wallet information
interface WalletInfo {
  address: string
  chainId: number
  balance: string
  networkName: string
}

export default function WalletConnection() {
  const [isOpen, setIsOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected")
  const [walletType, setWalletType] = useState<string | null>(null)
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      // Check local storage for saved connection
      const savedWalletType = localStorage.getItem("connectedWalletType")
      const savedWalletAddress = localStorage.getItem("connectedWalletAddress")

      if (savedWalletType && savedWalletAddress) {
        setWalletType(savedWalletType)

        // Simulate fetching wallet info
        try {
          await simulateWalletConnection(savedWalletType)
        } catch (error) {
          // If connection fails, clear saved data
          localStorage.removeItem("connectedWalletType")
          localStorage.removeItem("connectedWalletAddress")
        }
      }
    }

    checkExistingConnection()
  }, [])

  // Simulate wallet connection
  const simulateWalletConnection = async (type: string): Promise<void> => {
    setConnectionStatus("connecting")
    setErrorMessage(null)

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Randomly generate wallet info for demo purposes
      const mockWalletInfo: WalletInfo = {
        address: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
        chainId: [1, 56, 137][Math.floor(Math.random() * 3)], // Ethereum, BSC, or Polygon
        balance: (Math.random() * 1000).toFixed(4),
        networkName: ["Ethereum", "Binance Smart Chain", "Polygon"][Math.floor(Math.random() * 3)],
      }

      // Simulate 10% chance of connection error
      if (Math.random() < 0.1) {
        throw new Error("Failed to connect to wallet. Please try again.")
      }

      setWalletInfo(mockWalletInfo)
      setConnectionStatus("connected")
      setWalletType(type)

      // Save connection info
      localStorage.setItem("connectedWalletType", type)
      localStorage.setItem("connectedWalletAddress", mockWalletInfo.address)

      // Close dialog after successful connection
      setTimeout(() => setIsOpen(false), 1000)
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred")
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletInfo(null)
    setConnectionStatus("disconnected")
    setWalletType(null)
    localStorage.removeItem("connectedWalletType")
    localStorage.removeItem("connectedWalletAddress")
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been successfully disconnected.",
    })
  }

  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    if (walletInfo?.address) {
      navigator.clipboard.writeText(walletInfo.address)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Get wallet icon based on type
  const getWalletIcon = (type: string) => {
    switch (type) {
      case WALLET_TYPES.METAMASK:
        return "/wallet-icons/metamask.svg"
      case WALLET_TYPES.TRUST_WALLET:
        return "/wallet-icons/trustwallet.svg"
      case WALLET_TYPES.COINBASE:
        return "/wallet-icons/coinbase.svg"
      case WALLET_TYPES.WALLET_CONNECT:
        return "/wallet-icons/walletconnect.svg"
      default:
        return "/wallet-icons/generic-wallet.svg"
    }
  }

  // Get wallet name based on type
  const getWalletName = (type: string) => {
    switch (type) {
      case WALLET_TYPES.METAMASK:
        return "MetaMask"
      case WALLET_TYPES.TRUST_WALLET:
        return "Trust Wallet"
      case WALLET_TYPES.COINBASE:
        return "Coinbase Wallet"
      case WALLET_TYPES.WALLET_CONNECT:
        return "WalletConnect"
      default:
        return "Wallet"
    }
  }

  return (
    <>
      {connectionStatus === "connected" && walletInfo ? (
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1 px-3 py-1 border-green-200 bg-green-50">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-green-700">Connected</span>
          </Badge>
          <Button variant="outline" size="sm" className="flex items-center" onClick={() => setIsOpen(true)}>
            <img src={getWalletIcon(walletType || "")} alt={getWalletName(walletType || "")} className="w-4 h-4 mr-2" />
            {formatAddress(walletInfo.address)}
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{connectionStatus === "connected" ? "Wallet Information" : "Connect Wallet"}</DialogTitle>
            <DialogDescription>
              {connectionStatus === "connected"
                ? "Your wallet is connected. View details below."
                : "Connect your wallet to send USDT across networks."}
            </DialogDescription>
          </DialogHeader>

          {connectionStatus === "connected" && walletInfo ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={getWalletIcon(walletType || "")}
                        alt={getWalletName(walletType || "")}
                        className="w-6 h-6"
                      />
                      <CardTitle className="text-lg">{getWalletName(walletType || "")}</CardTitle>
                    </div>
                    <Badge className="bg-green-500">Connected</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Address</div>
                    <div className="flex items-center justify-between">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {formatAddress(walletInfo.address)}
                      </code>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" onClick={copyAddressToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={`https://etherscan.io/address/${walletInfo.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Network</div>
                      <div className="font-medium">{walletInfo.networkName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Balance</div>
                      <div className="font-medium">{walletInfo.balance} USDT</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="w-full" onClick={disconnectWallet}>
                    Disconnect Wallet
                  </Button>
                </CardFooter>
              </Card>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Always verify transaction details before signing. Never share your private keys or seed phrase.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="space-y-4">
              {connectionStatus === "error" && errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Connection Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue={WALLET_TYPES.METAMASK}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value={WALLET_TYPES.METAMASK}>MetaMask</TabsTrigger>
                  <TabsTrigger value={WALLET_TYPES.TRUST_WALLET}>Trust</TabsTrigger>
                  <TabsTrigger value={WALLET_TYPES.COINBASE}>Coinbase</TabsTrigger>
                  <TabsTrigger value={WALLET_TYPES.WALLET_CONNECT}>WalletConnect</TabsTrigger>
                </TabsList>

                {Object.values(WALLET_TYPES).map((type) => (
                  <TabsContent key={type} value={type} className="space-y-4">
                    <div className="flex justify-center py-4">
                      <img
                        src={getWalletIcon(type) || "/placeholder.svg"}
                        alt={getWalletName(type)}
                        className="w-16 h-16"
                      />
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="font-medium text-lg">Connect to {getWalletName(type)}</h3>
                      <p className="text-sm text-gray-500">Connect securely using our supported wallet integration.</p>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      onClick={() => simulateWalletConnection(type)}
                      disabled={connectionStatus === "connecting"}
                    >
                      {connectionStatus === "connecting" ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span> Connecting...
                        </>
                      ) : (
                        <>Connect</>
                      )}
                    </Button>

                    <div className="text-xs text-center text-gray-500">
                      By connecting, you agree to our{" "}
                      <a href="/terms" className="underline">
                        Terms of Service
                      </a>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
