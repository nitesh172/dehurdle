#!/bin/bash

# Parse arguments
SEED_DB=false
for arg in "$@"; do
  if [ "$arg" = "--seed" ]; then
    SEED_DB=true
  fi
done

# Copy .env.example to .env if not exists
if [ ! -f backend/.env ] && [ -f backend/.env.example ]; then
  cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env ] && [ -f frontend/.env.example ]; then
  cp frontend/.env.example frontend/.env
fi

# Install dependencies
echo "Installing backend dependencies..."
(cd backend && npm install)

echo "Installing frontend dependencies..."
(cd frontend && npm install)

# Seed database if --seed flag passed
if [ "$SEED_DB" = true ]; then
  echo "Seeding database..."
  (cd backend && npm run seed)
fi

echo "App setup is complete and ready to run!"
