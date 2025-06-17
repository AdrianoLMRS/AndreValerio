#!/usr/bin/env bash

set -e

echo -e "\033[33m[build:render]\033[0m Waiting for LibreTranslate at: $LIBRETRANSLATE"

until curl --silent --fail "$LIBRETRANSLATE" > /dev/null; do
  printf '.'
  sleep 2
done

echo -e "\n\033[32m✔ LibreTranslate is available."

echo -e "\033[34m[build:render]\033[0m Building Astro site..."
npm run build