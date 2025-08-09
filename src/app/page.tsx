"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../app/components/ui/card";
import { Badge } from "../app/components/ui/badge";
import { Skeleton } from "../app/components/ui/skeleton";
import { Alert, AlertDescription } from "../app/components/ui/alert";
import { AlertCircle } from "lucide-react";
import AssetAllocation from "../app/components/portfolio/AssetAllocation";
import HoldingsTable from "../app/components/portfolio/HoldingsTable";
import PerformanceChart from "../app/components/portfolio/PerformanceChart";

interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  topPerformer: {
    symbol: string;
    name: string;
    gainPercent: number;
  };
  worstPerformer: {
    symbol: string;
    name: string;
    gainPercent: number;
  };
  diversificationScore: number;
  riskLevel: string;
}

export default function Home() {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/api/portfolio/summary");
        if (!response.ok) throw new Error("Failed to fetch portfolio summary");
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

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

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Portfolio Dashboard
        </h1>
        <p className="text-muted-foreground text-center">
          Comprehensive view of your investment portfolio
        </p>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.totalValue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Gain/Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                summary.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(summary.totalGainLoss)}
            </div>
            <p
              className={`text-xs ${
                summary.totalGainLossPercent >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercent(summary.totalGainLossPercent)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.totalInvested)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  summary.riskLevel === "Low"
                    ? "secondary"
                    : summary.riskLevel === "Moderate"
                    ? "default"
                    : "destructive"
                }
              >
                {summary.riskLevel}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Score: {summary.diversificationScore}/10
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performer</CardTitle>
            <CardDescription>
              Best performing stock in your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{summary.topPerformer.name}</span>
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  {formatPercent(summary.topPerformer.gainPercent)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Symbol: {summary.topPerformer.symbol}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Worst Performer</CardTitle>
            <CardDescription>
              Underperforming stock in your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {summary.worstPerformer.name}
                </span>
                <Badge variant="destructive">
                  {formatPercent(summary.worstPerformer.gainPercent)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Symbol: {summary.worstPerformer.symbol}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Asset Allocation</h2>
        <AssetAllocation />
      </div>

      {/* Holdings Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Portfolio Holdings
        </h2>
        <HoldingsTable />
      </div>

      {/* Performance Chart */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Performance Analysis
        </h2>
        <PerformanceChart />
      </div>
    </div>
  );
}
