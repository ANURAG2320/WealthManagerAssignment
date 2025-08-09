import { NextResponse } from "next/server";

// Sample portfolio performance data
const performanceData = {
  "timeline": [
    {
      "date": "2024-01-01",
      "portfolio": 650000,
      "nifty50": 21000,
      "gold": 62000
    },
    {
      "date": "2024-02-01",
      "portfolio": 665000,
      "nifty50": 21500,
      "gold": 63200
    },
    {
      "date": "2024-03-01",
      "portfolio": 680000,
      "nifty50": 22100,
      "gold": 64500
    },
    {
      "date": "2024-04-01",
      "portfolio": 690000,
      "nifty50": 22800,
      "gold": 65800
    },
    {
      "date": "2024-05-01",
      "portfolio": 695000,
      "nifty50": 23200,
      "gold": 66900
    },
    {
      "date": "2024-06-01",
      "portfolio": 700000,
      "nifty50": 23500,
      "gold": 68000
    }
  ],
  "returns": {
    "portfolio": { "1month": 2.3, "3months": 8.1, "1year": 15.7 },
    "nifty50": { "1month": 1.8, "3months": 6.2, "1year": 12.4 },
    "gold": { "1month": -0.5, "3months": 4.1, "1year": 8.9 }
  }
};

export async function GET() {
  try {
    return NextResponse.json(performanceData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio performance" },
      { status: 500 }
    );
  }
}