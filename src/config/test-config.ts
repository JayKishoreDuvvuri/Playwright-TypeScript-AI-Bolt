export interface TestConfig {
  baseUrl: string;
  loginUrl: string;
  logoutUrl: string;
  loginErrorText: string;
  loginEmailErrorText: string;
  homePageTitle: string;
  timeout: number;
  credentials: {
    email: string;
    password: string;
  };
}

export const testConfig: TestConfig = {
  baseUrl: 'https://shop.qaautomationlabs.com/',
  loginUrl: 'https://shop.qaautomationlabs.com/shop.php',
  logoutUrl: 'https://shop.qaautomationlabs.com/index.php',
  loginErrorText: 'Invalid email or password!',
  loginEmailErrorText: 'Please enter your email.',
  homePageTitle: 'SHOP | QA AUTOMATIONLAB',
  timeout: 30000,
  credentials: {
    email: 'demo@demo.com',
    password: 'demo'
  }
};

export const testData = {
  searchTerms: {
    valid: 'shirt',
    invalid: 'xyzabc123notfound'
  },
  customerInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'xyz123@xyz.com',
    mobileNumber: '555-0123',
    address: '123 Test Street',
    city: 'Test City',
    postalCode: '12345',
    state: 'Test State',
  }
};