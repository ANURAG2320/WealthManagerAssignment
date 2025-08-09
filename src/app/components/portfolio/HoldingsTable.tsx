"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
  marketCap: string;
  value: number;
  gainLoss: number;
  gainLossPercent: number;
}

type SortField = keyof Holding;
type SortDirection = "asc" | "desc";

export default function HoldingsTable() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const response = await fetch("/api/portfolio/holdings");
      if (!response.ok) throw new Error("Failed to fetch holdings");
      const data = await response.json();
      setHoldings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedHoldings = useMemo(() => {
    let filtered = holdings.filter(holding =>
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    return filtered;
  }, [holdings, searchTerm, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Holdings</CardTitle>
          <CardDescription>Your current stock investments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Holdings</CardTitle>
        <CardDescription>Your current stock investments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by symbol, name, or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("symbol")}
                  >
                    <div className="flex items-center gap-2">
                      Symbol {getSortIcon("symbol")}
                    </div>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("sector")}
                  >
                    <div className="flex items-center gap-2">
                      Sector {getSortIcon("sector")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-right"
                    onClick={() => handleSort("quantity")}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      Qty {getSortIcon("quantity")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Avg Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-right"
                    onClick={() => handleSort("value")}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      Value {getSortIcon("value")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-right"
                    onClick={() => handleSort("gainLoss")}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      Gain/Loss {getSortIcon("gainLoss")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-right"
                    onClick={() => handleSort("gainLossPercent")}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      Gain % {getSortIcon("gainLossPercent")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedHoldings.map((holding) => (
                  <TableRow key={holding.symbol}>
                    <TableCell className="font-medium">{holding.symbol}</TableCell>
                    <TableCell>{holding.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{holding.sector}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{holding.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(holding.avgPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(holding.currentPrice)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(holding.value)}</TableCell>
                    <TableCell className="text-right">
                      <span className={holding.gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                        {formatCurrency(holding.gainLoss)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={holding.gainLossPercent >= 0 ? "default" : "destructive"}
                        className={holding.gainLossPercent >= 0 ? "bg-green-100 text-green-800" : ""}
                      >
                        {formatPercent(holding.gainLossPercent)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}