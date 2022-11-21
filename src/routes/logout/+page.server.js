import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {
  if (cookies.get('session')) cookies.delete("session");

  throw redirect(307, '/');
}