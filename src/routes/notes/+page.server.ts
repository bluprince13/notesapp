import { list } from '$lib/functions/notes';

export async function load() {
	const result = await list({});
	return {
		notes: result.body
	};
}
