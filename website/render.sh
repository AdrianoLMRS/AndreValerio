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

echo "🔍 Searching last success run in branch 'internationalization'..."

RUN_ID=$(curl -s -H "Authorization: token $GITHUB_PAT" \
  "https://api.github.com/repos/AdrianoLMRS/AndreValerio/actions/runs?branch=internationalization&status=success&per_page=1" |
  grep '"id":' | head -n 1 | sed 's/[^0-9]*//g')

if [ -z "$RUN_ID" ]; then
  echo "❌ No success run found in 'internationalization'."
  exit 1
fi

echo "🔎 Searching for artifact ID ($RUN_ID)..."

ARTIFACT_URL=$(curl -s -H "Authorization: token $GITHUB_PAT" \
  "https://api.github.com/repos/AdrianoLMRS/AndreValerio/actions/runs/$RUN_ID/artifacts" |
  grep -B 5 '"name": "site-dist"' |
  grep '"archive_download_url":' |
  head -n 1 |
  cut -d '"' -f 4)

if [ -z "$ARTIFACT_URL" ]; then
  echo "❌ Artifact 'site-dist' not found..."
  exit 1
fi

echo "📦 Artifact URL: $ARTIFACT_URL"
echo "⬇️ Downloading & extracting dist..."

rm -rf dist
curl -L -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/AdrianoLMRS/AndreValerio/actions/artifacts/$ARTIFACT_URL/zip" \
  -o site-dist.zip

unzip site-dist.zip -d dist
rm site-dist.zip

echo "✅ Download finished & /dist ready."