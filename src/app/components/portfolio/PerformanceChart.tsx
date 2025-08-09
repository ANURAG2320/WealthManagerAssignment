"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PerformanceData {
  timeline: Array<{
    date: string;
    portfolio: number;
    nifty50: number;
    gold: number;
  }>;
  returns: {
    portfolio: { "1month": number; "3months": number; "1year": number };
    nifty50: { "1month": number; "3months": number; "1year": number };
    gold: { "1month": number; "3months": number; "1year": number };
  };
}

export default function PerformanceChart() {
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const response = await fetch("/api/portfolio/performance");
      if (!response.ok) throw new Error("Failed to fetch performance data");
      const data = await response.json();
      setPerformance(data);
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
      notation: "compact"
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
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

  if (!performance) return null;

  const chartData = performance.timeline.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === "portfolio" && `Portfolio: ${formatCurrency(entry.value)}`}
              {entry.dataKey === "nifty50" && `Nifty 50: ${entry.value.toLocaleString()}`}
              {entry.dataKey === "gold" && `Gold: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Timeline</CardTitle>
          <CardDescription>Portfolio performance vs benchmarks over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="portfolio" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nifty50" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="gold" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Returns Comparison</CardTitle>
          <CardDescription>Performance metrics across different time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">Portfolio</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>1 Month:</span>
                  <span className="font-medium">{formatPercent(performance.returns.portfolio["1month"])}</span>
                </div>
                <div className="flex justify-between">
                  <span>3 Months:</span>
                  <span className="font-medium">{formatPercent(performance.returns.portfolio["3months"])}</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Year:</span>
                  <span className="font-medium">{formatPercent(performance.returns.portfolio["1year"])}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-red-600">Nifty 50</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>1 Month:</span>
                  <span className="font-medium">{formatPercent(performance.returns.nifty50["1month"])}</span>
                </div>
                <div className="flex justify-between">
                  <span>3 Months:</span>
                  <span className="font-medium">{formatPercent(performance.returns.nifty50["3months"])}</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Year:</span>
                  <span className="font-medium">{formatPercent(performance.returns.nifty50["1year"])}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-amber-600">Gold</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>1 Month:</span>
                  <span className="font-medium">{formatPercent(performance.returns.gold["1month"])}</span>
                </div>
                <div className="flex justify-between">
                  <span>3 Months:</span>
                  <span className="font-medium">{formatPercent(performance.returns.gold["3months"])}</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Year:</span>
                  <span className="font-medium">{formatPercent(performance.returns.gold["1year"])}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}