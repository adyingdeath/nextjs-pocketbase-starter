## What you should do before starting

### In the PocketBase Superuser Console

<details>
<summary>Configure Application Name and URL</summary>

Go to `Settings` > `Application`, set your `Application name` and `Application URL`.

The `Application URL` should be your Next.js URL, like `http://localhost:3000` for local development.

</details>

<details>
<summary>Update Verification Email Template with Redirect URL</summary>

Go to `Collections` > `users`, click the `Edit collection` button.

Then, `Options` > `Default Verification email template`.

Replace the URL with `{APP_URL}/api/auth/confirm-verification?token={TOKEN}`.

This enables the email link to redirect to your custom verification logic.

</details>

<details>
<summary>Configure SMTP Mail Server for Email Sending</summary>

You should configure an SMTP mail server so that PocketBase can send emails. Although it can send emails without SMTP, it uses the `sendmail` command to do so, which might fail on some systems like Windows.

> Depending on your configured mail settings (`Dashboard` > `Settings` > `Mail settings`) it will use the `sendmail` command or a SMTP client. (from PocketBase docs)

Go to `Settings` > `Mail settings`, toggle `Use SMTP mail server`, and fill in the necessary information.

After saving changes, click `Send test email`. Remember to select `OTP` instead of the default `Verification` because it will fail to send the verification email if there's no user with that email in the database. (You've just set up PocketBase, so the database is empty.)

If you can receive the email, everything is set up correctly. You can start developing.

</details>

## Some Helpful Info

### getUser()

I've implemented a `getUser()` function in `@/pocketbase/utils/server-auth.ts`, which you can use directly in Server Components. If the user is logged in, the function will return a `Promise<UserInfo>`; otherwise, it will return `Promise<null>`. You can check its usage in the `/` page.

There is also a client-side version `getUser()` in `@/pocketbase/utils/client-auth.ts`. There is a simple example in `@/app/client.tsx`.