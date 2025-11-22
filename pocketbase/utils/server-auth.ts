"use server";

import { createServerClient, createServiceClient } from "@/pocketbase/clients/server";
import { cookies } from "next/headers";
import { COOKIES_NAME } from "@/pocketbase/constants";
import { redirect } from "next/navigation";
import { UsersResponse } from "@/pocketbase/clients/pocketbase-types";
import { ClientResponseError } from "pocketbase";

// Some basic auth actions


export async function signupWithEmailPassword(email: string, password: string, name: string) {
    const pb = await createServiceClient();

    try {
        try {
            const existingUser = await pb.collection("users").getFirstListItem(`email="${email}"`);
            // update the user
            await pb.collection("users").update(existingUser.id, {
                name: name,
                password: password,
                passwordConfirm: password,
            });
        } catch (err) {
            if (err instanceof ClientResponseError && err.status === 404) {
                // user not found, create new
                await pb.collection("users").create({
                    name: name,
                    email: email,
                    emailVisibility: true,
                    password: password,
                    passwordConfirm: password,
                });
            } else {
                throw err;
            }
        }
        await pb.collection("users").authWithPassword(email, password);
        await pb.collection("users").requestVerification(email);
        (await cookies()).set(COOKIES_NAME, pb.authStore.exportToCookie());
    } catch (error) {
        console.error("Signup error:", error);
        throw new Error("Failed to create account. The email might already be in use or the data is invalid.");
    }
}

export async function signinWithEmailPassword(email: string, password: string) {
    const pb = await createServerClient();

    try {
        await pb.collection("users").authWithPassword(email, password);
        (await cookies()).set(COOKIES_NAME, pb.authStore.exportToCookie());
    } catch (error) {
        console.error("Signin error:", error);
        throw new Error("Failed to sign in. Please check your credentials or ensure your email is verified.");
    }
}

export async function logout() {
    const pb = await createServerClient();
    pb.authStore.clear();
    (await cookies()).set(COOKIES_NAME, pb.authStore.exportToCookie());
    redirect("/sign-in");
}

/**
 * (Server Side) Get the currently authenticated user from the server-side session
 */
export async function getUser(): Promise<UsersResponse | null> {
    const pb = await createServerClient();

    if (pb.authStore.isValid) {
        return pb.authStore.record as UsersResponse;
    } else {
        return null;
    }
}

/**
 * (Server Side) Get the currently authenticated user from the server-side session.
 * If the visitor is not logged in, redirect them.
 * @param url The url you want to send all the logged out vistors to.
 */
export async function requireUser(url: string = "/"): Promise<UsersResponse> {
    const pb = await createServerClient();

    if (pb.authStore.isValid) {
        return pb.authStore.record as UsersResponse;
    }

    // If the visitor is logged out, just send them to the given url.
    redirect(url);
}
