import { signupWithEmailPassword } from "@/pocketbase/actions/auth";
import { Metadata } from "next";

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

    await signupWithEmailPassword(email, password, name);
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