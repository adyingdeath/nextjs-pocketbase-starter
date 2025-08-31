import { signinWithEmailPassword } from "@/pocketbase/actions/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in"
}

async function signin(data: FormData) {
    "use server";

    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (email === "" || password === "") {
        return;
    }

    await signinWithEmailPassword(email, password);
}

export default async function page() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <form action={signin} className="bg-white text-black flex flex-col gap-1 p-12">
                <div>Email:</div>
                <input name="email" className="border"></input>
                <div>Password:</div>
                <input name="password" className="border"></input>
                <button className="border cursor-pointer">Sign in</button>
            </form>
        </div>
    )
}