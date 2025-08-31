import { createBrowserClient } from "@/pocketbase/clients/client";
import { UsersResponse } from "@/pocketbase/clients/pocketbase-types";

/**
 * (Client Side) Get the currently authenticated user from the client-side session
 */
export function getUser(): UsersResponse | null {
    const pb = createBrowserClient();

    console.log(pb.authStore);

    if (pb.authStore.isValid) {
        return pb.authStore.record as UsersResponse;
    } else {
        return null;
    }
}
