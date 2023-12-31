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

import _ from 'lodash';

const dDBClient = new DynamoDBClient({});
// The DynamoDB document client simplifies working with items by abstracting the notion of attribute values.
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-dynamodb/Class/DynamoDBDocumentClient/
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html
const docClient = DynamoDBDocumentClient.from(dDBClient);
const tableName = Table.Notes.tableName;

interface Data {
	noteId?: string;
	content?: string;
}

export interface Note {
	noteId: string;
	content: string;
	createdAt: number;
	updatedAt?: number;
}

// generic handler to wrap around lambda functions
export default function handler(lambda) {
	return async function (data: Data) {
		let body, statusCode;
		try {
			body = await lambda(data);
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

export const create = handler(async (data: Data) => {
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

export const get = handler(async (data: Data) => {
	const input = {
		TableName: tableName,
		Key: {
			noteId: data.noteId
		}
	} as GetCommandInput;

	const command = new GetCommand(input);
	const result = await docClient.send(command);
	return result.Item;
});

export const list = handler(async (_data: Data) => {
	const input = {
		TableName: tableName
	} as ScanCommandInput;

	const command = new ScanCommand(input);
	const result = await docClient.send(command);
	return _.orderBy(result.Items, ['createdAt'], 'desc');
});

export const update = handler(async (data: Data) => {
	const input = {
		TableName: tableName,
		Key: {
			noteId: data.noteId
		},
		UpdateExpression: 'set content = :content, updatedAt = :updatedAt',
		ExpressionAttributeValues: {
			':content': data.content,
			':updatedAt': Date.now()
		},
		ReturnValues: 'ALL_NEW'
	} as UpdateCommandInput;

	const command = new UpdateCommand(input);
	const result = await docClient.send(command);
	return result.Attributes;
});

export const del = handler(async (data: Data) => {
	const input = {
		TableName: tableName,
		Key: {
			noteId: data.noteId
		}
	} as DeleteCommandInput;

	const command = new DeleteCommand(input);
	await docClient.send(command);
	return {};
});
