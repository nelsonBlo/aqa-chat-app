#!/bin/bash

echo "🚀 Setting up Chat Room Application with AQA Framework"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if Docker is installed (required for MongoDB)
echo "🔍 Checking Docker installation..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Ubuntu/Debian: sudo apt install docker.io"
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ Docker is installed"

# Check if MongoDB Docker container is running
echo "🔍 Checking MongoDB Docker container status..."

if docker ps | grep -q mongodb; then
    echo "✅ MongoDB Docker container is running"
elif docker ps -a | grep -q mongodb; then
    echo "⚠️  MongoDB container exists but not running. Starting..."
    docker start mongodb
    echo "✅ MongoDB container started"
else
    echo "⚠️  MongoDB Docker container not found. Creating and starting..."
    docker run -d --name mongodb -p 27017:27017 mongo:latest
    echo "✅ MongoDB Docker container created and started"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the application: npm start"
echo "2. Open browser: http://localhost:5000"
echo "3. Run tests: npm test"
echo ""
echo "🔑 Demo credentials:"
echo "   Username: Ana, Password: password123"
echo "   Username: Juan, Password: password456"
echo "   Username: Charly, Password: password789"
echo ""
echo "🧪 Run AQA tests:"
echo "   npm test                    # Run all tests"
echo "   npm run test:open          # Open Cypress GUI"
echo "   npm run test:regression:auto # Run regression tests with report"
echo "   npm run test:api:auto      # Run API tests with report"
echo ""
