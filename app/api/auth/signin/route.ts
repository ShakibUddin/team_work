import { ILOGIN_UNAUTHENTICATED_USER } from "@/app/(auth)/signin/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const baseUrl = process.env.base;
    if (!baseUrl) {
        throw new Error('Error');
    }

    const payload: ILOGIN_UNAUTHENTICATED_USER = body || {};

    const response = await fetch(baseUrl + "user/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    const data = await response.json();

    return NextResponse.json(data);
}
