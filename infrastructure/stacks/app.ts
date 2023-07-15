import { StackContext, use } from 'sst/constructs';
import { SvelteKitSite } from 'sst/constructs';
import { AuthNStack } from './authn';
import crypto from 'crypto';

export function SiteStack({ stack }: StackContext) {
	const { auth, cognitoDomain } = use(AuthNStack);
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
		url: site.url
	});
}
