import { Table } from 'sst/constructs';

// https://sst.dev/chapters/create-a-dynamodb-table-in-sst.html
export function StorageStack({ stack }) {
	const table = new Table(stack, 'Notes', {
		fields: {
			noteId: 'string'
		},
		primaryIndex: { partitionKey: 'noteId' }
	});

	return {
		table
	};
}
