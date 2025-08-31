import { getUser, logout } from "@/pocketbase/actions/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home"
}

export default async function Home() {
  const user = await getUser();

  return (
    <div className="w-full h-full flex items-center justify-center">
      {
        user ? (
          <form action={logout}>
            <div>Now, you're logged in as</div>
            {user.name}
            <button className="border cursor-pointer">Log out</button>
          </form>
        ) : (
          <>
            <div>You're logged out</div>
            <a href="/sign-in" className="border cursor-pointer">Sign in</a>
          </>
        )
      }
    </div>
  )
}
