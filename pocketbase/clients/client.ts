import "client-only";

import { TypedPocketBase } from "./pocketbase-types";
import PocketBase from "pocketbase";
import { COOKIES_NAME } from "../constants";

let singletonClient: TypedPocketBase | null = null;

function getCookie(name: string) {
    const nameEQ = encodeURIComponent(name) + "=";
    if (typeof document === "undefined") return null;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

export function createBrowserClient() {
    if (singletonClient === null) {
        singletonClient = new PocketBase(
            process.env.NEXT_PUBLIC_POCKETBASE_URL
        ) as TypedPocketBase;
    }

    singletonClient.authStore.loadFromCookie(getCookie(COOKIES_NAME) || "");

    return singletonClient;
}