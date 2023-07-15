import type { SSTConfig } from 'sst';
import { AuthNStack } from './infrastructure/stacks/authn';
import { SiteStack } from './infrastructure/stacks/app';
import { REGION } from './infrastructure/constants';

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
		if (app.stage !== 'prod') {
			app.setDefaultRemovalPolicy('destroy');
		}
		
		app.stack(AuthNStack).stack(SiteStack);
	}
} satisfies SSTConfig;
