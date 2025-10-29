import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private async fillIfExists(selectors: string[], value: string) {
    for (const sel of selectors) {
      const loc = this.page.locator(sel);
      if (await loc.count() > 0) {
        try {
          await loc.fill(value);
          return true;
        } catch (e) {
          // continue
        }
      }
    }
    return false;
  }

  async login(email: string, password: string) {
    // try to fill via common selectors; if not found, navigate directly and try again
    const emailSelectors = ['input[type="email"]', 'input[name="email"]', 'input[id*="email"]'];
    const passSelectors = ['input[type="password"]', 'input[name="password"]', 'input[id*="password"]'];

    let filled = await this.fillIfExists(emailSelectors, email);
    if (!filled) {
      await this.page.goto('/login');
      await this.fillIfExists(emailSelectors, email);
    }

    await this.fillIfExists(passSelectors, password);

    const btnCandidates = ['button:has-text("ログイン")', 'button:has-text("サインイン")', 'button:has-text("Login")'];
    for (const b of btnCandidates) {
      const loc = this.page.locator(b);
      if (await loc.count() > 0) {
        await loc.first().click();
        return;
      }
    }
    // fallback: submit form
    await this.page.keyboard.press('Enter');
  }

  async open() {
    await this.page.goto('/login');
  }
}
