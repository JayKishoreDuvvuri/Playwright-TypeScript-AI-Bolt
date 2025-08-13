import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login-page";
import { testConfig } from "../../src/config/test-config";

test.describe("Login Functionality", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test("should login with valid credentials", async () => {
    await loginPage.login(
      testConfig.credentials.email,
      testConfig.credentials.password
    );

    expect(await loginPage.isLoggedIn()).toBe(true);
    await expect(loginPage.page).toHaveURL(testConfig.loginUrl);
  });

  test("should show error with invalid credentials", async () => {
    await loginPage.login("invalid@email.com", "wrongpassword");

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testConfig.loginErrorText);
  });

  test("should show validation error with empty fields with blank email", async () => {
    await loginPage.login("", "");

    const errorMessage = await loginPage.getErrorEmail();
    expect(errorMessage).toContain(testConfig.loginEmailErrorText);
  });

  test("should logout successfully", async () => {
    await loginPage.login(
      testConfig.credentials.email,
      testConfig.credentials.password
    );
    expect(await loginPage.isLoggedIn()).toBe(true);

    await loginPage.logout();
    await expect(loginPage.page).toHaveURL(testConfig.logoutUrl);
  });
});
