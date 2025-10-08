# Chat Room Application with Automation Framework

A simple real-time chat room application built with Node.js, Socket.IO, and MongoDB, featuring comprehensive BDD testing with Cypress.

## Features

### Frontend Features
- **User Authentication**: Login with hardcoded credentials
- **Real-time Messaging**: Send and receive messages instantly
- **Message History**: View previous conversations
- **Responsive Design**: Modern, mobile-friendly interface
- **User Status**: See who's online and when users join/leave

### Backend Features
- **RESTful API**: Login endpoint with JWT authentication
- **WebSocket Support**: Real-time communication via Socket.IO
- **Database Integration**: MongoDB for message persistence
- **CORS Support**: Cross-origin resource sharing enabled 

### AQA Framework Features
- **BDD Testing**: Behavior-driven development with Gherkin syntax
- **Cypress Integration**: End-to-end testing framework with Cucumber
- **Test Coverage**: Comprehensive test scenarios for all user stories
- **Professional Reports**: Mochawesome HTML reports with pie charts and evidence
- **Tag-based Execution**: Run tests by tags (@smoke, @regression, @critical, etc.)
- **Single Command Execution**: Run tests, generate reports, and open in browser with one command

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Docker** (for MongoDB container)
- **npm** (comes with Node.js)

> **Note**: This project uses MongoDB running in a Docker container, so you don't need to install MongoDB directly on your system.

## 🛠️ Installation & Setup

### 🚀 Quick Setup (Automated)

For a quick setup, use the automated script:

```bash
# Make script executable
chmod +x setup.sh

# Run automated setup
./setup.sh
```

This script will:
- Verify Node.js, npm, and Docker installation
- Install all dependencies
- Configure MongoDB Docker container
- Provide usage instructions and demo credentials

### Manual Setup (Alternative)

If you prefer manual setup, follow these steps:

### Step 1: Install Docker (Required for MongoDB)

#### For Ubuntu/Debian:
```bash
# Update package list
sudo apt update

# Install Docker
sudo apt install -y docker.io

# Add your user to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
```

#### For other Linux distributions:
```bash
# Install Docker using the official script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
```

#### For macOS:
```bash
# Install Docker Desktop from: https://www.docker.com/products/docker-desktop
# Or using Homebrew:
brew install --cask docker
```

#### For Windows:
Download and install Docker Desktop from: https://www.docker.com/products/docker-desktop

### Step 2: Install Node.js Dependencies

```bash
# Navigate to project directory
cd chat-app

# Install dependencies
npm install
```

### Step 3: Start MongoDB (Docker)

This project uses MongoDB running in a Docker container. Follow these steps:

#### If you already have the MongoDB container:
```bash
# Check if MongoDB container exists and start it
docker start mongodb

# Verify it's running
docker ps | grep mongo
```

#### If you don't have the MongoDB container:
```bash
# Run MongoDB in Docker container (this will download the image if needed)
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Verify MongoDB is running
docker ps
```

#### If the container doesn't exist and you get an error:
```bash
# Remove any existing container with the same name
docker rm mongodb

# Create and start the new MongoDB container
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Check if it's running
docker ps | grep mongo
```

#### Alternative: Using Docker Compose (Optional)
Create a `docker-compose.yml` file in the project root:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Then run:
```bash
# Start MongoDB with Docker Compose
docker-compose up -d

# Stop MongoDB
docker-compose down
```

## Running the Application

### Backend + Database

```bash
# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend

The frontend is served automatically by the backend at `http://localhost:5000`

### Demo Credentials

Use these hardcoded credentials for testing:

| Username | Password    |
|----------|-------------|
| Ana      | password123 |
| Juan     | password456 |
| Charly   | password789 |

## Running AQA Tests

### Prerequisites for Testing

Ensure the application and MongoDB are running before executing tests:

```bash
# Terminal 1: Start MongoDB Docker container
docker start mongodb

# Terminal 2: Start the application
npm start

# Terminal 3: Run tests (in a new terminal)
npm test
```

### Available Test Commands

#### Basic Test Commands
```bash
# Run all tests in headless mode
npm test

# Run tests with Cypress GUI
npm run test:open

# Run tests in headless mode (alternative)
npm run test:headless
```

#### Tag-based Test Execution
```bash
# Run tests by specific tags
npm run test:smoke          # Run @smoke tests
npm run test:regression     # Run @regression tests
npm run test:critical       # Run @critical tests
npm run test:chat           # Run @chat tests
npm run test:login          # Run @login tests
npm run test:multi-user     # Run @multi-user tests
npm run test:basic          # Run @basic tests
npm run test:api            # Run @api tests
npm run test:backend        # Run @backend tests
npm run test:authentication # Run @authentication tests
```

#### All-in-One Commands (Run Tests + Generate Report + Open Browser)
```bash
# Execute tests, generate report, and open automatically
npm run test:smoke:auto     # Run smoke tests with auto-report
npm run test:regression:auto # Run regression tests with auto-report
npm run test:critical:auto  # Run critical tests with auto-report
npm run test:chat:auto      # Run chat tests with auto-report
npm run test:login:auto     # Run login tests with auto-report
npm run test:api:auto       # Run API tests with auto-report
npm run test:backend:auto   # Run backend tests with auto-report
npm run test:authentication:auto # Run authentication tests with auto-report
npm run test:all:auto       # Run all tests with auto-report
```

#### Report Generation Commands
```bash
# Generate and open reports manually
npm run report              # Generate Mochawesome report
npm run test:smoke:report   # Run smoke tests and generate report
npm run test:regression:report # Run regression tests and generate report
```

### Test Structure

```
cypress/
├── e2e/
│   └── features/           # BDD Feature files with tags
│       ├── login.feature   # @login @authentication tags
│       ├── chat.feature    # @chat @realtime @history tags
│       ├── multi-user.feature # @multi-user @critical tags
│       └── api.feature     # @api @backend @authentication tags
├── support/
│   ├── commands.js         # Custom commands
│   ├── e2e.js             # Support file
│   └── step_definitions/
│       ├── all.steps.js   # Frontend step definitions
│       └── api.steps.js   # API step definitions
├── reports/
│   └── mochawesome-report/ # Mochawesome HTML reports
│       ├── merged-report.html # Main test report
│       ├── merged-report.json # Test data
│       ├── assets/          # Report assets (CSS, JS, fonts)
│       ├── screenshots/     # Failure screenshots
│       └── videos/          # Test execution videos
├── screenshots/            # Cypress screenshots
└── videos/                # Cypress videos
```

## Test Coverage

### User Stories Covered

#### Frontend User Stories
 **Login with existing credentials**
- Valid login with correct username/password
- Invalid login with wrong credentials
- Empty field validation

 **Send and receive messages**
- Send messages via button click
- Send messages via Enter key
- View message history
- Real-time message delivery

 **User interface**
- Responsive design
- Message timestamps
- User status indicators

#### Backend User Stories
 **Accept login requests**
- JWT token generation
- User authentication
- Session management

 **Reject invalid login requests**
- Invalid credentials handling
- Error message responses
- Security validation

 **Store messages in database**
- MongoDB integration
- Message persistence
- Real-time synchronization

### BDD Feature Files with Tags

1. **login.feature**: Tests user authentication scenarios
   - Tags: `@login`, `@authentication`, `@smoke`, `@regression`
   - Scenarios: Valid login, invalid credentials, empty fields

2. **chat.feature**: Tests messaging functionality
   - Tags: `@chat`, `@realtime`, `@history`, `@smoke`, `@regression`
   - Scenarios: Send messages, message history, real-time delivery

3. **multi-user.feature**: Tests multi-user interactions (COMMENTED - not executed)
   - Tags: `@multi-user`, `@critical`, `@realtime`, `@regression`
   - Scenarios: Multiple users, simultaneous messaging, user notifications
   - Status: Commented out - not included in test execution

4. **api.feature**: Tests backend API functionality
   - Tags: `@api`, `@backend`, `@authentication`, `@regression`
   - Scenarios: Login API, message retrieval, WebSocket integration

### Test Scenarios by Tag

- **@smoke**: Quick validation tests (2 scenarios)
- **@regression**: Full test suite (23 scenarios)
- **@critical**: High-priority tests (0 scenarios - multi-user commented)
- **@chat**: Chat functionality tests (7 scenarios)
- **@login**: Authentication tests (5 scenarios)
- **@multi-user**: Multi-user interaction tests (0 scenarios - commented)
- **@api**: Backend API tests (11 scenarios)
- **@backend**: Backend functionality tests (11 scenarios)
- **@authentication**: Authentication tests (16 scenarios)
- **@basic**: Basic functionality tests (12 scenarios)

## Configuration


### Cypress Configuration

The `cypress.config.js` file contains:
- Base URL configuration
- Viewport settings
- Timeout configurations
- Video and screenshot settings
- Mochawesome reporter configuration
- Cucumber preprocessor integration

### Cucumber Preprocessor Configuration

The `cypress-cucumber-preprocessor.config.js` file contains:
- Step definitions path configuration
- Tag filtering settings
- JSON output configuration
- Message output settings

## Test Reports

### Mochawesome HTML Reports

The framework generates professional HTML reports using Mochawesome with:

- **📊 Pie Charts**: Visual representation of pass/fail percentages
- **📋 Detailed Results**: Test-by-test breakdown with Gherkin steps
- **📸 Screenshots**: Automatic capture on test failures
- **🎥 Videos**: Full test execution recordings
- **🔍 Evidence**: Integrated screenshots and videos in the report
- **📱 Responsive Design**: Mobile-friendly report interface

### Report Locations

After running tests, you'll find:

- **HTML Report**: `cypress/reports/mochawesome-report/merged-report.html`
- **JSON Data**: `cypress/reports/mochawesome-report/merged-report.json`
- **Videos**: `cypress/videos/` - Test execution recordings
- **Screenshots**: `cypress/screenshots/` - Failure screenshots
- **Assets**: `cypress/reports/mochawesome-report/assets/` - Report styling and scripts


## Tag System

### Available Tags

The framework uses a comprehensive tag system for flexible test execution:

- **@smoke**: Quick validation tests for basic functionality
- **@regression**: Complete test suite for full validation
- **@critical**: High-priority tests for core functionality
- **@chat**: Chat-specific functionality tests
- **@login**: Authentication and login tests
- **@multi-user**: Multi-user interaction tests
- **@basic**: Basic functionality tests
- **@authentication**: Authentication-related tests
- **@realtime**: Real-time messaging tests
- **@history**: Message history tests

### Tag Usage Examples

```gherkin
@smoke @chat
Feature: Quick Chat Validation
  Scenario: Send a message
    Given I am logged in as "Ana"
    When I type "Hello" in the message input
    And I click the send button
    Then I should see "Hello" in the chat

@regression @critical @multi-user
Feature: Multi-User Chat
  Scenario: Multiple users can join and chat
    Given user "Ana" is logged in
    And user "Juan" is logged in
    When Ana sends "Hi Bob!"
    Then Juan should see "Hi Bob!"
```

### Tag Execution Strategy

- **Development**: Use `@smoke` for quick validation
- **Pre-deployment**: Use `@critical` for essential functionality
- **Full Testing**: Use `@regression` for complete validation
- **Feature Testing**: Use specific tags like `@chat` or `@login`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB Docker container is running
   docker ps | grep mongo
   
   # If container is not running, start it
   docker start mongodb
   
   # If container doesn't exist, create it
   docker run -d --name mongodb -p 27017:27017 mongo:latest
   
   # Check container logs for errors
   docker logs mongodb
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   sudo lsof -ti:5000 | xargs kill -9
   ```

3. **Cypress Tests Failing**
   ```bash
   # Ensure application is running
   curl http://localhost:5000
   
   # Clear Cypress cache
   npx cypress cache clear
   ```

4. **Permission Issues**
   ```bash
   # Fix MongoDB data directory permissions
   sudo chown -R $USER /data/db
   ```

### Debug Mode

Run tests in debug mode:

```bash
# Open Cypress GUI for debugging
npm run test:open

# Run specific test file
npx cypress run --spec "cypress/e2e/features/login.feature"
```

## 📝 Development

### Adding New Tests

1. **Create Feature File**: Add `.feature` file in `cypress/e2e/features/`
   - Use Gherkin syntax with Given/When/Then steps
   - Add appropriate tags (@smoke, @regression, @critical, etc.)
2. **Implement Steps**: Add step definitions in `cypress/support/step_definitions/all.steps.js`
3. **Add Tags to package.json**: Update npm scripts for new tags if needed
4. **Test Execution**: Use tag-based commands to run specific test suites

### Project Structure

```
chat-app/
├── public/
│   └── index.html                    # Frontend application
├── cypress/                          # AQA framework
│   ├── e2e/
│   │   └── features/                 # BDD Feature files
│   │       ├── login.feature
│   │       ├── chat.feature
│   │       └── multi-user.feature
│   ├── support/
│   │   ├── commands.js               # Custom commands
│   │   ├── e2e.js                   # Support file
│   │   └── step_definitions/
│   │       └── all.steps.js         # Step definitions
│   ├── reports/
│   │   └── mochawesome-report/      # HTML reports
│   ├── screenshots/                  # Test screenshots
│   └── videos/                       # Test videos
├── server.js                         # Backend server
├── package.json                      # Dependencies & scripts
├── cypress.config.js                 # Cypress configuration
├── cypress-cucumber-preprocessor.config.js # Cucumber config
├── run-tests-and-open.js             # Auto test runner
├── setup.sh                          # Automated setup script
└── README.md                         # This file
```

## Other Features

- **Real-time Notifications**: User join/leave notifications
- **Message Persistence**: All messages saved to database
- **Responsive Design**: Mobile-friendly interface
- **Session Management**: JWT-based authentication
- **Error Handling**: Comprehensive error messages
- **Test Automation**: Single-command test execution
- **Professional Reports**: Mochawesome HTML reports with charts and evidence
- **Tag-based Testing**: Flexible test execution by categories
- **BDD Framework**: Complete Cucumber integration with Cypress
- **Auto Report Opening**: Reports open automatically in browser
- **Evidence Integration**: Screenshots and videos embedded in reports
- **Automated Setup**: One-command setup script for quick installation

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure MongoDB is running
4. Check that the application starts without errors
5. Review test logs for specific error messages

## Success Criteria

✅ **AQA Framework**: Cypress with BDD support and Cucumber preprocessor  
✅ **Frontend**: Modern, responsive chat interface  
✅ **Backend**: Node.js with Socket.IO and MongoDB  
✅ **Database**: Lightweight MongoDB setup  
✅ **Testing**: Comprehensive test coverage with tag-based execution  
✅ **Reports**: Professional Mochawesome HTML reports with evidence  
✅ **Documentation**: Detailed setup instructions  
✅ **Automation**: Single-command test execution with auto-report opening  
✅ **BDD Integration**: Complete Gherkin feature files with step definitions  
✅ **Tag System**: Flexible test execution by categories (@smoke, @regression, etc.)  
✅ **Setup Automation**: One-command setup script for quick project initialization  
