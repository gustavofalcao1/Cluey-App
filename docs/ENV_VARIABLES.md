# Environment Variables Guide for Cluey App

## Overview

This document explains how environment variables are used in the Cluey App with Expo SDK 52+.

## Environment Variables in Expo SDK 52+

Expo SDK 52+ introduces a new approach to environment variables:

- **Client-side variables** (accessible in the app) must use the `EXPO_PUBLIC_` prefix
- **Server-side variables** (only accessible in app.config.js and server code) don't use this prefix

## Setting Up Environment Variables

1. Copy `.env.example` to a new file named `.env` in the project root
2. Fill in your actual values in the `.env` file
3. Never commit the `.env` file to version control

## Accessing Environment Variables

### In app.config.js

All environment variables can be accessed using `process.env.VARIABLE_NAME`:

```javascript
// In app.config.js
export default {
  expo: {
    extra: {
      firebase: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        // ...
      }
    }
  }
}
```

### In your app code

Access environment variables through the Constants API:

```javascript
import Constants from 'expo-constants';

// Access Firebase configuration
const firebaseConfig = Constants.manifest.extra.firebase;

// Access OpenAI configuration
const OPENAI_API_KEY = Constants.manifest.extra.openai.apiKey;
```

## Available Environment Variables

### Client-side Variables (with EXPO_PUBLIC_ prefix)

- **Firebase Configuration**
  - `EXPO_PUBLIC_FIREBASE_API_KEY`
  - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
  - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `EXPO_PUBLIC_FIREBASE_APP_ID`
  - `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID`

- **OpenAI Configuration**
  - `EXPO_PUBLIC_OPENAI_API_KEY`
  - `EXPO_PUBLIC_OPENAI_ORG_ID`

### Server-side Variables (without EXPO_PUBLIC_ prefix)

- **Expo Configuration**
  - `EXPO_PROJECT_ID`

- **Google Authentication**
  - `WEB_CLIENT_ID`
  - `WEB_CLIENT_SECRET`
  - `REDIRECT_URI`

## Legacy Variables (Deprecated)

The following variables are kept for backward compatibility but should not be used in new code:

- `API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, etc. (use EXPO_PUBLIC_FIREBASE_* instead)
- `OPENAI_API_KEY`, `OPENAI_ORG_ID` (use EXPO_PUBLIC_OPENAI_* instead)

## Best Practices

1. Always use the `EXPO_PUBLIC_` prefix for variables that need to be accessible in the client-side code
2. Keep sensitive information in server-side variables when possible
3. Use the Constants API to access environment variables in your app code
4. Regularly update your `.env.example` file when adding new environment variables