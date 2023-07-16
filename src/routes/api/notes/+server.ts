import { create } from '$lib/functions/notes';
import { json } from '@sveltejs/kit';

// https://learn.svelte.dev/tutorial/post-handlers
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { content } = await request.json();
	const result = await create({ content });
	return json(result, { status: 201 });
}
