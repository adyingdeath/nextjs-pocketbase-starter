"use client";

import { UsersResponse } from "@/pocketbase/clients/pocketbase-types";
import { getUser } from "@/pocketbase/utils/client-auth";
import { useEffect, useState } from "react";

export default function Client() {
    const [user, setUser] = useState<UsersResponse | null>();
    
    useEffect(() => {
        setUser(getUser());
    }, []);

    return (
        <div>
            {
                user ? <div>{user.name}</div> : <div>You're logged out.</div>
            }
        </div>
    )
}