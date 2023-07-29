import type { SSTConfig } from 'sst';
import { AuthNStack } from './infrastructure/stacks/authn';
import { SiteStack } from './infrastructure/stacks/app';
import { REGION } from './infrastructure/constants';
import { StorageStack } from './infrastructure/stacks/storage';
import { AuthZStack } from './infrastructure/stacks/authz/authz';

export default {
	config(_input) {
		return {
			name: 'notesapp',
			region: REGION
		};
	},
	stacks(app) {
		if (process.env.AWS_ACCOUNT_ID && app.account !== process.env.AWS_ACCOUNT_ID) {
			throw new Error(
				`AWS_ACCOUNT_ID set in env was ${process.env.AWS_ACCOUNT_ID} but AWS cli is using ${app.account}`
			);
		}
		if (app.stage !== 'prod') {
			app.setDefaultRemovalPolicy('destroy');
		}

		app.stack(AuthNStack).stack(AuthZStack).stack(StorageStack).stack(SiteStack);
	}
} satisfies SSTConfig;
