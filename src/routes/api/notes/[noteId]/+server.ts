import { del } from '$lib/functions/notes';
import { json } from '@sveltejs/kit';

// https://learn.svelte.dev/tutorial/post-handlers
/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	await del({ noteId: params.noteId });
	return json({}, { status: 201 });
}
