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
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
})

// Network options with their fees
const networks = [
  { id: "ethereum", name: "Ethereum (ERC20)", fee: 0.01 },
  { id: "bsc", name: "Binance Smart Chain (BEP20)", fee: 0.005 },
  { id: "polygon", name: "Polygon", fee: 0.003 },
  { id: "arbitrum", name: "Arbitrum", fee: 0.002 },
  { id: "optimism", name: "Optimism", fee: 0.002 },
  { id: "avalanche", name: "Avalanche", fee: 0.004 },
]

export default function UsdtSenderForm() {
  const [fee, setFee] = useState(0)
  const [total, setTotal] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientAddress: "",
      amount: "",
      network: "",
    },
  })

  // Watch for form value changes to calculate fee
  const amount = form.watch("amount")
  const network = form.watch("network")

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

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, store in localStorage
      const transactions = JSON.parse(localStorage.getItem("flashUsdtTransactions") || "[]")
      const newTransaction = {
        id: `tx-${Date.now()}`,
        recipientAddress: values.recipientAddress,
        amount: Number.parseFloat(values.amount),
        network: networks.find((n) => n.id === values.network)?.name || values.network,
        fee: fee,
        total: total,
        timestamp: Date.now(),
        status: "completed",
      }

      transactions.push(newTransaction)
      localStorage.setItem("flashUsdtTransactions", JSON.stringify(transactions))

      // Show success message
      setSubmitStatus("success")
      setStatusMessage("Transaction submitted successfully!")

      // Reset form
      form.reset()
    } catch (error) {
      console.error("Error submitting transaction:", error)
      setSubmitStatus("error")
      setStatusMessage("Failed to submit transaction. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
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
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (USDT)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
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
                        {network.name} (Fee: {network.fee * 100}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {amount && network && !isNaN(Number.parseFloat(amount)) && (
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>{Number.parseFloat(amount).toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span>Network Fee:</span>
                <span>{fee.toFixed(4)} USDT</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{total.toFixed(4)} USDT</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Send USDT"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
