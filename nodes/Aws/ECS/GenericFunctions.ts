import {
	type IExecuteFunctions,
	type IHookFunctions,
	type ILoadOptionsFunctions,
	type IWebhookFunctions,
	type IHttpRequestOptions,
	type IHttpRequestMethods,
	ApplicationError,
} from 'n8n-workflow';
import { IRequestBody } from './types';

export async function awsApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	service: string,
	method: IHttpRequestMethods,
	path: string,
	body?: object | IRequestBody,
	headers?: object,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const credentials = await this.getCredentials('aws');
	const requestOptions = {
		qs: {
			service,
			path,
		},
		method,
		body: JSON.stringify(body),
		url: '',
		headers,
		region: credentials?.region as string,
	} as IHttpRequestOptions;

	try {
		return JSON.parse(
			(await this.helpers.requestWithAuthentication.call(this, 'aws', requestOptions)) as string,
		);
	} catch (error) {
		const statusCode = (error.statusCode || error.cause?.statusCode) as number;
		let errorMessage =
			error.response?.body?.message || error.response?.body?.Message || error.message;

		if (statusCode === 403) {
			if (errorMessage === 'The security token included in the request is invalid.') {
				throw new ApplicationError('The AWS credentials are not valid!', { level: 'warning' });
			} else if (
				errorMessage.startsWith(
					'The request signature we calculated does not match the signature you provided',
				)
			) {
				throw new ApplicationError('The AWS credentials are not valid!', { level: 'warning' });
			}
		}

		if (error.cause?.error) {
			try {
				errorMessage = JSON.parse(error.cause?.error).message;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (ex) {
				// Ignore the error
			}
		}

		throw new ApplicationError(`AWS error response [${statusCode}]: ${errorMessage}`, {
			level: 'warning',
		});
	}
}
