#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Get the tag from command line arguments
const tag = process.argv[2] || '';

console.log('🚀 Starting test execution...');

try {
  // Step 1: Clean reports
  console.log('🧹 Cleaning previous reports...');
  execSync('npm run clean:reports', { stdio: 'inherit' });

  // Step 2: Run tests based on tag
  console.log(`🧪 Running tests with tag: ${tag || 'all'}...`);
  try {
    if (tag) {
      execSync(`npm run test:${tag}`, { stdio: 'inherit' });
    } else {
      execSync('npm test', { stdio: 'inherit' });
    }
  } catch (error) {
    console.log('⚠️  Tests completed with warnings (continuing to generate report)...');
    // Continue even if there are warnings/errors
  }

  // Step 3: Generate reports
  console.log('📊 Generating reports...');
  execSync('npm run report', { stdio: 'inherit' });

  // Step 4: Open the report
  console.log('🌐 Opening report in browser...');
  const reportPath = path.join(__dirname, 'cypress/reports/mochawesome-report', 'merged-report.html');
  execSync(`xdg-open "${reportPath}"`, { stdio: 'inherit' });

  console.log('✅ All done! Report opened in browser.');

} catch (error) {
  console.error('❌ Error occurred:', error.message);
  process.exit(1);
}
