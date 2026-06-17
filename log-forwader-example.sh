#!/bin/bash

# ==========================================
# Configuration
# ==========================================
UNIT_NAME="your-service.service"          # Replace with your systemd unit name
ENDPOINT_URL="https://your-api.endpoint.com/api/logentry/digest"
API_KEY="your_super_secret_api_key"
PROCESS_ID=12345                          

# Ensure the script exits if journalctl fails
# Exit if any command returns anything but OK (code 0)
set -e

echo "Starting log forwarder for $UNIT_NAME..."

# Tail the systemd unit logs starting from now (-n 0) and follow (-f)
journalctl -u "$UNIT_NAME" -n 0 -f | while read -r line; do
    
    # Skip empty lines
    if [[ -z "$line" ]]; then
        continue
    fi

    # Generate the timestamp in the requested ISO 8601 format (UTC)
    CURRENT_TIME=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

    # Safely construct the JSON payload using jq
    # --arg parses as string, --argjson parses as primitive (number/boolean)
    JSON_PAYLOAD=$(jq -n -c \
        --arg content "$line" \
        --arg time "$CURRENT_TIME" \
        --argjson processId "$PROCESS_ID" \
        '{content: $content, time: $time, processId: $processId}'
    )

    # Fire the POST request via curl
    # -s runs it silently so curl output doesn't clutter the terminal
    # -o /dev/null discards the response body
    # -w "%{http_code}" can be used if you want to log the response status
    curl -s -o /dev/null -X POST "$ENDPOINT_URL" \
        -H "Content-Type: application/json" \
        -H "x-api-key: $API_KEY" \
        -d "$JSON_PAYLOAD"

done