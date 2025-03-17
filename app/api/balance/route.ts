import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NODE_ENV === "production" ? "https://buggyapi.onrender.com/balance" : "http://localhost:3000/balance";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        const response = await axios.get(`${API_URL}?userId=${userId}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching balance:", error);
        return NextResponse.json(
            { error: "Failed to fetch balance" },
            { status: 500 }
        );
    }
}