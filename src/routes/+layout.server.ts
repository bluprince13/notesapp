// https://authjs.dev/reference/sveltekit
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	if (!session && url.pathname != '/') {
		throw redirect(307, '/');
	}
	return {
		session
	};
};
