
import { env } from "$env/dynamic/public";
const API = env.PUBLIC_API_URL;

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  let cookie = cookies.get("session");
  if (cookie) {
    try {
      let auth = await (await fetch(API + "/account/@me", { headers: { "x-session": cookie } })).json();
      if (auth) {
        auth.account.date = parseInt(auth.account.date["$date"]["$numberLong"])
      }
      return { user: auth ? auth.account : null };
    } catch (e) {
      console.log(e);
      cookies.delete("session");
      throw e;
    }
  } else {
    return { user: null }
  }
}