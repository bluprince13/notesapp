# amazon-verified-permissions-demo

This is a demo of [Amazon Verified
Permissions](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html)
for fine-grained permissions management and authorization.

Other technologies used:

- Front-end
  - [SvelteKit](https://kit.svelte.dev/) a UI framework
  - [Skeleton](https://www.skeleton.dev/) which provides UI components
- Infrastructure
  - [SST](https://sst.dev) to build full stack apps on AWS
  - [Amazon
    Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
    for Authentication

## Deploy to your AWS account

### Pre-requisites

You need to have an AWS account and [AWS credentials configured locally](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file).

```bash
# clone this repo
git clone https://github.com/bluprince13/amazon-verified-permissions-demo.git
cd amazon-verified-permissions-demo

# install dependencies
npm install

# deploy and visit the url that is printed out at the end of the deployment
npx sst deploy
```

## Local development

```bash
npx sst dev
```
