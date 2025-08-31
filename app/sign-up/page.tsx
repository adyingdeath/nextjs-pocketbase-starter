import { createServerClient } from "@/pocketbase/clients/server";
import { COOKIES_NAME } from "@/pocketbase/constants";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Sign up"
}

async function signup(data: FormData) {
    "use server";

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (name === "" || email === "" || password === "") {
        return;
    }

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

export default async function page() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <form action={signup} className="bg-white text-black flex flex-col gap-1 p-12">
                <div>Name:</div>
                <input name="name" className="border"></input>
                <div>Email:</div>
                <input name="email" className="border"></input>
                <div>Password:</div>
                <input name="password" className="border"></input>
                <button className="border cursor-pointer">Sign up</button>
            </form>
        </div>
    )
}