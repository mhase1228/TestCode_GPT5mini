# HOTEL PLANISPHERE - Playwright テスト

このフォルダは `test-plan-GPT5mini.md` を基にした Playwright のスモークテストです。ページオブジェクトデザインで実装しています。

準備と実行（macOS, zsh）:

```bash
# 依存をインストール
npm install

# テストを実行
npx playwright test

# ヘッドフルで確認する場合
npx playwright test --headed
```

注意: テストは学習用のサンプルサイト向けの推定セレクタを使っています。実サイトの DOM に合わせてセレクタを調整してください。
