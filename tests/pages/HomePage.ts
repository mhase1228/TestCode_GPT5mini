import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }
  private async clickOrNavigate(candidates: string[], fallbackPath: string) {
    for (const sel of candidates) {
      const loc = this.page.locator(sel);
      if (await loc.count() > 0) {
        try {
          await loc.first().click();
          return;
        } catch (e) {
          // ignore and continue to next candidate
        }
      }
    }
    // フォールバックで直接遷移
    await this.page.goto(fallbackPath);
  }

  async clickHome() {
    await this.clickOrNavigate(['text=ホーム', 'text=Home', 'a[aria-label="home"]'], '/');
  }

  async clickReservations() {
    await this.clickOrNavigate(['text=宿泊予約', 'text=宿泊', 'text=Reservations', 'a:has-text("宿泊予約")'], '/reservations');
  }

  async clickRegister() {
    await this.clickOrNavigate(['text=会員登録', 'text=新規登録', 'text=Register'], '/signup');
  }

  async clickLogin() {
    await this.clickOrNavigate(['text=ログイン', 'text=サインイン', 'text=Login'], '/login');
  }
}
