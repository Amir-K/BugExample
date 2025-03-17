import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NODE_ENV === "production" ? "https://buggyapi.onrender.com/balance" : "http://localhost:3000/balance";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, userId } = body;

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        if (amount === undefined || amount === null) {
            return NextResponse.json({ error: "amount is required" }, { status: 400 });
        }

        if (typeof amount !== 'number') {
            return NextResponse.json({ error: "amount must be a number" }, { status: 400 });
        }

        const response = await axios.post(API_URL, { amount, userId });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error processing transaction:", error);
        return NextResponse.json(
            { error: "Failed to process transaction" },
            { status: 500 }
        );
    }
}