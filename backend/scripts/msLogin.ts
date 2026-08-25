// scripts/msLogin.ts
//
// Run this ONCE (npm run ms-login) to authorize this app to access your
// own OneDrive. It prints a code and a URL — open the URL in any browser,
// sign in with your Microsoft account, enter the code, and approve.
//
// After that, a token cache file is saved to disk (see MS_TOKEN_CACHE_PATH)
// and the backend can silently refresh access on its own from then on.
// No admin, no client secret, no further logins needed.
import { msalApp, SCOPES } from "../src/config/msGraph.js";

async function main() {
  const result = await msalApp.acquireTokenByDeviceCode({
    scopes: SCOPES,
    deviceCodeCallback: (response) => {
      console.log("\n" + response.message + "\n");
    },
  });

  if (!result?.accessToken) {
    console.error("Login failed — no access token returned.");
    process.exit(1);
  }

  console.log(`Signed in as ${result.account?.username}. OneDrive sync is now authorized.`);
  console.log("You can start the backend normally now — no need to run this again.");
}

main().catch((err) => {
  console.error("ms-login failed:", err);
  process.exit(1);
});
