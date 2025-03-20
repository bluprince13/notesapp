# notesapp

This is a full-stack app made with :heart: using some really cool technologies.
The purpose is to just learn/demo how these technologies may be used.

> **Warning**<br>
> There are some [production blocking issues](https://github.com/bluprince13/notesapp/labels/blocks_production)
> that I have not sorted out yet
> and I wouldn't choose some of the technologies below if I were making a production
> grade app today. However, I think they have a lot of potential.

Technologies used:

- Fullstack
  - [SvelteKit](https://kit.svelte.dev/) a UI framework
  - [Auth.js](https://authjs.dev/) authentication solution that integrates with various identity providers
- Front-end
  - [Skeleton](https://www.skeleton.dev/) which provides UI components
  - [tailwindcss](https://tailwindcss.com/) a CSS framework that provides
    classes for styling
- Infrastructure
  - [SST](https://sst.dev) to build full stack apps on AWS, a nice layer on top
    of [AWS Cloud Development Kit [CDK]](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)
  - [Amazon
    Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
    for authentication
  - [Amazon Verified
    Permissions](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html)
    for fine-grained permissions management and authorization

![](https://github.com/bluprince13/notesapp/blob/main/static/demo.gif?raw=true)

## Deploy to your AWS account

Note that deploying to AWS means that you might be charged for AWS resources.

### Pre-requisites

You need to have an AWS account and [AWS credentials configured
locally](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file).

```bash
export AWS_PROFILE=<FILL WITH YOUR AWS PROFILE>
```

### Instructions

1. Prepare the repo

   ```bash
   # clone this repo
   git clone https://github.com/bluprince13/notesapp.git
   cd notesapp

   # install dependencies
   npm install

   # deploy resources to AWS and start sst local dev environment
   npx sst dev
   ```

2. Create a `.env.local` file

   ```env
   COGNITO_DOMAIN_PREFIX: <FILL WITH SOME PREFIX>-notesapp
   AWS_ACCOUNT_ID: <FILL WITH YOUR AWS_ACCOUNT_ID>
   ```

   - Fill `COGNITO_DOMAIN_PREFIX` with your name. This will be used by Cognito to
     create a domain and this domain needs to be unique.
   - Fill `AWS_ACCOUNT_ID` of the account you plan to deploy to. This is used to
     make sure that you don't accidentally deploy this to another AWS account.

3. Finally start the dev server

   ```bash
   npm run dev
   ```

### Destroy

When you're finished, make sure to remove the stacks.

```bash
npx sst remove
```

## Infrastructure diagram

![](assets/../static/notesapp.drawio.svg)
