import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  readonly logoutButton: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;
  readonly productContainer: Locator;
  readonly shopNowButton: Locator;
  readonly featuredProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.locator("#logoutBtn");
    this.cartIcon = page.locator("(//i[@class='fas fa-shopping-cart text-primary fa-2x'])[1]");
    this.cartCount = page.locator("#cartCount");
    this.productContainer = page.locator("#productContainer");
    this.shopNowButton = page.locator('text="Shop Now"').first();
    this.featuredProducts = page.locator("//button[@data-id='1']"); 

  }

  async getCartCount(): Promise<number> {
    if (await this.isElementVisible(this.cartCount)) {
      const countText = await this.getText(this.cartCount);
      return parseInt(countText) || 0;
    }
    return 0;
  }

  async getFeaturedProductsCount(): Promise<number> {
    return await this.productContainer.count();
  }

  async clickFirstFeaturedProduct(): Promise<void> {
    await this.clickElement(this.featuredProducts.first());
    await this.waitForPageLoad();
  }

  async navigateToCart(): Promise<void> {
    await this.clickElement(this.cartIcon);
    await this.waitForPageLoad();
  }
}
