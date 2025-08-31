import "client-only";

import { TypedPocketBase } from "./pocketbase-types";
import PocketBase from "pocketbase";

let singletonClient: TypedPocketBase | null = null;

export function createBrowserClient() {
    const createNewClient = () => {
        return new PocketBase(
            process.env.NEXT_PUBLIC_POCKETBASE_URL
        ) as TypedPocketBase;
    };

    const _singletonClient = singletonClient ?? createNewClient();

    if (!singletonClient) singletonClient = _singletonClient;

    singletonClient.authStore.onChange(() => {
        document.cookie = singletonClient!.authStore.exportToCookie({
            httpOnly: false,
        });
    });

    return singletonClient;
}