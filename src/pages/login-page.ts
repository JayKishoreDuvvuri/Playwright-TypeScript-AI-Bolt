import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorEmail: Locator;
  readonly myAccountLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMsg');
    this.errorEmail = page.locator('#emailerror');
    this.myAccountLink = page.locator('text="My account"');
    this.logoutLink = page.locator('#logoutBtn');
  }

  async navigateToLogin(): Promise<void> {
    await this.navigateTo();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForPageLoad();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.isElementVisible(this.logoutLink);
  }

  async logout(): Promise<void> {
    if (await this.isLoggedIn()) {
      await this.clickElement(this.logoutLink);
      await this.waitForPageLoad();
    }
  }

  async getErrorMessage(): Promise<string> {
    if (await this.isElementVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }
    return '';
  }

    async getErrorEmail(): Promise<string> {
    if (await this.isElementVisible(this.errorEmail)) {
      return await this.getText(this.errorEmail);
    }
    return '';
  }
}