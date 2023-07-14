import type { SSTConfig } from 'sst';
import { Cognito, SvelteKitSite } from 'sst/constructs';
import crypto from 'crypto';

const REGION = 'us-east-1';
const deletionProtection = false;

export default {
	config(_input) {
		return {
			name: 'vipin-verified-permissions-demo',
			region: REGION
		};
	},
	stacks(app) {
		if (app.account !== process.env.AWS_ACCOUNT_ID) {
			throw new Error(
				`AWS_ACCOUNT_ID set in env was ${process.env.AWS_ACCOUNT_ID} but AWS cli is using ${app.account}`
			);
		}
		app.stack(function Site({ stack }) {
			if (app.stage !== 'prod') {
				app.setDefaultRemovalPolicy('destroy');
			}
			// https://sst.dev/examples/how-to-add-cognito-authentication-to-a-serverless-api.html
			// Create auth provider
			const auth = new Cognito(stack, 'Auth', {
				login: ['email'],
				cdk: {
					userPool: {
						deletionProtection
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

			const site = new SvelteKitSite(stack, 'site', {
				environment: {
					COGNITO_USER_POOL_ID: auth.userPoolId,
					PUBLIC_COGNITO_CLIENT_ID: auth.userPoolClientId,
					COGNITO_CLIENT_SECRET: auth.cdk.userPoolClient.userPoolClientSecret.toString(),
					PUBLIC_COGNITO_DOMAIN: cognitoDomain,
					// https://authjs.dev/reference/core/errors/#missingsecret
					AUTH_SECRET: crypto.randomBytes(32).toString('hex')
				}
			});
			stack.addOutputs({
				url: site.url,
				UserPoolId: auth.userPoolId,
				UserPoolClientId: auth.userPoolClientId,
				UserPoolClientSecret: auth.cdk.userPoolClient.userPoolClientSecret.toString(),
				CognitoDomain: cognitoDomain
			});
		});
	}
} satisfies SSTConfig;
