## What you should do before starting

### In pocketbase superuser console

#### Application info

Go to `Settings` > `Application`, set your `Application name` and `Application url`.

The `Application url` should be your next.js url, like `http://localhost:3000` for local development.

#### Verification emails

Go to `Collections` > `users`, click the `Edit collection` button.

Then, `Options` > `Default Verification email template`.

We should replace the url with `{APP_URL}/api/auth/confirm-verification?token={TOKEN}`.

This enables the link in the email to jump to our custom logic.