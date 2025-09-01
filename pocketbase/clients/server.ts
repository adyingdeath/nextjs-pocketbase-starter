import "server-only";

import { TypedPocketBase } from "./pocketbase-types";
import PocketBase from "pocketbase";
import { COOKIES_NAME } from "../constants";
import { cookies } from "next/headers";

export async function createServerClient() {
    const client = new PocketBase(
        process.env.NEXT_PUBLIC_POCKETBASE_URL
    ) as TypedPocketBase;

    const authCookie = (await cookies()).get(COOKIES_NAME);
    if (authCookie) {
        client.authStore.loadFromCookie(authCookie.value);
    }

    return client;
}

export async function createServiceClient() {
    const client = new PocketBase(
        process.env.NEXT_PUBLIC_POCKETBASE_URL
    ) as TypedPocketBase;

    client.authStore.save(process.env.POCKETBASE_SECRET_API_KEY!);

    return client;
}
