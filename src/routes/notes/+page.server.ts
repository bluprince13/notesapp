import { list, type Note } from '$lib/clients/db';
import { isAuthorizedWithToken } from '$lib/clients/verifiedPermissions';

export async function load({ locals }) {
	const session = await locals.getSession();
	const allNotes = (await list({})).body as Note[];

	// As if 20230-7-29, there isn't a way to get a list of resources that a
	// user is authorized to perform an action on from Amazon Verified
	// Permissions. Therefore, we make a call to the isAuthorizedWithToken API
	// for each resource.
	const isAuthorizedArray = await Promise.all(
		allNotes.map((note) =>
			isAuthorizedWithToken({
				noteId: note.noteId,
				access_token: session?.access_token
			})
		)
	);
	const allowedNotes = allNotes.filter((_, index) => isAuthorizedArray[index]);
	return {
		notes: allowedNotes
	};
}
