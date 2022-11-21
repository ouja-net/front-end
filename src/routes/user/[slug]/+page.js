import { env } from "$env/dynamic/public";
const API = env.PUBLIC_API_URL;

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let account = await (await fetch(API + "/user/" + params.slug)).json();
  if (!account || account.success == false) throw error(404, "Not found");

  return { account: account.user };
}