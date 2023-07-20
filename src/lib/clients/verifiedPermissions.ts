import {
	VerifiedPermissionsClient,
	CreatePolicyCommand,
	type CreatePolicyCommandInput
} from '@aws-sdk/client-verifiedpermissions';
import {
	VERIFIED_PERMISSIONS_POLICY_STORE_ID,
	VERIFIED_PERMISSIONS_NOTE_EDITOR_TEMPLATE_ID
} from '$env/static/private';

const verifiedPermissionsClient = new VerifiedPermissionsClient({});

interface Data {
	noteId?: string;
	userId?: string;
}

const ENTITY_USER = 'NotesApp::User';
const ENTITY_NOTE = 'NotesApp::Note';

// generic handler to wrap around lambda functions
export default function handler(lambda) {
	return async function (data: Data) {
		let body, statusCode;
		try {
			body = await lambda(data);
			statusCode = 200;
		} catch (e) {
			console.error(e);
			body = { error: e.message };
			statusCode = 500;
		}
		return {
			statusCode,
			body
		};
	};
}

export const createEditorPolicy = handler(async (data: Data) => {
	const input = {
		clientToken: data.noteId,
		policyStoreId: VERIFIED_PERMISSIONS_POLICY_STORE_ID,
		definition: {
			templateLinked: {
				policyTemplateId: VERIFIED_PERMISSIONS_NOTE_EDITOR_TEMPLATE_ID,
				principal: {
					entityType: ENTITY_USER,
					entityId: data.userId
				},
				resource: {
					entityType: ENTITY_NOTE,
					entityId: data.noteId
				}
			}
		}
	} as CreatePolicyCommandInput;

	const command = new CreatePolicyCommand(input);
	await verifiedPermissionsClient.send(command);
	return {};
});
