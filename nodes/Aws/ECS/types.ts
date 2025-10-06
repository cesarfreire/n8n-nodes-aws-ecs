export interface IRequestBody {
	[key: string]: string | IAttributeValue | undefined | boolean | object | number;
	TableName: string;
	Key?: object;
	IndexName?: string;
	ProjectionExpression?: string;
	KeyConditionExpression?: string;
	ExpressionAttributeValues?: IAttributeValue;
	ConsistentRead?: boolean;
	FilterExpression?: string;
	Limit?: number;
	ExclusiveStartKey?: IAttributeValue;
}

export interface IAttributeValue {
	[attribute: string]: IAttributeValueValue;
}

export interface IAttributeValueValue {
	[type: string]: string | string[] | IAttributeValue[];
}
