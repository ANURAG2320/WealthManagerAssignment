import { NextResponse } from "next/server";

// Sample portfolio allocation data
const allocationData = {
  "bySector": {
"Technology": { "value": 250000, "percentage": 35.7 },
"Banking": { "value": 180000, "percentage": 25.7 },
"Energy": { "value": 134025, "percentage": 19.1 },
"Healthcare": { "value": 136000, "percentage": 19.4 }
  },
  "byMarketCap": {
    "Large": { "value": 1970711.25, "percentage": 65.0 },
    "Mid": { "value": 175000.00, "percentage": 25.0 },
    "Small": { "value": 70000.00, "percentage": 10.0 }
  }
};

export async function GET() {
  try {
    return NextResponse.json(allocationData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio allocation" },
      { status: 500 }
    );
  }
}