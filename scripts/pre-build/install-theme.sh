#!/usr/bin/env bash

set -eo pipefail

DIRNAME="$(dirname -- "${BASH_SOURCE[0]}")"

THEME_NAME="mkdocs-material"

"$DIRNAME"/install-theme-vendor.sh
