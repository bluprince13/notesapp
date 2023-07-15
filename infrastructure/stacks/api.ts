import { Api, use } from 'sst/constructs';
import { StorageStack } from './storage';
import { AuthNStack } from './authn';

// https://sst.dev/chapters/add-an-api-to-create-a-note.html
export function ApiStack({ stack }) {
	const { table } = use(StorageStack);
	const { auth } = use(AuthNStack);

	const api = new Api(stack, 'Api', {
		defaults: {
			authorizer: 'iam',
			function: {
				bind: [table]
			}
		},
		routes: {
			'POST /notes': 'infrastructure/functions/notes.create',
			'GET /notes/{id}': 'infrastructure/functions/notes.get',
			'GET /notes': 'infrastructure/functions/notes.list',
			'PUT /notes/{id}': 'infrastructure/functions/notes.update',
			'DELETE /notes/{id}': 'infrastructure/functions/notes.del'
		}
	});

	auth.attachPermissionsForAuthUsers(stack, [api]);

	stack.addOutputs({
		ApiEndpoint: api.url
	});

	return {
		api
	};
}
