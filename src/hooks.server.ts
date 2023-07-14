import { SvelteKitAuth } from '@auth/sveltekit';
import Cognito from '@auth/core/providers/cognito';
import {
	AUTH_SECRET,
	COGNITO_CLIENT_ID,
	COGNITO_USER_POOL_ID,
	COGNITO_CLIENT_SECRET
} from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

// https://authjs.dev/reference/sveltekit
export const handle = SvelteKitAuth({
	secret: AUTH_SECRET,
	providers: [
		// https://authjs.dev/reference/core/providers_cognito
		Cognito({
			clientId: COGNITO_CLIENT_ID,
			clientSecret: COGNITO_CLIENT_SECRET,
			issuer: `https://cognito-idp.us-east-1.amazonaws.com/${COGNITO_USER_POOL_ID}`
		})
	]
}) satisfies Handle;
