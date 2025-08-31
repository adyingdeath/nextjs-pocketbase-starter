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
              <a href="/sign-in" className="border cursor-pointer">Sign in</a>
            </div>
          )
        }
        <Client></Client>
      </div>

    </div>
  )
}
