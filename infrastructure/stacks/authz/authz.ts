import { StackContext, use } from 'sst/constructs';
import { aws_verifiedpermissions as verifiedpermissions } from 'aws-cdk-lib';
import { AuthNStack } from '../authn';
import fs from 'fs';

export function AuthZStack({ stack }: StackContext) {
	const { auth } = use(AuthNStack);

	// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_verifiedpermissions.CfnPolicyStore.html
	const cfnPolicyStore = new verifiedpermissions.CfnPolicyStore(this, 'MyCfnPolicyStore', {
		validationSettings: {
			mode: 'STRICT'
		},
		schema: {
			cedarJson: fs.readFileSync('infrastructure/stacks/authz/schema.json', 'utf8')
		}
	});

	// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_verifiedpermissions.CfnIdentitySource.html
	new verifiedpermissions.CfnIdentitySource(this, 'MyCfnIdentitySource', {
		configuration: {
			cognitoUserPoolConfiguration: {
				userPoolArn: auth.cdk.userPool.userPoolArn
			}
		},
		policyStoreId: cfnPolicyStore.attrPolicyStoreId
	});

	const noteReaderTemplate = new verifiedpermissions.CfnPolicyTemplate(this, 'NoteReaderTemplate', {
		statement: fs.readFileSync('infrastructure/stacks/authz/noteReaderTemplate.cedar', 'utf8'),
		description: 'Note reader template',
		policyStoreId: cfnPolicyStore.attrPolicyStoreId
	});

	const noteEditorTemplate = new verifiedpermissions.CfnPolicyTemplate(this, 'NoteEditorTemplate', {
		statement: fs.readFileSync('infrastructure/stacks/authz/noteEditorTemplate.cedar', 'utf8'),
		description: 'Note editor template',
		policyStoreId: cfnPolicyStore.attrPolicyStoreId
	});

	stack.addOutputs({
		VerifiedPermissionsPolicyStoreId: cfnPolicyStore.attrPolicyStoreId
	});

	return {
		authz: {
			policyStoreId: cfnPolicyStore.attrPolicyStoreId,
			noteReaderTemplateId: noteReaderTemplate.attrPolicyTemplateId,
			noteEditorTemplateId: noteEditorTemplate.attrPolicyTemplateId
		}
	};
}
