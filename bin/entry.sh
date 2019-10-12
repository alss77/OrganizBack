#!/bin/bash

# wait for database
./bin/wait-for-it.sh postgres:5432
echo "Running migrations..."
npm run typeorm -- migration:run
exec "$@"
