import { Page } from '@playwright/test';

export class ReservationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/reservations');
  }

  async selectPlan(planText: string) {
    await this.page.click(`text=${planText}`);
  }

  async fillReservationDetails({
    date = '',
    nights = '1',
    guests = '1'
  }: { date?: string; nights?: string; guests?: string }) {
    if (date) await this.page.fill('input[type="date"]', date).catch(() => {});
    await this.page.fill('input[name="nights"]', nights).catch(() => {});
    await this.page.fill('input[name="guests"]', guests).catch(() => {});
  }

  async getTotal(): Promise<string> {
    // 合計金額を示す要素を推定して取得
    const locatorCandidates = [
      'text=合計',
      '[data-test="total-price"]',
      '.total-price'
    ];
    for (const sel of locatorCandidates) {
      const el = this.page.locator(sel);
      if (await el.count() > 0) return (await el.first().innerText()).trim();
    }
    return '';
  }

  async confirmReservation() {
    await this.page.click('button:has-text("予約確認")').catch(() => {});
    await this.page.click('button:has-text("予約確定")').catch(() => {});
  }
}
