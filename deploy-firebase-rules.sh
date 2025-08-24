#!/bin/bash

# Firebase Rules Deployment Script for Vercel + Firebase Setup
# This script deploys only the Firebase security rules, not the hosting

echo "🚀 Deploying Firebase Security Rules..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase. Please login first:"
    echo "firebase login"
    exit 1
fi

echo "📋 Deploying Database Rules..."
firebase deploy --only database

echo "📋 Deploying Firestore Rules..."
firebase deploy --only firestore

echo "📋 Deploying Storage Rules..."
firebase deploy --only storage

echo "✅ Firebase security rules deployed successfully!"
echo "🌐 Your app will be hosted on Vercel, but Firebase services are now secured."
