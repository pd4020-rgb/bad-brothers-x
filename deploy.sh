#!/bin/bash

# BAD BROTHERS X — ONE-CLICK DEPLOY SCRIPT (Vercel)
echo "=================================================="
echo "⚡ Starting BAD BROTHERS X Website Deployment"
echo "=================================================="

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ Error: npm is not installed. Please install Node.js first."
    exit 1
fi

echo "📦 Running Vercel deployment via npx..."
echo "💡 Note: If this is your first time, it will prompt you to log into Vercel in your browser."
echo "💡 Just press Enter for the default options (Project Name, Directory, etc.)"
echo "--------------------------------------------------"

npx vercel --prod

echo "--------------------------------------------------"
echo "✅ Deployment process complete!"
echo "=================================================="
