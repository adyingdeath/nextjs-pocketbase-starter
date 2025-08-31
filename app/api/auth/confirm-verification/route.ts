import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/pocketbase/clients/server";

/**
 * Handle email confirmation callback.
*/
export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    try {
        const pb = await createServerClient();

        await pb.collection("users").confirmVerification(token);

        const redirectUrl = new URL("/dashboard", request.url);
        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }
}
