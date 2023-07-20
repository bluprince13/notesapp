import { del, update } from '$lib/clients/db';
import { json } from '@sveltejs/kit';

// https://learn.svelte.dev/tutorial/post-handlers
/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	await del({ noteId: params.noteId });
	return json({}, { status: 201 });
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, request }) {
	const { content } = await request.json();
	await update({ noteId: params.noteId, content });
	return json({}, { status: 201 });
}
