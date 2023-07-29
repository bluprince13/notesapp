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

![](https://github.com/bluprince13/amazon-verified-permissions-demo/blob/main/static/demo.gif?raw=true)

## Deploy to your AWS account

### Pre-requisites

You need to have an AWS account and [AWS credentials configured
locally](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file).

```bash
export AWS_PROFILE=myawsprofile
```

### Instructions

1. Prepare the repo

   ```bash
   # clone this repo
   git clone https://github.com/bluprince13/amazon-verified-permissions-demo.git
   cd amazon-verified-permissions-demo

   # install dependencies
   npm install

   # copy the outputs from the following command
   npx sst dev
   ```

2. Create a `.env.local` file

   ```env
   PUBLIC_COGNITO_DOMAIN_PREFIX: <FILL WITH SOME PREFIX>-verified-permissions-demo
   AWS_ACCOUNT_ID: <FILL WITH YOUR AWS_ACCOUNT_ID>
   ```

   - Fill `PUBLIC_COGNITO_DOMAIN_PREFIX` with your name. This will be used by Cognito to
     create a domain and this domain needs to be unique.
   - Fill `AWS_ACCOUNT_ID` of the account you plan to deploy to. This is used to
     make sure that you don't accidentally deploy this to another AWS account.

3. Finally start the dev server

   ```bash
   npm run dev
   ```

### Destroy

```bash
npx sst remove
```
