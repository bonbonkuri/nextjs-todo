# Todoリスト

Next.js App Router を使ったシンプルなTodoアプリです。

## 技術スタック

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Server Actions** — フォーム送信・データ操作
- **JSONファイル** — データの永続化

## 機能

- タスクの追加
- タスクの完了 / 未完了の切り替え
- タスクの削除
- 進捗バー（完了数 / 全体数）

## ディレクトリ構成

```
nextjs-todo/
├── app/
│   ├── actions.ts           # Server Actions（追加・切替・削除）
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # メインページ（Server Component）
│   ├── globals.css
│   └── components/
│       └── TodoItem.tsx     # Todoアイテム（Client Component）
└── data/
    └── todos.json           # データ永続化
```

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

```bash
npm run build
npm start
```

## 実装のポイント

### Server Actions

データの変更（追加・完了切替・削除）はすべて Server Actions で処理します。クライアント側に API ルートは不要です。

```ts
// app/actions.ts
'use server'
export async function addTodo(formData: FormData) {
  // サーバー側でデータを更新
  revalidatePath('/')
}
```

### Server Component と Client Component の分離

- `page.tsx` — データ取得を行う Server Component
- `TodoItem.tsx` — ユーザー操作を受け付ける Client Component (`'use client'`)
