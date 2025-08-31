"use client";

import { getUser } from "@/pocketbase/utils/client-auth";

export default function Client() {
    const user = getUser();

    return (
        <div>
            {
                user ? <div>{user.name}</div> : <div>You're not logged in.</div>
            }
        </div>
    )
}