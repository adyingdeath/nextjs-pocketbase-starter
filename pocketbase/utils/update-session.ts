import { NextResponse, type NextRequest } from 'next/server'
import PocketBase from 'pocketbase'
import { COOKIES_NAME } from '../constants'
import { createServerClient } from '../clients/server'

export async function updateSession(request: NextRequest) {
    // Create a new response object that we can modify
    const pbResponse = NextResponse.next({
        request,
    })

    // Create PocketBase client - similar to Supabase's createServerClient with custom cookies
    const pb = await createServerClient();

    // IMPORTANT: DO NOT REMOVE authRefresh()
    // This mimics supabase.auth.getUser() - it's our server-side auth validation
    try {
        await pb.collection('users').authRefresh()

        // If auth refresh succeeded, update the cookie with the fresh token
        const freshAuthCookie = pb.authStore.exportToCookie()
        pbResponse.cookies.set(COOKIES_NAME, freshAuthCookie, {
            path: '/',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

    } catch (error) {
        console.warn('Auth refresh failed:', error)
        // If auth refresh fails, clear the cookie and auth store
        pb.authStore.clear()
        pbResponse.cookies.delete(COOKIES_NAME)

        return pbResponse
    }

    // Now check the user state after potential refresh
    const currentUser = pb.authStore.record

    if (
        !currentUser &&
        !request.nextUrl.pathname.startsWith('/sign-in') &&
        !request.nextUrl.pathname.startsWith('/sign-up') &&
        !request.nextUrl.pathname.startsWith('/api/auth')
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone()
        url.pathname = '/sign-in'
        return NextResponse.redirect(url)
    }

    // IMPORTANT: You *must* return the pbResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(pbResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return pbResponse
}
