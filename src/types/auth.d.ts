import type { DefaultSession } from '@auth/core/types';

declare module '@auth/core/types' {
	interface Session {
		id_token?: string;
		access_token?: string;
		user?: {
			sub?: string;
		} & DefaultSession['user'];
	}
}
