import { env } from "$env/dynamic/public";
const API = env.PUBLIC_API_URL;

export async function authenticate(session) {
  try {
    let auth = await (await fetch(API + "/account/@me", { headers: { "x-session": session } })).json();
    if (auth.success == false) return false
    return true
  } catch (e) {
    return false
  }
}