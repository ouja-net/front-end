
import { env } from "$env/dynamic/public";
const API = env.PUBLIC_API_URL;

import MagicCrypt from 'magiccrypt'
import { SECRET_KEY } from '$env/static/private'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  let csrf = new MagicCrypt(SECRET_KEY, 256).encrypt(Math.random().toString(28).substring(4))


  let cookie = cookies.get("session");
  if (cookie) {
    try {
      let auth = await (await fetch(API + "/account/@me", { headers: { "x-session": cookie } })).json();
      if (auth) {
        auth.account.date = parseInt(auth.account.date["$date"]["$numberLong"])
      }
      return { user: auth ? auth.account : null, csrf };
    } catch (e) {
      console.error(e);
      cookies.delete("session");
      throw e;
    }
  } else {
    return { user: null, csrf }
  }
}