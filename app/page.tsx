import { getUser, logout } from "@/pocketbase/utils/server-auth";
import { Metadata } from "next";
import Client from "./client";

export const metadata: Metadata = {
  title: "Home"
}

export default async function Home() {
  const user = await getUser();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col">
        <div className="text-center font-bold">a server-side example</div>
        {
          user ? (
            <form action={logout}>
              <div>Now, you're logged in as</div>
              {user.name}
              <button className="border cursor-pointer">Log out</button>
            </form>
          ) : (
            <div>
              <div>You're logged out</div>
              <div className="grid grid-cols-2 gap-4">
                <a href="/sign-in" className="border cursor-pointer p-1 my-1">Sign in</a>
                <a href="/sign-up" className="border cursor-pointer p-1 my-1">Sign up</a>
              </div>
            </div>
          )
        }
        <div className="w-full border-b border-white"></div>
        <div className="text-center font-bold">a client-side example</div>
        <Client></Client>
      </div>

    </div>
  )
}
