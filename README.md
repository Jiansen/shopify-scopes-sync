[![npm monthly downloads](https://img.shields.io/npm/dm/shopify-scopes-sync.svg?style=flat)](https://www.npmjs.com/package/shopify-scopes-sync)
[![current version](https://img.shields.io/npm/v/shopify-scopes-sync.svg?style=flat)](https://www.npmjs.com/package/shopify-scopes-sync)
[![npm](https://img.shields.io/npm/l/shopify-scopes-sync.svg?maxAge=2592000)](https://www.npmjs.com/package/shopify-scopes-sync)


# Shopify Scopes Sync

The `shopify-scopes-sync` package ensures that the Shopify access scopes specified in your project's `shopify.app.toml` file are automatically synchronized with the `SCOPES` variable in your `.env` file. This synchronization helps maintain consistency in your development and deployment environments, reducing the risk of scope-related errors in your Shopify applications.

## Background: Authentication Works In Local Dev Mode But Not In Production (AWS EC2)

When deploying a Shopify Remix App from local testing to AWS EC2, authentication and billing APIs stopped working even though it ran fine on a local machine. If you encountered a similiar issue as descripbed at [Shopify Community](https://community.shopify.com/c/authentication-and-access/remix-authentication-works-in-local-dev-mode-but-not-in/td-p/2417145) and [Shopify Github](https://github.com/Shopify/shopify-app-template-remix/issues/529), the root cause might be the API access scopes are out of sync in the `.env` file (production deploy) and the `shopify.app.toml` (local test).  This problem led to creating a solution to sync scopes smoothly.

## Installation

To install `shopify-scopes-sync`, run the following command in your project directory:

```bash
npm install shopify-scopes-sync --save
```
or
```bash
yarn add shopify-scopes-sync -D -W
```

This command adds `shopify-scopes-sync` to your project's dependencies.

## Usage

After installing `shopify-scopes-sync`, you need to add a script to your `package.json` to run the synchronization process. Here's how to set it up:

1. Open your project's `package.json` file.
2. Add a new script named `predeploy` in the `scripts` section:
3. Update your `deploy` command to ensure that scope is synced.

```json
"scripts": {
  "predeploy": "shopify-scopes-sync",
  "deploy": "npm run predeploy && shopify app deploy",
}
```

3. Save the changes to your `package.json` file.

Now, you can run the following command to synchronize your Shopify access scopes:

```bash
npm run sync-scopes
```
or 
```bash
npm run deploy
```

This script executes `shopify-scopes-sync`, which reads the scopes from your `shopify.app.toml` and updates the `SCOPES` variable in your `.env` file accordingly.

### Custom Usage

If your `.env` or `shopify.app.toml` files are located in non-standard locations, you can pass the paths to these files as arguments to the script:

```json
"scripts": {
  "sync-scopes": "shopify-scopes-sync --env ./path/to/.env --toml ./path/to/shopify.app.toml"
}
```

Replace `./path/to/.env` and `./path/to/shopify.app.toml` with the actual paths to your files.

## Contributing

We welcome contributions to `shopify-scopes-sync`! If you have suggestions for improvements or encounter any issues, please open an issue or submit a pull request on our [GitHub repository](https://github.com/Jiansen/shopify-scopes-sync).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Jiansen/shopify-scopes-sync/blob/main/LICENSE) file for details.
