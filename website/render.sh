#!/bin/bash

set -e

# Loads .env variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

if [ -z "$GITHUB_PAT" ]; then
  echo "❌ GITHUB_PAT var is not defined..."
  exit 1
fi

echo "🔎 Searching for artifact ID..."

ARTIFACT_ID=$(curl -s -H "Authorization: token $GITHUB_PAT" \
  https://api.github.com/repos/AdrianoLMRS/AndreValerio/actions/artifacts |
  grep -A 10 '"name": "site-dist"' | grep '"id":' | head -n 1 | sed 's/[^0-9]*//g')

if [ -z "$ARTIFACT_ID" ]; then
  echo "❌ Artifact 'site-dist' not found..."
  exit 1
fi

echo "📦 Artifact ID: $ARTIFACT_ID"
echo "⬇️ Downloading & extracting dist..."

rm -rf dist
curl -L -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/AdrianoLMRS/AndreValerio/actions/artifacts/$ARTIFACT_ID/zip" \
  -o site-dist.zip

unzip site-dist.zip -d dist
rm site-dist.zip

echo "✅ Download finished & /dist ready."