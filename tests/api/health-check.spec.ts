import { test, expect } from '@playwright/test';
import { testConfig } from '../../src/config/test-config';

test.describe('Website Health Check', () => {
  test('should respond with 200 status code', async ({ request }) => {
    const response = await request.get(testConfig.baseUrl);
    expect(response.status()).toBe(200);
  });

  test('should have proper content-type header', async ({ request }) => {
    const response = await request.get(testConfig.baseUrl);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
  });

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(testConfig.baseUrl);
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  });
});