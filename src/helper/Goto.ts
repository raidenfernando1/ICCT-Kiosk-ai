import { push } from "svelte-spa-router";
import { supabaseLogout } from "../../src/store/Supabase";

export function navigateTo(route: string): void {
  push(route);
}

export async function logout(route: string): Promise<void> {
  await supabaseLogout();
  push(route);
}
