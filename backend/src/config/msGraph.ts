// src/config/msGraph.ts
import { PublicClientApplication, type AccountInfo } from "@azure/msal-node";
import { readFile, writeFile } from "node:fs/promises";
import { ENV } from "./env.js";

// Delegated auth acting as YOU, not the whole tenant — this is what lets you
// self-consent (no admin needed) and only ever touches your own OneDrive.
// The one-time interactive step happens in scripts/msLogin.ts; this module
// just reads the token cache it produces and silently refreshes from there.
const msalApp = new PublicClientApplication({
  auth: {
    clientId: ENV.MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${ENV.MS_TENANT_ID}`,
  },
  cache: {
    cachePlugin: {
      beforeCacheAccess: async (ctx) => {
        try {
          const data = await readFile(ENV.MS_TOKEN_CACHE_PATH, "utf-8");
          ctx.tokenCache.deserialize(data);
        } catch {
          // No cache yet — fine on first run before scripts/msLogin.ts is used.
        }
      },
      afterCacheAccess: async (ctx) => {
        if (ctx.cacheHasChanged) {
          await writeFile(ENV.MS_TOKEN_CACHE_PATH, ctx.tokenCache.serialize());
        }
      },
    },
  },
});

const SCOPES = ["Files.ReadWrite", "User.Read"];

async function getAccount(): Promise<AccountInfo> {
  const accounts = await msalApp.getTokenCache().getAllAccounts();
  const account = accounts[0];
  if (!account) {
    throw new Error(
      "No signed-in Microsoft account found. Run `npm run ms-login` once to authorize OneDrive access."
    );
  }
  return account;
}

export async function getGraphToken(): Promise<string> {
  const account = await getAccount();

  const result = await msalApp.acquireTokenSilent({
    account,
    scopes: SCOPES,
  });

  if (!result?.accessToken) {
    throw new Error(
      "Failed to silently refresh Microsoft Graph token. Run `npm run ms-login` again to re-authorize."
    );
  }

  return result.accessToken;
}

export { msalApp, SCOPES };
