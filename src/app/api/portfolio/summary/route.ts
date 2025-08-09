import { NextResponse } from "next/server";


const summaryData = {
  "totalValue": 2215711.25,
  "totalInvested": 1900000,
  "totalGainLoss": 315711.25,
  "totalGainLossPercent": 16.67,
  "topPerformer": {
    "symbol": "BAJFINANCE",
    "name": "Bajaj Finance Ltd",
    "gainPercent": 28.5
  },
  "worstPerformer": {
    "symbol": "HDFC",
    "name": "HDFC Bank Ltd",
    "gainPercent": -2.1
  },
  "diversificationScore": 8.2,
  "riskLevel": "Moderate"
};

export async function GET() {
  try {
    return NextResponse.json(summaryData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio summary" },
      { status: 500 }
    );
  }
}