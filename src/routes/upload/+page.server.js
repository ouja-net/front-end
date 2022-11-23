import { redirect } from "@sveltejs/kit"
import { authenticate } from "../../$lib/server/authenticate"

export async function load({ cookies }) {
  if (await authenticate(cookies.get('session')) == false) throw redirect(307, '/login');
}