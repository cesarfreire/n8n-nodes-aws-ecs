# n8n-nodes-aws-ecs

This is an n8n community node. It lets you use AWS ECS (Elastic Container Service) in your n8n workflows.

Elastic Container Service is a fully managed service by Amazon Web Services (AWS) that allows you to deploy, manage, and scale containerized applications. It automates container orchestration at large scale, offering flexibility to choose between serverless infrastructure with AWS Fargate or EC2 instance management, while also deeply integrating with other AWS services for security and efficient operation..

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Force new deployment: Forces a new deployment of a service. Existing tasks will be stopped and new tasks will be started with the latest task definition.

For now, only the "Force new deployment" operation is supported. More operations will be added in the future.

## Credentials

Default AWS Credentials.

## Compatibility

Tested with 1.114.3 N8N version.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Amazon Elastic Container Service documentation](https://aws.amazon.com/pt/ecs/)

## Version history

1.0.0 - Add support to force new deployment.
