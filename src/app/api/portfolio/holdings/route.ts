


import { NextResponse } from "next/server";

const holdingsData = [ 
    {
    "symbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "quantity": 50,
    "avgPrice": 2450.00,
    "currentPrice": 2680.50,
    "sector": "Energy",
    "marketCap": "Large",
    "value": 134025.00,
    "gainLoss": 11525.00,
    "gainLossPercent": 9.4
  },
  {
    "symbol": "INFY",
    "name": "Infosys Limited",
    "quantity": 100,
    "avgPrice": 1800.00,
    "currentPrice": 2010.75,
    "sector": "Technology",
    "marketCap": "Large",
    "value": 201075.00,
    "gainLoss": 21075.00,
    "gainLossPercent": 11.7
  },
  {
    "symbol": "TCS",
    "name": "Tata Consultancy Services Ltd",
    "quantity": 75,
    "avgPrice": 3500.00,
    "currentPrice": 3850.25,
    "sector": "Technology",
    "marketCap": "Large",
    "value": 288768.75,
    "gainLoss": 26268.75,
    "gainLossPercent": 10.0
  },
  {
    "symbol": "HDFC",
    "name": "HDFC Bank Ltd",
    "quantity": 200,
    "avgPrice": 1500.00,
    "currentPrice": 1468.50,
    "sector": "Banking",
    "marketCap": "Large",
    "value": 293700.00,
    "gainLoss": -6300.00,
    "gainLossPercent": -2.1
  },
  {
    "symbol": "ICICI",
    "name": "ICICI Bank Ltd",
    "quantity": 150,
    "avgPrice": 950.00,
    "currentPrice": 1025.75,
    "sector": "Banking",
    "marketCap": "Large",
    "value": 153862.50,
    "gainLoss": 11362.50,
    "gainLossPercent": 8.0
  },
  {
    "symbol": "SUNPHARMA",
    "name": "Sun Pharmaceutical Industries Ltd",
    "quantity": 100,
    "avgPrice": 1200.00,
    "currentPrice": 1360.00,
    "sector": "Healthcare",
    "marketCap": "Large",
    "value": 136000.00,
    "gainLoss": 16000.00,
    "gainLossPercent": 13.3
  },
  {
    "symbol": "WIPRO",
    "name": "Wipro Ltd",
    "quantity": 120,
    "avgPrice": 450.00,
    "currentPrice": 485.50,
    "sector": "Technology",
    "value": 58260.00,
    "gainLoss": 4260.00,
    "gainLossPercent": 7.9
  },
  {
    "symbol": "AXISBANK",
    "name": "Axis Bank Ltd",
    "quantity": 80,
    "avgPrice": 1100.00,
    "currentPrice": 1165.25,
    "sector": "Banking",
    "marketCap": "Large",
    "value": 93220.00,
    "gainLoss": 5220.00,
    "gainLossPercent": 5.9
  },
  {
    "symbol": "BAJFINANCE",
    "name": "Bajaj Finance Ltd",
    "quantity": 50,
    "avgPrice": 7500.00,
    "currentPrice": 8200.00,
    "sector": "Financial",
    "marketCap": "Large",
    "value": 410000.00,
    "gainLoss": 35000.00,
    "gainLossPercent": 9.3
  },
  {
    "symbol": "M&M",
    "name": "Mahindra & Mahindra Ltd",
    "quantity": 60,
    "avgPrice": 1800.00,
    "currentPrice": 1950.00,
    "sector": "Automobile",
    "marketCap": "Large",
    "value": 117000.00,
    "gainLoss": 9000.00,
    "gainLossPercent": 8.3
  },
  {
    "symbol": "LT",
    "name": "Larsen & Toubro Ltd",
    "quantity": 40,
    "avgPrice": 3200.00,
    "currentPrice": 3450.00,
    "sector": "Infrastructure",
    "marketCap": "Large",
    "value": 138000.00,
    "gainLoss": 10000.00,
    "gainLossPercent": 7.8
  },
  {
    "symbol": "KOTAKBANK",
    "name": "Kotak Mahindra Bank Ltd",
    "quantity": 70,
    "avgPrice": 1800.00,
    "currentPrice": 1885.00,
    "sector": "Banking",
    "marketCap": "Large",
    "value": 131950.00,
    "gainLoss": 5950.00,
    "gainLossPercent": 4.7
  }
];// your holdings array (you already pasted it)

export async function GET() {
  try {
    return NextResponse.json(holdingsData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio holdings" },
      { status: 500 }
    );
  }
}
