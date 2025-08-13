# Playwright Test Automation Framework

A comprehensive test automation framework built with Playwright and TypeScript for testing the QA Automation Labs shop website.

## Application Under Test
We are using https://shop.qaautomationlabs.com/ as the Application Under Test. This App is built on PHP language.

- URL: https://shop.qaautomationlabs.com/
- OS : macOS
- IDE : Visual Studio Code

## Features

- **Page Object Model**: Clean, maintainable test structure
- **TypeScript Support**: Type-safe test development
- **Cross-Browser Testing**: Chrome, Firefox, Safari, and mobile browsers
- **Parallel Test Execution**: Faster test runs
- **Rich Reporting**: HTML, JSON, and JUnit reports
- **Screenshot & Video**: Automatic capture on failures
- **CI/CD Ready**: Configured for continuous integration

## Project Structure

```
├── src/
│   ├── config/          # Test configuration and data
│   ├── pages/           # Page Object Models
│   └── utils/           # Helper utilities
├── tests/
│   ├── e2e/             # End-to-end tests
│   ├── ui/              # UI tests
│   └── api/             # API health checks
├── playwright.config.ts # Playwright configuration
└── package.json
```

## Installation

#### Installation

Install the dependencies and devDependencies to run the test.

- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:

1. Clone the repository

```bash
GitHub: git clone https://github.com/JayKishoreDuvvuri/Playwright-TypeScript-AI-Bolt.git
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install-browsers
```

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Categories
```bash
npm run test:login    # Login functionality tests
npm run test:homepage # Homepage functionality tests
npm run test:e2e      # End-to-end shopping flow tests
npm run test:ui-tests # UI tests
npm run test:api      # API health checks
```

### Browser-Specific Tests
```bash
npm run test:chromium # Chrome only
npm run test:firefox  # Firefox only
npm run test:webkit   # Safari only
npm run test:mobile   # Mobile browsers
```

### Debug Mode
```bash
npm run test:debug    # Debug with browser open
npm run test:headed   # Run with browser UI visible
```

## Test Credentials

The framework uses the following test credentials:
- **Email**: demo@demo.com
- **Password**: demo

These credentials are configured in `src/config/test-config.ts`.

## Key Components

### Page Objects
- `BasePage`: Common functionality for all pages
- `LoginPage`: Authentication operations
- `HomePage`: Homepage interactions
- `ProductPage`: Product details and cart operations
- `CartPage`: Shopping cart management
- `CheckoutPage`: Order placement flow

### Test Categories

1. **Authentication Tests** (`tests/auth/`)
   - Valid/invalid login scenarios
   - Logout functionality
   - Session management

2. **End-to-End Tests** (`tests/e2e/`)
   - Complete shopping flow
   - Cart operations
   - Check out to Place and and Purchase Order

3. **UI Tests** (`tests/ui/`)
   - Homepage element verification
   - Navigation functionality
   - Responsive design checks

4. **API Tests** (`tests/api/`)
   - Website health checks
   - Response time validation

## Configuration

### Playwright Config (`playwright.config.ts`)
- Browser configurations
- Test timeouts
- Reporting settings
- Screenshot/video capture

### Test Config (`src/config/test-config.ts`)
- Base URL
- Test credentials
- Test data
- Environment settings

## Reporting

After test execution, reports are generated in:
- `playwright-report/` - HTML report
- `test-results/` - JSON and JUnit reports

View HTML report:
```bash
npm run report
```

## Best Practices

1. **Page Object Model**: All page interactions go through page objects
2. **Explicit Waits**: Use proper waiting strategies
3. **Independent Tests**: Each test should be able to run independently
4. **Test Data**: Use configuration files for test data
5. **Error Handling**: Proper error handling and meaningful assertions

## CI/CD Integration

The framework is configured for CI/CD with:
- Headless browser execution
- Retry mechanisms for flaky tests
- Multiple report formats
- Screenshot/video capture on failures

## Troubleshooting

### Common Issues

1. **Browser Installation**: Run `npm run install-browsers`
2. **Port Conflicts**: Ensure port 3000 is available
3. **Network Issues**: Check website accessibility
4. **Permission Errors**: Ensure write permissions for reports

### Debug Tips

1. Use `npm run test:debug` for step-by-step debugging
2. Add `await page.pause()` in tests for manual inspection
3. Check browser console logs in headed mode
4. Use `await page.screenshot()` for visual debugging