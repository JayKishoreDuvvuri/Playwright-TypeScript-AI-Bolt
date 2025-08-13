import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class CartPage extends BasePage {
  readonly cartIcon: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly updateCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartIcon = page.locator(
      "(//i[@class='fas fa-shopping-cart text-primary fa-2x'])[1]"
    );
    this.proceedToCheckoutButton = page.locator("#checkoutBtn");
    this.updateCartButton = page.locator('button[name="update_cart"]');
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.cartIcon);
    await this.clickElement(this.proceedToCheckoutButton);
    await this.waitForPageLoad();
  }
}
