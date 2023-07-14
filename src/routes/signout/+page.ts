import { browser } from '$app/environment';
import { signOut } from '@auth/sveltekit/client';
export function load() {
	if (browser) {
		// https://next-auth.js.org/getting-started/client#signout
		signOut({ callbackUrl: window.location.origin });
	}
}
