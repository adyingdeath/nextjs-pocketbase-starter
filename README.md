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

### Type Generation

This template uses the `pocketbase-typegen` lib to generate type definitions for your Pocketbase instance. You should configure two environment variables first. In `.env.example`, you will see two variables `PB_TYPEGEN_URL` and `PB_TYPEGEN_TOKEN`. You should copy `.env.example` and rename the copied file to `.env`.

- `PB_TYPEGEN_URL`: The address of your Pocketbase instance.
- `PB_TYPEGEN_TOKEN`: A superuser's `Impersonate auth token`. To get one, open your Pocketbase dashboard. In the system collection `_superusers`, you will find yourself there (because you're a superuser). Click on yourself. In the `Edit _superusers record` side panel, click the three-dot menu button on the top-right. There is an `Impersonate` option. Click on it and set a time. If you want an infinite token duration, you can use `2147483647` because this is the maximum integer value and the maximum number you can use for the duration. Click on `Generate token` and copy that generated token to your `.env` file.

After completing these steps, run `npm run typegen` in your terminal. You can check the generated types in `@/pocketbase/clients/pocketbase-types.ts`. **Every time you change your collections in pocketbase, you should run this command again to update your local types.**

### getUser()

I've implemented a `getUser()` function in `@/pocketbase/utils/server-auth.ts`, which you can use directly in Server Components. If the user is logged in, the function will return a `Promise<UserInfo>`; otherwise, it will return `Promise<null>`. You can check its usage in the `/` page.

There is also a client-side version `getUser()` in `@/pocketbase/utils/client-auth.ts`. There is a simple example in `@/app/client.tsx`.