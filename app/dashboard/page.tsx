import { createServerClient } from "@/pocketbase/clients/server";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default async function page() {
    const pb = await createServerClient();

    return (
        <div className="w-full h-full flex items-center justify-center">
            <form className="bg-white text-black flex flex-col gap-1 p-12">
                <div>Email:</div>
                <input name="email" className="border"></input>
                <div>Password:</div>
                <input name="password" className="border"></input>
                <button className="border cursor-pointer">Sign in</button>
            </form>
        </div>
    )
}