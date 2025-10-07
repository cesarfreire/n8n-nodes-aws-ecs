import {
	type IExecuteFunctions,
	type IHookFunctions,
	type ILoadOptionsFunctions,
	type IWebhookFunctions,
	type IHttpRequestOptions,
	type IHttpRequestMethods,
	ApplicationError,
	IDataObject,
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
		const responseData: IDataObject = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'aws',
			requestOptions,
		)) as IDataObject;
		return responseData;
	} catch (error) {
		throw new ApplicationError(`AWS error response [${JSON.stringify(error)}]`, {
			level: 'warning',
		});
	}
}
