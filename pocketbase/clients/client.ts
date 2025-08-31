import "client-only";

import { TypedPocketBase } from "./pocketbase-types";
import PocketBase from "pocketbase";

let singletonClient: TypedPocketBase | null = null;

export function createBrowserClient() {
    if (singletonClient === null) {
        singletonClient = new PocketBase(
            process.env.NEXT_PUBLIC_POCKETBASE_URL
        ) as TypedPocketBase;
    }

    singletonClient.authStore.loadFromCookie(document.cookie);

    console.log(singletonClient.authStore);

    singletonClient.authStore.onChange(() => {
        document.cookie = singletonClient!.authStore.exportToCookie({
            httpOnly: false,
        });
    });

    return singletonClient;
}