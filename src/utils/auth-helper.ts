import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { testConfig } from '../config/test-config';

export class AuthHelper {
  private loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async login(): Promise<void> {
    await this.loginPage.navigateToLogin();
    await this.loginPage.login(testConfig.credentials.email, testConfig.credentials.password);
  }

  async logout(): Promise<void> {
    await this.loginPage.logout();
  }

  async ensureLoggedIn(): Promise<void> {
    if (!(await this.loginPage.isLoggedIn())) {
      await this.login();
    }
  }

  async ensureLoggedOut(): Promise<void> {
    if (await this.loginPage.isLoggedIn()) {
      await this.logout();
    }
  }
}