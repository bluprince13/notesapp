import {
	VerifiedPermissionsClient,
	CreatePolicyCommand,
	type CreatePolicyCommandInput,
	type IsAuthorizedWithTokenCommandInput,
	IsAuthorizedWithTokenCommand,
	Decision
} from '@aws-sdk/client-verifiedpermissions';
import {
	VERIFIED_PERMISSIONS_POLICY_STORE_ID,
	VERIFIED_PERMISSIONS_NOTE_EDITOR_TEMPLATE_ID,
	COGNITO_USER_POOL_ID
} from '$env/static/private';

const verifiedPermissionsClient = new VerifiedPermissionsClient({});

interface CreateEditorPolicyInput {
	noteId?: string;
	userId?: string;
}

interface IsAuthorizedWithTokenInput {
	noteId?: string;
	access_token?: string;
}

const ENTITY_USER = 'NotesApp::User';
const ENTITY_NOTE = 'NotesApp::Note';

// https://docs.aws.amazon.com/verifiedpermissions/latest/apireference/API_CreatePolicy.html
export const createEditorPolicy = async (data: CreateEditorPolicyInput) => {
	const input = {
		clientToken: data.noteId,
		policyStoreId: VERIFIED_PERMISSIONS_POLICY_STORE_ID,
		definition: {
			templateLinked: {
				policyTemplateId: VERIFIED_PERMISSIONS_NOTE_EDITOR_TEMPLATE_ID,
				principal: {
					entityType: ENTITY_USER,
					// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-authorization-with-avp.html
					entityId: `${COGNITO_USER_POOL_ID}|${data.userId}`
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
};

// https://docs.aws.amazon.com/verifiedpermissions/latest/apireference/API_IsAuthorizedWithToken.html
export const isAuthorizedWithToken = async (data: IsAuthorizedWithTokenInput) => {
	const input = {
		policyStoreId: VERIFIED_PERMISSIONS_POLICY_STORE_ID,
		resource: {
			entityType: ENTITY_NOTE,
			entityId: data.noteId
		},
		action: {
			actionId: 'ReadNote',
			actionType: 'NotesApp::Action'
		},
		accessToken: data.access_token
	} as IsAuthorizedWithTokenCommandInput;
	const command = new IsAuthorizedWithTokenCommand(input);
	const result = await verifiedPermissionsClient.send(command);
	return result.decision === Decision.ALLOW;
};
