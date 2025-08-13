import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  address: string;
  city: string;
  postalCode: string;
  mobileNumber: string;
}

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly email: Locator;
  readonly mobileNumber: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueBtn: Locator;
  readonly placeOrderButton: Locator;
  readonly orderTotal: Locator;
  readonly orderReceivedTitle: Locator;
  readonly shopAgainBtn: Locator;
  readonly successfulMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("#firstname");
    this.lastNameInput = page.locator("#lastname");
    this.email = page.locator("#email");
    this.mobileNumber = page.locator("#phone");
    this.addressInput = page.locator("#address");
    this.stateInput = page.locator("#states");
    this.cityInput = page.locator("#city");
    this.postalCodeInput = page.locator("#pincode");
    this.continueBtn = page.locator("#btn-continue");
    this.placeOrderButton = page.locator(
      "(//a[normalize-space()='Place Order'])[1]"
    );
    this.orderTotal = page.locator("(//td[contains(text(),'₹3999')])[1]");
    this.orderReceivedTitle = page.locator(
      "//h1[contains(text(),'🎉 Thank You for Your Order!')]"
    );
    this.shopAgainBtn = page.locator("//a[normalize-space()='Shop Again']");
    this.successfulMessage = page.locator(
      "//p[contains(text(),'Your order has been placed successfully.')]"
    ); // Assuming this is the successful message locator
  }

  async fillBillingInformation(billingInfo: BillingInfo): Promise<void> {
    await this.fillInput(this.firstNameInput, billingInfo.firstName);
    await this.fillInput(this.lastNameInput, billingInfo.lastName);
    await this.fillInput(this.email, billingInfo.email);
    await this.fillInput(this.mobileNumber, billingInfo.mobileNumber);
    await this.fillInput(this.addressInput, billingInfo.address);
    await this.fillInput(this.cityInput, billingInfo.city);
    await this.fillInput(this.stateInput, billingInfo.state);
    await this.fillInput(this.postalCodeInput, billingInfo.postalCode);
    await this.clickElement(this.continueBtn);
  }

  async placeOrder(): Promise<void> {
    await this.clickElement(this.placeOrderButton);
    await this.waitForPageLoad();
  }

  async getOrderTotal(): Promise<string> {
    return await this.getText(this.orderTotal);
  }

  async isOrderPlaced(): Promise<boolean> {
    await this.isElementVisible(this.orderReceivedTitle);
    await this.isElementVisible(this.successfulMessage);
    return await this.isElementVisible(this.shopAgainBtn);
  }
}
