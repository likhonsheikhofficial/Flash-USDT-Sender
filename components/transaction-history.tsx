/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface Transaction {
  id: string
  recipientAddress: string
  amount: number
  network: string
  fee: number
  total: number
  timestamp: number
  status: "pending" | "completed" | "failed"
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load transactions from localStorage
    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem("flashUsdtTransactions")
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions))
        }
      } catch (error) {
        console.error("Error loading transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [])

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading transaction history...</div>
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No transactions found.</p>
        <p className="text-sm mt-2">Your transaction history will appear here after you send USDT.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Network</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">
                    {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                  </TableCell>
                  <TableCell>{tx.network}</TableCell>
                  <TableCell>{formatAddress(tx.recipientAddress)}</TableCell>
                  <TableCell className="text-right">{tx.amount.toFixed(2)} USDT</TableCell>
                  <TableCell className="text-right">{tx.fee.toFixed(4)} USDT</TableCell>
                  <TableCell>{getStatusBadge(tx.status)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
