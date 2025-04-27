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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Search, Filter, Download, Copy, Clock, ArrowUpDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Transaction {
  id: string
  recipientAddress: string
  amount: number
  network: string
  fee: number
  total: number
  timestamp: number
  status: "pending" | "completed" | "failed"
  transactionHash?: string
  memo?: string
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [networkFilter, setNetworkFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null
    direction: "ascending" | "descending"
  }>({
    key: "timestamp",
    direction: "descending",
  })

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

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${type} copied`,
      description: `${type} has been copied to clipboard`,
    })
  }

  // Handle sorting
  const requestSort = (key: keyof Transaction) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Filter and sort transactions
  const getFilteredAndSortedTransactions = () => {
    let filteredTransactions = [...transactions]

    // Apply search filter
    if (searchTerm) {
      filteredTransactions = filteredTransactions.filter(
        (tx) =>
          tx.recipientAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.transactionHash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.memo?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filteredTransactions = filteredTransactions.filter((tx) => tx.status === statusFilter)
    }

    // Apply network filter
    if (networkFilter !== "all") {
      filteredTransactions = filteredTransactions.filter((tx) => tx.network.includes(networkFilter))
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredTransactions.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filteredTransactions
  }

  // Export transactions to CSV
  const exportToCSV = () => {
    const filteredTransactions = getFilteredAndSortedTransactions()
    const headers = ["Date", "Network", "Recipient", "Amount", "Fee", "Total", "Status", "Transaction Hash", "Memo"]

    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map((tx) =>
        [
          new Date(tx.timestamp).toISOString(),
          tx.network,
          tx.recipientAddress,
          tx.amount.toFixed(2),
          tx.fee.toFixed(4),
          tx.total.toFixed(4),
          tx.status,
          tx.transactionHash || "",
          tx.memo || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `usdt_transactions_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: "Your transaction history has been exported to CSV",
    })
  }

  // Get unique networks for filtering
  const getUniqueNetworks = () => {
    const networks = transactions.map((tx) => tx.network)
    return [...new Set(networks)]
  }

  // Get transaction statistics
  const getTransactionStats = () => {
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0)
    const totalFees = transactions.reduce((sum, tx) => sum + tx.fee, 0)
    const completedCount = transactions.filter((tx) => tx.status === "completed").length
    const pendingCount = transactions.filter((tx) => tx.status === "pending").length
    const failedCount = transactions.filter((tx) => tx.status === "failed").length

    return {
      totalAmount,
      totalFees,
      completedCount,
      pendingCount,
      failedCount,
      totalCount: transactions.length,
    }
  }

  const filteredTransactions = getFilteredAndSortedTransactions()
  const stats = getTransactionStats()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <Card className="bg-gray-50 border-dashed">
        <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center">
          <div className="rounded-full bg-gray-100 p-3 mb-4">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No transactions found</h3>
          <p className="text-gray-500 text-center max-w-md">
            Your transaction history will appear here after you send USDT. Use the form in the "Send USDT" tab to make
            your first transaction.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Statuses {statusFilter === "all" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                Completed {statusFilter === "completed" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending {statusFilter === "pending" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("failed")}>
                Failed {statusFilter === "failed" && "✓"}
              </DropdownMenuItem>

              <DropdownMenuLabel className="mt-2">Filter by Network</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setNetworkFilter("all")}>
                All Networks {networkFilter === "all" && "✓"}
              </DropdownMenuItem>
              {getUniqueNetworks().map((network) => (
                <DropdownMenuItem key={network} onClick={() => setNetworkFilter(network)}>
                  {network} {networkFilter === network && "✓"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-10" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="table">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("timestamp")}>
                    <div className="flex items-center">
                      Date
                      {sortConfig.key === "timestamp" && (
                        <ArrowUpDown
                          className={`ml-1 h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => requestSort("amount")}>
                    <div className="flex items-center justify-end">
                      Amount
                      {sortConfig.key === "amount" && (
                        <ArrowUpDown
                          className={`ml-1 h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{formatDistanceToNow(tx.timestamp, { addSuffix: true })}</span>
                        <span className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{tx.network}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono text-sm">{formatAddress(tx.recipientAddress)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(tx.recipientAddress, "Address")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{tx.amount.toFixed(2)} USDT</TableCell>
                    <TableCell className="text-right">{tx.fee.toFixed(4)} USDT</TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    <TableCell className="text-right">
                      {tx.transactionHash && (
                        <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                          <a
                            href={`https://etherscan.io/tx/${tx.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            View <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">No transactions match your search criteria.</div>
          )}
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Transactions</CardTitle>
                <CardDescription>All-time transaction count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalCount}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {stats.completedCount} completed, {stats.pendingCount} pending, {stats.failedCount} failed
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Amount Sent</CardTitle>
                <CardDescription>Sum of all transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalAmount.toFixed(2)} USDT</div>
                <div className="text-sm text-gray-500 mt-1">Across {getUniqueNetworks().length} different networks</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Fees Paid</CardTitle>
                <CardDescription>Network fees for all transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalFees.toFixed(4)} USDT</div>
                <div className="text-sm text-gray-500 mt-1">
                  Average fee: {(stats.totalFees / stats.totalCount).toFixed(4)} USDT per transaction
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Your transaction history over time. This section provides a comprehensive overview of your USDT transfer
                activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Detailed transaction analytics will be available in future updates.</p>
                <p className="text-sm mt-2">
                  Track your transaction patterns, network usage, and fee optimization opportunities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <p>
          This transaction history is stored locally on your device. For security reasons, we do not store your
          transaction data on our servers. If you clear your browser data or switch devices, your transaction history
          will not be available.
        </p>
      </div>
    </div>
  )
}
