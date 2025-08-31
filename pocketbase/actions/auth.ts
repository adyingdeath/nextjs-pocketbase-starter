"use server";

import { createServerClient } from "@/pocketbase/clients/server";
import { cookies } from "next/headers";
import { COOKIES_NAME } from "@/pocketbase/constants";
import { redirect } from "next/navigation";
import { AuthRecord } from "pocketbase";

// Some basic auth actions


export async function signupWithEmailPassword(email: string, password: string, name: string) {
    const pb = await createServerClient();
    
    await pb.collection("users").create({
        name: name,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: password,
    });
    await pb.collection("users").authWithPassword(email, password);
    await pb.collection("users").requestVerification(email);
    (await cookies()).set(COOKIES_NAME, pb.authStore.exportToCookie());
}

export async function signinWithEmailPassword(email: string, password: string) {
    const pb = await createServerClient();

    await pb.collection("users").authWithPassword(email, password);
    (await cookies()).set(COOKIES_NAME, pb.authStore.exportToCookie());
    redirect("/dashboard");
}

export async function logout() {
    const pb = await createServerClient();
    pb.authStore.clear();
    (await cookies()).set(COOKIES_NAME, pb.authStore.exportToCookie());
    redirect("/sign-in");
}

type UserInfo = AuthRecord & {
    created: string,
    updated: string,
    email: string,
    emailVisibility: boolean,
    name: string,
    avatar: string,
    verified: boolean,
}

export async function getUser() {
    const pb = await createServerClient();

    if (pb.authStore.isValid) {
        return pb.authStore.record as UserInfo;
    } else {
        null
    }
}