#!/bin/bash

# Navigate to the client directory, install dependencies, and start the client
cd client
npm install
npm run dev &

# Navigate to the server directory, install dependencies, and start the server
cd ../server
npm install
npm run dev

# Wait for both processes to finish
wait
