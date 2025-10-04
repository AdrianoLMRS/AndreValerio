#!/bin/bash

set -e

# Loads .env variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

if [ -z "$GITHUB_PAT" ]; then
    echo "❌ GITHUB_PAT var is not defined...";  exit 1
fi

if [ -z "$WORFLOW_ID_1" ] || [ -z "$WORFLOW_ID_2" ]; then
    echo "❌ WORKFLOW_ID vars is not defined..."; exit 1
fi

REPO="AdrianoLMRS/AndreValerio"
BRANCH="main"

echo "⏳ Checking if any workflow is still running..."

while true; do
    RUNNING=$(curl -s -H "Authorization: token $GITHUB_PAT" \
        "https://api.github.com/repos/$REPO/actions/runs?branch=$BRANCH&status=in_progress&per_page=1" \
        | jq '.total_count')

    QUEUED=$(curl -s -H "Authorization: token $GITHUB_PAT" \
        "https://api.github.com/repos/$REPO/actions/runs?branch=$BRANCH&status=queued&per_page=1" \
        | jq '.total_count')

    if [ "$RUNNING" -eq 0 ] && [ "$QUEUED" -eq 0 ]; then
        echo "✅ No workflows in progress or queued. Continuing..."
        break
    fi

    echo "⚠️ Workflows still running (in_progress=$RUNNING, queued=$QUEUED). Waiting 15s..."
    sleep 15
done

echo "🔍 Searching last success run"

WORKFLOW1_ID=$WORFLOW_ID_1
WORKFLOW2_ID=$WORFLOW_ID_2

get_last_success() {
    local workflow_id=$1
    curl -s -H "Authorization: token $GITHUB_PAT" \
        "https://api.github.com/repos/$REPO/actions/workflows/$workflow_id/runs?branch=$BRANCH&status=success&per_page=1" \
        | jq -r '.workflow_runs[0] | {id, created_at}'
}

W1=$(get_last_success "$WORKFLOW1_ID")
W2=$(get_last_success "$WORKFLOW2_ID")

W1_ID=$(echo "$W1" | jq -r '.id')
W1_DATE=$(echo "$W1" | jq -r '.created_at')

W2_ID=$(echo "$W2" | jq -r '.id')
W2_DATE=$(echo "$W2" | jq -r '.created_at')

# Compare timestamps
if [[ "$W1_DATE" > "$W2_DATE" ]]; then
    RUN_ID=$W1_ID
    CHOSEN_DATE=$W1_DATE
else
    RUN_ID=$W2_ID
    CHOSEN_DATE=$W2_DATE
fi

if [ -z "$RUN_ID" ]; then
    echo "❌ No success run found in $BRANCH..."
    exit 1
fi

echo "🔎 Searching for artifact ID ($RUN_ID)..."

ARTIFACT_ID=$(curl -s -H "Authorization: token $GITHUB_PAT" \
    "https://api.github.com/repos/$REPO/actions/runs/$RUN_ID/artifacts" | \
    jq -r '.artifacts[] | select(.name=="site-dist") | .id')

if [ -z "$ARTIFACT_ID" ]; then
    echo "❌ Artifact 'site-dist' not found..."
    exit 1
fi

echo "📦 Artifact URL: $ARTIFACT_URL"
echo "⬇️ Downloading & extracting dist..."

rm -rf dist
curl -L -H "Authorization: token $GITHUB_PAT" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$REPO/actions/artifacts/$ARTIFACT_ID/zip" \
    -o site-dist.zip

unzip site-dist.zip -d dist
rm site-dist.zip

echo "✅ Download finished & /dist ready."