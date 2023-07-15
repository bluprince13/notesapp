import { StackContext } from 'sst/constructs';
import { Cognito } from 'sst/constructs';
import { REGION } from '../constants';

export function AuthNStack({ stack }: StackContext) {
	// https://sst.dev/examples/how-to-add-cognito-authentication-to-a-serverless-api.html
	// Create auth provider
	const auth = new Cognito(stack, 'Auth', {
		login: ['email'],
		cdk: {
			userPool: {
				deletionProtection: false
			},
			// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.UserPoolClientOptions.html
			userPoolClient: {
				generateSecret: true,
				oAuth: {
					flows: {
						authorizationCodeGrant: true
					},
					callbackUrls: ['http://localhost:5173/auth/callback/cognito'],
					logoutUrls: ['http://localhost:5173/signout']
				}
			}
		}
	});
	// Add a Cognito Domain for use in the app
	// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.UserPool.html#addwbrdomainid-options
	const userPool = auth.cdk.userPool;
	userPool.addDomain('CognitoDomain', {
		cognitoDomain: {
			domainPrefix: process.env.COGNITO_DOMAIN_PREFIX!
		}
	});
	const cognitoDomain = `https://${process.env.COGNITO_DOMAIN_PREFIX}.auth.${REGION}.amazoncognito.com`;

	stack.addOutputs({
		UserPoolId: auth.userPoolId,
		UserPoolClientId: auth.userPoolClientId,
		UserPoolClientSecret: auth.cdk.userPoolClient.userPoolClientSecret.toString(),
		CognitoDomain: cognitoDomain
	});

	return {
		auth,
		cognitoDomain
	};
}
