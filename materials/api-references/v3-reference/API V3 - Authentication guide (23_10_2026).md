# **API V3 Authentication**

> Source: "Plytix API V3 _ Authentication guide", shared by Plytix, received 2026-10-23. Transcribed as received; the header logo image was dropped.

## Access tokens and permissions

**API V3 is currently in beta.** Contact your Account Manager if you would like access to the API V3 beta. Once the beta is enabled for your account, the API v3 tab becomes available in your account settings.

API V3 uses access tokens to authenticate requests. Create a token in your Plytix account, choose its permissions and expiration date, and send it in the Authorization header of every request.

Access tokens are personal to the user who creates them. A token can never grant more access than that user's role allows.

API V3 access tokens work only with API V3. API V1/V2 continue to use their existing API key and password authentication flow.

# Create an access token

1. Open your account settings and select the API v3 tab.
2. Select Create access token.
3. Enter a token name that helps you identify its purpose, such as ERP product sync. You can also add an optional description.
4. Choose an expiration date. The available options are 7 days, 1 month, 1 year, or Custom.
5. Choose the token's permissions.
6. Select Create token.
7. Copy the token and store it securely. Confirm that you have saved it before closing the confirmation window.

**You can view and copy the token's value only when it is created or rotated.** You cannot retrieve it later. If you lose it, rotate the token to generate a new value.

## Choose permissions

You can use a preset or configure permissions for each resource.

| Option | Access granted |
| :---- | :---- |
| Full access | The maximum access your user role allows for each resource. |
| Read-only | Read access to the resources your user role allows you to read. |
| Custom | Select None, Read, or Write for each resource, within the limits of your user role. |

Permissions are available for Products, Assets, Product categories, Asset categories, Attributes, Product families, and Relationships.

* **None:** The token cannot access the resource.
* **Read:** The token can retrieve data from the resource.
* **Write:** The token can read, create, update, and delete data for the resource.

For example, an integration that only retrieves product information needs Read access to Products. An integration that creates or updates products needs Write access to Products.

Grant only the permissions your integration needs. To change a token's permissions after creation, create a new token with the required permissions.

# Send the token

Send the access token directly to the PIM API V3 in the Authorization header of every request, with a space after Bearer:

`Authorization: Bearer YOUR_ACCESS_TOKEN`

`Accept: application/json`

For requests with a JSON body, also include:

`Content-Type: application/json`

For example, to retrieve products:

```
curl --request GET \
  --url 'https://pim.plytix.com/api/v3/products' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  --header 'Accept: application/json'
```

Replace YOUR_ACCESS_TOKEN with the token generated in your account.

No separate token-generation request or API key and password exchange is required. Use the token directly until its configured expiration date, unless it is rotated or revoked earlier.

# Manage access tokens

Open the API v3 tab to review your tokens, their permissions, expiration dates, and status. You can filter the list to show Active, Expired, or Revoked tokens.

## Rotate a token

Rotate a token when you need to replace its secret, for example if you have lost it or suspect it has been exposed.

1. Find the token and select Rotate.
2. Confirm the rotation.
3. Copy and securely store the new token value.
4. Update every integration that uses the previous value.

**Rotation invalidates the previous token value immediately.** Requests using the previous value will no longer authenticate. Coordinate the rotation with your integration update to avoid interruptions.

Rotation preserves the token's name, permissions, and expiration date. It does not extend its lifetime.

## Revoke a token

Revoke a token when an integration no longer needs access or when you need to stop its access immediately.

1. Find the token and select Revoke.
2. Enter the token's name when prompted.
3. Confirm the revocation.

**Revocation takes effect immediately and cannot be undone.** To restore access, create a new token and update your integration.

## Handle expiration

A token stops authenticating requests when it expires. Create a replacement token and update your integration before the expiration date to avoid interruptions.

# Troubleshoot authentication

| Status code | What to check |
| :---- | :---- |
| 401 Unauthorized | Check that the token is present, copied correctly, and sent with the Bearer prefix. Make sure it has not expired, been revoked, or been replaced through rotation. |
| 403 Forbidden | Check that the token has the permissions required for the operation and that your user role allows that access. |

If the API V3 tab is missing, contact your Account Manager to check whether API V3 beta access is enabled for your account.

# Keep your token secure

Treat an access token like a password. Store it in a secret manager or a protected environment variable, and keep it out of source code, public repositories, and logs.

Use a separate token for each integration so you can manage its permissions and revoke its access independently.
