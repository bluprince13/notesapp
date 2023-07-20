import { create } from '$lib/clients/db';
import { createEditorPolicy } from '$lib/clients/verifiedPermissions';
import { json } from '@sveltejs/kit';

// https://learn.svelte.dev/tutorial/post-handlers
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { content } = await request.json();
	const session = await locals.getSession();

	const result = await create({ content });
	await createEditorPolicy({ noteId: result.body.noteId, userId: session?.user?.sub });

	return json(result, { status: 201 });
}
