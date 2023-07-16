import * as uuid from 'uuid';
import { Table } from 'sst/node/table';
import {
	DeleteCommand,
	type DeleteCommandInput,
	DynamoDBDocumentClient,
	GetCommand,
	type GetCommandInput,
	PutCommand,
	type PutCommandInput,
	ScanCommand,
	type ScanCommandInput,
	UpdateCommand,
	type UpdateCommandInput
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});
// The DynamoDB document client simplifies working with items by abstracting the notion of attribute values.
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-dynamodb/Class/DynamoDBDocumentClient/
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html
const docClient = DynamoDBDocumentClient.from(client);
const tableName = Table.Notes.tableName;

interface Event {
	body?: string;
	pathParameters?: { id: string };
}

// generic handler to wrap around lambda functions
export default function handler(lambda) {
	return async function (event: Event) {
		let body, statusCode;
		try {
			body = await lambda(event);
			statusCode = 200;
		} catch (e) {
			console.error(e);
			body = { error: e.message };
			statusCode = 500;
		}
		return {
			statusCode,
			body
		};
	};
}

export const create = handler(async (event: Event) => {
	const data = JSON.parse(event.body!);
	const input = {
		TableName: tableName,
		Item: {
			noteId: uuid.v1(),
			content: data.content,
			createdAt: Date.now()
		}
	} as PutCommandInput;

	const command = new PutCommand(input);
	await docClient.send(command);
	return input.Item;
});

export const get = handler(async (event: Event) => {
	const input = {
		TableName: tableName,
		Key: {
			noteId: event.pathParameters?.id
		}
	} as GetCommandInput;

	const command = new GetCommand(input);
	const result = await docClient.send(command);
	return result.Item;
});

export const list = handler(async (_event: Event) => {
	const input = {
		TableName: tableName
	} as ScanCommandInput;

	const command = new ScanCommand(input);
	const result = await docClient.send(command);
	return result.Items;
});

export const update = handler(async (event: Event) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const data = JSON.parse(event.body!);
	const input = {
		TableName: tableName,
		Key: {
			noteId: event.pathParameters?.id
		},
		UpdateExpression: 'set content = :content, updatedAt = :updatedAt',
		ExpressionAttributeValues: {
			':content': data.content,
			':updatedAt': Date.now()
		}
	} as UpdateCommandInput;

	const command = new UpdateCommand(input);
	const result = await docClient.send(command);
	return result.Attributes;
});

export const del = handler(async (event: Event) => {
	const input = {
		TableName: tableName,
		Key: {
			noteId: event.pathParameters?.id
		}
	} as DeleteCommandInput;

	const command = new DeleteCommand(input);
	await docClient.send(command);
	return {};
});
