import { Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/signup');
  }

  async register(name: string, email: string, password: string) {
    // 試行的に複数のセレクタを試す
    const nameSelectors = ['input[name="name"]', 'input[id*="name"]', 'input[placeholder*="名前"]'];
    const emailSelectors = ['input[type="email"]', 'input[name="email"]', 'input[id*="email"]'];
    const passSelectors = ['input[name="password"]', 'input[type="password"]', 'input[id*="password"]'];
    const passConfirmSelectors = ['input[name="passwordConfirm"]', 'input[name="password_confirmation"]', 'input[placeholder*="確認"]'];

    const tryFill = async (selectors: string[], value: string) => {
      for (const sel of selectors) {
        const loc = this.page.locator(sel);
        if (await loc.count() > 0) {
          try {
            await loc.first().fill(value);
            return true;
          } catch (e) {
            // continue
          }
        }
      }
      return false;
    };

    // 名前
    await tryFill(nameSelectors, name);
    // メール
    let ok = await tryFill(emailSelectors, email);
    if (!ok) {
      await this.page.goto('/signup');
      await tryFill(emailSelectors, email);
    }
    // パスワード
    await tryFill(passSelectors, password);
    await tryFill(passConfirmSelectors, password);

    const btn = this.page.locator('button:has-text("登録"), button:has-text("Sign up"), button:has-text("登録する")');
    if (await btn.count() > 0) {
      await btn.first().click();
    } else {
      await this.page.keyboard.press('Enter');
    }
  }
}
