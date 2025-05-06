# Google OAuth Troubleshooting Guide

## Current Issue
The Google OAuth authentication is failing with the error:
```
Authorization Error
The OAuth client was not found.
Error 401: invalid_client
```

## How to Fix

### 1. Create or Update Google Cloud OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure you're in the correct project (create one if needed)
3. Navigate to "APIs & Services" > "Credentials"
4. Check if your existing OAuth client exists and is active
5. If it's missing or you need a new one:
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application" for Application Type
   - Name it "MTG Mods App (Development)"
   - Add Authorized JavaScript origins: `http://localhost:3000`
   - Add Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Click "Create"
   - Save the new Client ID and Client Secret

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you're using Google Workspace)
3. Fill in the required details:
   - App name: "MTG Mods App"
   - User support email: Your email
   - Developer contact information: Your email
4. Click "Save and Continue"
5. Add scopes: `.../auth/userinfo.email`, `.../auth/userinfo.profile`, and `openid`
6. Click "Save and Continue"
7. Add test users if in testing mode (including your own email)
8. Click "Save and Continue" then "Back to Dashboard"

### 3. Update Your Local Configuration

1. Update `src/config.local.ts` with your new credentials:
   ```typescript
   google: {
     clientId: process.env.NODE_ENV === 'production'
       ? 'YOUR_PRODUCTION_CLIENT_ID'
       : 'YOUR_NEW_DEVELOPMENT_CLIENT_ID', // Add your new client ID here
     clientSecret: process.env.NODE_ENV === 'production'
       ? 'YOUR_PRODUCTION_CLIENT_SECRET'
       : 'YOUR_NEW_DEVELOPMENT_CLIENT_SECRET', // Add your new client secret here
   },
   ```

### 4. Fix NextAuth Warnings

In the server logs, you may notice these warnings:
```
[next-auth][warn][NEXTAUTH_URL] 
https://next-auth.js.org/warnings#nextauth_url
[next-auth][warn][NO_SECRET] 
https://next-auth.js.org/warnings#no_secret
```

To fix these, create a `.env.local` file in the project root with:

```
# NextAuth Environment Variables
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=qWC3YmnLPkgbZ1spsgyT/I+1AJiWk3S3djz9tN7HxGI=

# Optional: Google credentials if you prefer environment variables
# GOOGLE_CLIENT_ID=your-new-client-id
# GOOGLE_CLIENT_SECRET=your-new-client-secret
```

### 5. Restart the Development Server

1. Stop the running server (Ctrl+C)
2. Start it again with:
   ```
   npm run dev
   ```

### 6. Testing the Authentication

1. Visit http://localhost:3000
2. Click the "Sign In" button
3. Choose Google as the provider
4. Complete the authentication flow

### Common Issues and Solutions

- **Invalid Client ID/Secret**: Double-check your credentials for typos
- **Redirect URI Mismatch**: Ensure the redirect URI in Google Cloud matches exactly: `http://localhost:3000/api/auth/callback/google`
- **Consent Screen Not Configured**: Make sure the OAuth consent screen is properly set up
- **API Not Enabled**: Enable the "Google+ API" or "Google People API" in your project
- **Testing Mode Limitations**: If in testing mode, ensure your email is added as a test user
- **NextAuth Environment Variables**: If warnings persist, check that your `.env.local` file is in the correct location
- **Configured APIs**: Make sure you've enabled the necessary APIs in your Google project:
  - "Google+ API" (legacy, if still using it)
  - "Google People API" (recommended)
  - "Gmail API" (if using email features)

### Environment Variables Alternative

If you prefer using environment variables instead of `config.local.ts`, create a `.env.local` file with:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
``` 