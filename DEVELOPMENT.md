# Development Authentication Setup

This guide explains how to use the development Cognito User Pool for local testing.

## Quick Start

1. **Ensure the development Cognito stage is deployed** (this happens automatically with the pipeline)

2. **Check your environment configuration**:
   ```bash
   npm run check-env
   ```

3. **Start the development server**:
   ```bash
   npm run dev:cognito
   ```

4. **Connect your Phantom wallet** and authenticate

## Environment Configuration

Your `.env.development.local` file should contain:

```bash
# Development Cognito Configuration
VITE_COGNITO_USER_POOL_ID=us-east-1_jCoKaijJx
VITE_COGNITO_CLIENT_ID=6kgu99l9cp95lbncu1ka2jvt31
VITE_COGNITO_REGION=us-east-1

# API Configuration
VITE_API_URL=http://localhost:3000
VITE_DISABLE_AUTH=false

# Development mode flags
VITE_DEV_MODE=true
```

## Available Scripts

- `npm run dev` - Start with default configuration
- `npm run dev:cognito` - Start with Cognito authentication (explicit)
- `npm run dev:no-auth` - Start with authentication disabled
- `npm run check-env` - Verify environment configuration

## Development Features

### Authentication Status Panel
In development mode, you'll see a status panel in the bottom-left corner showing:
- Authentication state (authenticated/loading/error)
- Cognito configuration status
- Current error messages (if any)

### Development Indicator
A small green indicator in the top-left shows:
- `DEV 🔐` - Development mode with Cognito configured
- `DEV ❌` - Development mode with missing Cognito config

### Enhanced Logging
The browser console will show detailed authentication flow logs including:
- Cognito configuration on startup
- Authentication steps and progress
- API request/response logging
- Error details with troubleshooting information

## Authentication Flow

1. **Connect Wallet**: Click the wallet button to connect Phantom
2. **Auto Authentication**: App automatically initiates Cognito auth
3. **Sign Message**: Phantom prompts you to sign an authentication message
4. **Token Storage**: Access token is stored for API requests
5. **Access Granted**: You can now use all authenticated features

## Debugging

### Common Issues

1. **Missing Cognito Configuration**
   - Check that `.env.development.local` exists and has the correct values
   - Run `npm run check-env` to verify configuration

2. **Authentication Fails**
   - Check browser console for detailed error logs
   - Verify your Phantom wallet is connected
   - Ensure you're signing the message in Phantom

3. **API Calls Fail**
   - Check that the backend server is running on `http://localhost:3000`
   - Verify the access token is being included in requests

### Lambda Function Logs

Monitor the authentication Lambda functions:

```bash
# View authentication flow logs
aws logs tail /aws/lambda/cognito-dev-DefineAuthChallenge --follow
aws logs tail /aws/lambda/cognito-dev-CreateAuthChallenge --follow  
aws logs tail /aws/lambda/cognito-dev-VerifyAuthChallenge --follow
```

### Network Debugging

Use browser DevTools Network tab to inspect:
- Cognito API calls (`cognito-idp` domain)
- Backend API calls (localhost:3000)
- Authentication token headers

## Troubleshooting

If you encounter issues:

1. Clear browser localStorage: `localStorage.clear()`
2. Refresh the page
3. Reconnect your Phantom wallet
4. Check the console for error messages
5. Verify Lambda function logs in CloudWatch

## Production vs Development

- **Development**: Uses `us-east-1_jCoKaijJx` User Pool
- **Production**: Uses separate production User Pool
- **Isolation**: Development and production are completely separate
- **Safety**: Testing in development won't affect production users
