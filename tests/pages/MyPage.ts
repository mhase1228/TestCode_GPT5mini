import { Page } from '@playwright/test';

export class MyPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async getHeadingText(): Promise<string> {
    const h = this.page.locator('h1, h2').first();
    return (await h.innerText()).trim();
  }

  async getMemberRank(): Promise<string> {
    const rankEl = this.page.locator('text=プレミアム, text=一般, [data-test="member-rank"]');
    if (await rankEl.count() > 0) return (await rankEl.first().innerText()).trim();
    return '';
  }

  async open() {
    await this.page.goto('/mypage');
  }
}
