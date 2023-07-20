import { list } from '$lib/clients/db';

export async function load() {
	const result = await list({});
	return {
		notes: result.body
	};
}
