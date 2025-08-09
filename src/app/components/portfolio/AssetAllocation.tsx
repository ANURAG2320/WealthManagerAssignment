"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface AllocationData {
  bySector: Record<string, { value: number; percentage: number }>;
  byMarketCap: Record<string, { value: number; percentage: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

export default function AssetAllocation() {
  const [allocation, setAllocation] = useState<AllocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllocation();
  }, []);

  const fetchAllocation = async () => {
    try {
      const response = await fetch("/api/portfolio/allocation");
      if (!response.ok) throw new Error("Failed to fetch allocation data");
      const data = await response.json();
      setAllocation(data);
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
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
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

  if (!allocation) return null;

  const sectorData = Object.entries(allocation.bySector).map(([name, data]) => ({
    name,
    value: data.value,
    percentage: data.percentage,
  }));

  const marketCapData = Object.entries(allocation.byMarketCap).map(([name, data]) => ({
    name,
    value: data.value,
    percentage: data.percentage,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            Value: {formatCurrency(payload[0].payload.value)}
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: {formatPercent(payload[0].payload.percentage)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sector Distribution</CardTitle>
          <CardDescription>Portfolio allocation by industry sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${formatPercent(percentage)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Cap Distribution</CardTitle>
          <CardDescription>Portfolio allocation by market capitalization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketCapData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${formatPercent(percentage)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketCapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}