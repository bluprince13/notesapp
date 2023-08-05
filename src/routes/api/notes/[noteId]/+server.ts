import { del, update } from '$lib/clients/db';
import { json } from '@sveltejs/kit';

// https://learn.svelte.dev/tutorial/post-handlers
export async function DELETE({ params }) {
	// TODO: Verify user isAuthorized and delete the policy afterwards
	// https://github.com/bluprince13/notesapp/issues/1
	await del({ noteId: params.noteId });
	return json({}, { status: 201 });
}

export async function PUT({ params, request }) {
	// TODO: Verify user isAuthorized
	// https://github.com/bluprince13/notesapp/issues/1
	const { content } = await request.json();
	const result = await update({ noteId: params.noteId, content });
	return json(result, { status: 201 });
}
