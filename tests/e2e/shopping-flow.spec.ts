import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home-page";
import { ProductPage } from "../../src/pages/product-page";
import { CartPage } from "../../src/pages/cart-page";
import { CheckoutPage } from "../../src/pages/checkout-page";
import { AuthHelper } from "../../src/utils/auth-helper";
import { testConfig } from "../../src/config/test-config";
import { testData } from "../../src/config/test-config";
import { LoginPage } from "../../src/pages/login-page";

test.describe("End-to-End Shopping Flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    authHelper = new AuthHelper(page);
    await loginPage.navigateToLogin();
    await loginPage.login(
      testConfig.credentials.email,
      testConfig.credentials.password
    );
  });

  test("complete shopping flow from product selection to checkout", async () => {
    // Step 2: Select first product from search results
    await homePage.clickFirstFeaturedProduct();

    // Step 3: Add product to cart
    const productTitle = await productPage.getProductTitle();
    expect(productTitle).toBeTruthy();

    await productPage.addToCart();
    expect(await productPage.isAddedToCart()).toBe(true);

    // Step 5: Verify cart contents
    const cartItemsCount = await productPage.getCartCount();
    expect(cartItemsCount).toBeGreaterThan(0);

    // Step 6: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 7: Login if required
    await authHelper.ensureLoggedIn();

    // Step 8: Fill billing information
    await checkoutPage.fillBillingInformation(testData.customerInfo);

    const orderTotal = await checkoutPage.getOrderTotal();
    expect(orderTotal).toBeTruthy();
    expect(orderTotal).toContain("₹");

    // Step 8: Place order successfully
    await checkoutPage.placeOrder();
    await checkoutPage.isOrderPlaced();
  });
});
