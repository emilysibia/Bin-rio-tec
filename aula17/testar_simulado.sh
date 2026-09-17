#!/bin/bash
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3008/api/v1/health)
echo "Health Check - $(date) - HTTP Status: $STATUS" > health_check.log
