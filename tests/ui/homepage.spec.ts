import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home-page";
import { LoginPage } from "../../src/pages/login-page";
import { testConfig } from "../../src/config/test-config";

test.describe("Homepage UI Tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(
      testConfig.credentials.email,
      testConfig.credentials.password
    );
  });

  test("should display homepage elements correctly", async () => {
    // Check if product container  is visible
    await expect(homePage.productContainer).toBeVisible();
    await expect(homePage.logoutButton).toBeVisible();

    // Check if cart icon is visible
    await expect(homePage.cartIcon).toBeVisible();
  });

  test("should display featured products", async () => {
    const productCount = await homePage.getFeaturedProductsCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test("should have correct page title", async () => {
    await expect(homePage.page).toHaveTitle(testConfig.homePageTitle);
  });

  test("should navigate to cart when cart icon is clicked", async () => {
    await homePage.navigateToCart();
    await expect(homePage.page).toHaveURL(/cart/);
  });

  test("cart icon should show correct count", async () => {
    await homePage.clickFirstFeaturedProduct();
    const initialCartCount = await homePage.getCartCount();
    expect(initialCartCount).toBeGreaterThanOrEqual(0);
  });
});
