import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	// if user is signed in, redirect them from homepage to /notes
	const session = await locals.getSession();
	if (session != null) {
		throw redirect(307, '/notes');
	}
}
