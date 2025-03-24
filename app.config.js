import 'dotenv/config';

// This configuration file uses environment variables from .env file
// Client-side variables use EXPO_PUBLIC_ prefix and are accessible in the app
// Server-side variables don't use the prefix and are only accessible in this file

export default {
  expo: {
    runtimeVersion: {
      policy: "sdkVersion"
    },
    name: "Cluey",
    slug: "cluey",
    scheme: "cluey",
    version: "0.0.1",
    main: "index.js",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FFBF00"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.gustavofalcao1.cluey",
      buildNumber: "0.0.1",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFBF00"
      },
      package: "com.gustavofalcao1.cluey",
      versionCode: 1,
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow Cluey to access your photos",
          "cameraPermission": "Allow Cluey to access your camera"
        }
      ],
      "expo-font"
    ],
    extra: {
      // Expo EAS configuration (server-side only)
      eas: {
        projectId: process.env.EXPO_PROJECT_ID,
      },
      // Firebase configuration (client-side)
      // Prioritizes EXPO_PUBLIC_ prefixed variables over legacy variables
      firebase: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || process.env.API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || process.env.PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || process.env.APP_ID,
        measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.MEASUREMENT_ID
      },
      // Google authentication configuration (server-side only)
      google: {
        webClientId: process.env.WEB_CLIENT_ID,
        webClientSecret: process.env.WEB_CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      },
      // OpenAI configuration (client-side)
      // Prioritizes EXPO_PUBLIC_ prefixed variables over legacy variables
      openai: {
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
        orgId: process.env.EXPO_PUBLIC_OPENAI_ORG_ID || process.env.OPENAI_ORG_ID,
      }
    }
  }
}
