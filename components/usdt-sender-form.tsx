/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

"use client"

import { useState, useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Wallet,
  QrCode,
  Clock,
  Shield,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { ExternalLink } from "lucide-react"

// Form validation schema
const formSchema = z.object({
  recipientAddress: z
    .string()
    .min(30, { message: "Address must be at least 30 characters" })
    .max(50, { message: "Address must be less than 50 characters" })
    .regex(/^(0x)?[0-9a-fA-F]{40}$/, { message: "Invalid wallet address format" }),
  amount: z
    .string()
    .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Amount must be a number" })
    .refine((val) => Number.parseFloat(val) > 0, { message: "Amount must be greater than 0" })
    .refine((val) => Number.parseFloat(val) <= 100000, { message: "Amount must be less than 100,000 USDT" }),
  network: z.string({
    required_error: "Please select a network",
  }),
  memo: z.string().optional(),
})

// Network options with their fees and estimated times
const networks = [
  { id: "ethereum", name: "Ethereum (ERC20)", fee: 0.01, time: "1-5 minutes", icon: "/network-icons/ethereum.svg" },
  { id: "bsc", name: "Binance Smart Chain (BEP20)", fee: 0.005, time: "30-60 seconds", icon: "/network-icons/bsc.svg" },
  { id: "polygon", name: "Polygon", fee: 0.003, time: "30-60 seconds", icon: "/network-icons/polygon.svg" },
  { id: "arbitrum", name: "Arbitrum", fee: 0.002, time: "30-60 seconds", icon: "/network-icons/arbitrum.svg" },
  { id: "optimism", name: "Optimism", fee: 0.002, time: "30-60 seconds", icon: "/network-icons/optimism.svg" },
  { id: "avalanche", name: "Avalanche", fee: 0.004, time: "2-4 seconds", icon: "/network-icons/avalanche.svg" },
]

// Transaction status type
type TransactionStatus = "idle" | "confirming" | "processing" | "success" | "error"

export default function UsdtSenderForm() {
  const [fee, setFee] = useState(0)
  const [total, setTotal] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [securityChecks, setSecurityChecks] = useState<{
    addressValidated: boolean
    networkConfirmed: boolean
    balanceVerified: boolean
  }>({
    addressValidated: false,
    networkConfirmed: false,
    balanceVerified: false,
  })
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>("idle")
  const [transactionProgress, setTransactionProgress] = useState(0)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [recentAddresses, setRecentAddresses] = useState<string[]>([])
  const [showAddressBook, setShowAddressBook] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientAddress: "",
      amount: "",
      network: "",
      memo: "",
    },
  })

  // Watch for form value changes to calculate fee
  const amount = form.watch("amount")
  const network = form.watch("network")
  const recipientAddress = form.watch("recipientAddress")

  // Load recent addresses from localStorage on component mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem("recentAddresses")
    if (savedAddresses) {
      setRecentAddresses(JSON.parse(savedAddresses))
    }
  }, [])

  // Calculate fee when amount or network changes
  useEffect(() => {
    if (amount && network) {
      const selectedNetwork = networks.find((n) => n.id === network)
      if (selectedNetwork) {
        const amountValue = Number.parseFloat(amount)
        if (!isNaN(amountValue)) {
          const calculatedFee = amountValue * selectedNetwork.fee
          setFee(calculatedFee)
          setTotal(amountValue + calculatedFee)
        }
      }
    } else {
      setFee(0)
      setTotal(0)
    }
  }, [amount, network])

  // Validate address format and perform security checks
  useEffect(() => {
    if (recipientAddress && recipientAddress.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
      // Simulate address validation
      setSecurityChecks((prev) => ({
        ...prev,
        addressValidated: true,
      }))
    } else {
      setSecurityChecks((prev) => ({
        ...prev,
        addressValidated: false,
      }))
    }
  }, [recipientAddress])

  // Validate network compatibility
  useEffect(() => {
    if (network && recipientAddress) {
      // Simulate network compatibility check
      setSecurityChecks((prev) => ({
        ...prev,
        networkConfirmed: true,
      }))
    } else {
      setSecurityChecks((prev) => ({
        ...prev,
        networkConfirmed: false,
      }))
    }
  }, [network, recipientAddress])

  // Validate balance
  useEffect(() => {
    if (amount && network) {
      const amountValue = Number.parseFloat(amount)
      if (!isNaN(amountValue)) {
        // Simulate balance check - in a real app, this would check the wallet balance
        const mockBalance = 1000 // Mock balance of 1000 USDT
        setSecurityChecks((prev) => ({
          ...prev,
          balanceVerified:
            amountValue + amountValue * (networks.find((n) => n.id === network)?.fee || 0) <= mockBalance,
        }))
      }
    } else {
      setSecurityChecks((prev) => ({
        ...prev,
        balanceVerified: false,
      }))
    }
  }, [amount, network])

  // Update transaction progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (transactionStatus === "processing") {
      interval = setInterval(() => {
        setTransactionProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          if (newProgress >= 100) {
            clearInterval(interval)
            setTransactionStatus("success")
            setTransactionHash(
              `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
            )
            return 100
          }
          return newProgress
        })
      }, 800)
    }

    return () => clearInterval(interval)
  }, [transactionStatus])

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Open confirmation dialog instead of submitting immediately
    setShowConfirmation(true)
  }

  // Handle actual transaction after confirmation
  const handleConfirmedSubmit = async () => {
    setShowConfirmation(false)
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorDetails(null)
    setTransactionStatus("confirming")
    setTransactionProgress(0)
    setShowTransactionModal(true)

    try {
      // Simulate wallet confirmation delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate transaction processing
      setTransactionStatus("processing")

      // Simulate network request with random success/failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 10% chance of network error
          if (Math.random() < 0.1) {
            reject(new Error("Network connection error. Please check your internet connection and try again."))
            return
          }

          // Simulate 5% chance of insufficient funds
          if (Math.random() < 0.05) {
            reject(new Error("Insufficient funds to complete this transaction. Please check your balance."))
            return
          }

          resolve(true)
        }, 5000)
      })

      // For demo purposes, store in localStorage
      const transactions = JSON.parse(localStorage.getItem("flashUsdtTransactions") || "[]")
      const newTransaction = {
        id: `tx-${Date.now()}`,
        recipientAddress: form.getValues("recipientAddress"),
        amount: Number.parseFloat(form.getValues("amount")),
        network: networks.find((n) => n.id === form.getValues("network"))?.name || form.getValues("network"),
        fee: fee,
        total: total,
        timestamp: Date.now(),
        status: "completed",
        transactionHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
        memo: form.getValues("memo") || "",
      }

      transactions.push(newTransaction)
      localStorage.setItem("flashUsdtTransactions", JSON.stringify(transactions))

      // Add to recent addresses if not already present
      if (!recentAddresses.includes(form.getValues("recipientAddress"))) {
        const updatedAddresses = [form.getValues("recipientAddress"), ...recentAddresses].slice(0, 5)
        setRecentAddresses(updatedAddresses)
        localStorage.setItem("recentAddresses", JSON.stringify(updatedAddresses))
      }

      // Show success message
      setSubmitStatus("success")
      setStatusMessage("Transaction submitted successfully!")

      // Reset form
      form.reset()
    } catch (error) {
      console.error("Error submitting transaction:", error)
      setSubmitStatus("error")
      setStatusMessage("Failed to submit transaction.")
      setTransactionStatus("error")

      // Set detailed error message if available
      if (error instanceof Error) {
        setErrorDetails(error.message)
      } else {
        setErrorDetails("An unexpected error occurred. Please try again later.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Select address from address book
  const selectAddress = (address: string) => {
    form.setValue("recipientAddress", address)
    setShowAddressBook(false)
  }

  // Scan QR code (simulated)
  const scanQrCode = () => {
    toast({
      title: "QR Scanner",
      description: "QR code scanning is simulated in this demo. A random address has been generated.",
    })

    // Generate a random Ethereum address
    const randomAddress = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
    form.setValue("recipientAddress", randomAddress)
  }

  return (
    <div className="space-y-6">
      {submitStatus !== "idle" && (
        <Alert
          className={`mb-6 ${submitStatus === "success" ? "bg-green-50" : "bg-red-50"}`}
          variant={submitStatus === "success" ? "default" : "destructive"}
        >
          {submitStatus === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>{submitStatus === "success" ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>
            {statusMessage}
            {errorDetails && <div className="mt-2 text-sm font-medium">{errorDetails}</div>}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2 text-purple-800">Send USDT</h2>
            <p className="text-sm text-gray-600">
              Transfer USDT across multiple blockchain networks with low fees and fast processing times. Connect your
              wallet, enter the recipient's address, specify the amount, and select the network.
            </p>
          </div>

          <FormField
            control={form.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Recipient Address</FormLabel>
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            className="h-8 w-8"
                            onClick={() => setShowAddressBook(true)}
                          >
                            <Wallet className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Address Book</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" type="button" className="h-8 w-8" onClick={scanQrCode}>
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Scan QR Code</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="0x..." {...field} className="pr-24" />
                    {field.value && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Badge
                          variant={securityChecks.addressValidated ? "outline" : "destructive"}
                          className={
                            securityChecks.addressValidated ? "bg-green-50 text-green-700 border-green-200" : ""
                          }
                        >
                          {securityChecks.addressValidated ? "Valid" : "Invalid"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USDT)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" placeholder="0.00" {...field} className="pr-16" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">USDT</div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {networks.map((network) => (
                        <SelectItem key={network.id} value={network.id}>
                          <div className="flex items-center">
                            <img
                              src={network.icon || "/placeholder.svg"}
                              alt={network.name}
                              className="w-4 h-4 mr-2"
                              onError={(e) => {
                                // Fallback if image fails to load
                                e.currentTarget.src = "/placeholder.svg?height=16&width=16"
                              }}
                            />
                            <span>{network.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="memo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Memo (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Add a note to this transaction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {amount && network && !isNaN(Number.parseFloat(amount)) && (
            <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">{Number.parseFloat(amount).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Network Fee:</span>
                  <span className="font-medium">{fee.toFixed(4)} USDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {networks.find((n) => n.id === network)?.time || "1-5 minutes"}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total:</span>
                    <span>{total.toFixed(4)} USDT</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security checks display */}
          {recipientAddress && (
            <div className="space-y-2 bg-gray-50 p-3 rounded-md">
              <h3 className="text-sm font-medium flex items-center mb-2">
                <Shield className="h-4 w-4 mr-1 text-purple-600" />
                Security Checks
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div
                    className={`w-4 h-4 rounded-full ${securityChecks.addressValidated ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <span>
                    {securityChecks.addressValidated ? "Address format validated" : "Validating address format..."}
                  </span>
                </div>
                {network && (
                  <div className="flex items-center space-x-2 text-sm">
                    <div
                      className={`w-4 h-4 rounded-full ${securityChecks.networkConfirmed ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <span>
                      {securityChecks.networkConfirmed
                        ? "Network compatibility confirmed"
                        : "Checking network compatibility..."}
                    </span>
                  </div>
                )}
                {amount && (
                  <div className="flex items-center space-x-2 text-sm">
                    <div
                      className={`w-4 h-4 rounded-full ${securityChecks.balanceVerified ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span>
                      {securityChecks.balanceVerified
                        ? "Sufficient balance verified"
                        : "Insufficient balance for this transaction"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              <>
                Review Transaction <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Transaction</DialogTitle>
            <DialogDescription>Please review the transaction details carefully before proceeding.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Card className="border-gray-200">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Recipient Address</div>
                    <div className="font-mono text-sm bg-gray-50 p-2 rounded break-all">
                      {form.getValues("recipientAddress")}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Amount</div>
                      <div className="font-medium">
                        {Number.parseFloat(form.getValues("amount") || "0").toFixed(2)} USDT
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Network</div>
                      <div className="font-medium flex items-center">
                        <img
                          src={networks.find((n) => n.id === form.getValues("network"))?.icon || "/placeholder.svg"}
                          alt={networks.find((n) => n.id === form.getValues("network"))?.name || ""}
                          className="w-4 h-4 mr-1"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=16&width=16"
                          }}
                        />
                        {networks.find((n) => n.id === form.getValues("network"))?.name || ""}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Fee</div>
                      <div className="font-medium">{fee.toFixed(4)} USDT</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Total</div>
                      <div className="font-medium">{total.toFixed(4)} USDT</div>
                    </div>
                  </div>

                  {form.getValues("memo") && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Memo</div>
                      <div className="text-sm bg-gray-50 p-2 rounded">{form.getValues("memo")}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cryptocurrency transactions are irreversible once confirmed</li>
                  <li>Ensure the recipient address and network are correct</li>
                  <li>Sending to an incorrect address will result in permanent loss of funds</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmedSubmit}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm & Send"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction Status Modal */}
      <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {transactionStatus === "confirming" && "Waiting for Confirmation"}
              {transactionStatus === "processing" && "Processing Transaction"}
              {transactionStatus === "success" && "Transaction Successful"}
              {transactionStatus === "error" && "Transaction Failed"}
            </DialogTitle>
            <DialogDescription>
              {transactionStatus === "confirming" && "Please confirm this transaction in your wallet"}
              {transactionStatus === "processing" && "Your transaction is being processed on the blockchain"}
              {transactionStatus === "success" && "Your USDT has been sent successfully"}
              {transactionStatus === "error" && "There was an error processing your transaction"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {(transactionStatus === "confirming" || transactionStatus === "processing") && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
                </div>

                {transactionStatus === "processing" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Transaction progress</span>
                      <span>{Math.round(transactionProgress)}%</span>
                    </div>
                    <Progress value={transactionProgress} className="h-2" />
                  </div>
                )}

                <div className="text-center text-sm text-gray-500">
                  {transactionStatus === "confirming" &&
                    "Please check your wallet application to confirm this transaction"}
                  {transactionStatus === "processing" && "This may take a few moments depending on network congestion"}
                </div>
              </div>
            )}

            {transactionStatus === "success" && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full h-16 w-16 bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Transaction Hash</div>
                    <div className="font-mono text-sm bg-gray-50 p-2 rounded break-all">{transactionHash}</div>
                  </div>

                  <div className="text-center">
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a
                        href={`https://etherscan.io/tx/${transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        View on Explorer <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {transactionStatus === "error" && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full h-16 w-16 bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                </div>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Transaction Failed</AlertTitle>
                  <AlertDescription>
                    {errorDetails || "There was an error processing your transaction. Please try again."}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowTransactionModal(false)}
              className={transactionStatus === "success" ? "bg-green-600 hover:bg-green-700" : ""}
              disabled={transactionStatus === "confirming" || transactionStatus === "processing"}
            >
              {transactionStatus === "success" ? "Done" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Address Book Dialog */}
      <Dialog open={showAddressBook} onOpenChange={setShowAddressBook}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Address Book</DialogTitle>
            <DialogDescription>Select a previously used address or enter a new one.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {recentAddresses.length > 0 ? (
              <div className="space-y-2">
                {recentAddresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectAddress(address)}
                  >
                    <div className="font-mono text-sm truncate max-w-[200px]">{address}</div>
                    <Button variant="ghost" size="sm">
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No recent addresses found. Send USDT to save addresses here.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddressBook(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
