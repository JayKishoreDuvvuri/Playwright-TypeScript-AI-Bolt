import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator("(//a[normalize-space()='Camera'])[1]");
    this.productPrice = page.locator(".price");
    this.addToCartButton = page.locator("//button[@data-id='1']");
    this.cartCount = page.locator("#cartCount");
  }

  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  async addToCart(): Promise<void> {
    await this.clickElement(this.addToCartButton);
    await this.waitForPageLoad();
  }

  async isAddedToCart(): Promise<boolean> {
    return await this.isElementVisible(this.cartCount);
  }

  async getCartCount(): Promise<number> {
    if (await this.isElementVisible(this.cartCount)) {
      const countText = await this.getText(this.cartCount);
      return parseInt(countText) || 0;
    }
    return 0;
  }
}
