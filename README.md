# Todoリスト

Next.js App Router を使ったシンプルなTodoアプリです。

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

## 概要

サーバーサイドで動作する Next.js の Server Actions を活用した、シンプルで軽量なタスク管理アプリです。外部データベース不要で、JSON ファイルにデータを永続化します。

## 機能

- **タスクの追加** — フォームからタスクを入力して追加
- **完了 / 未完了の切り替え** — チェックボックスで完了状態をトグル
- **タスクの削除** — ホバーで表示される削除ボタンからタスクを削除
- **進捗バー** — 完了数 / 全体数を視覚的に表示

## スクリーンショット

| 状態 | 説明 |
|------|------|
| 通常 | タスク一覧と進捗バーを表示 |
| 空 | タスクがない場合の案内メッセージを表示 |

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フレームワーク | [Next.js 16](https://nextjs.org/) (App Router) |
| UI ライブラリ | [React 19](https://react.dev/) |
| 言語 | [TypeScript 5](https://www.typescriptlang.org/) |
| スタイリング | [Tailwind CSS 4](https://tailwindcss.com/) |
| データ永続化 | JSON ファイル (`data/todos.json`) |
| データ操作 | Server Actions |

## ディレクトリ構成

```
nextjs-todo/
├── app/
│   ├── actions.ts           # Server Actions（追加・切替・削除）
│   ├── layout.tsx           # ルートレイアウト・メタデータ
│   ├── page.tsx             # メインページ（Server Component）
│   ├── globals.css          # グローバルスタイル（Tailwind CSS）
│   └── components/
│       └── TodoItem.tsx     # Todoアイテム（Client Component）
├── data/
│   └── todos.json           # データ永続化ファイル
├── public/                  # 静的アセット
├── next.config.ts           # Next.js 設定
├── tailwind.config.*        # Tailwind CSS 設定
├── tsconfig.json            # TypeScript 設定
└── package.json
```

## セットアップ

### 必要な環境

- Node.js 18.17 以上
- npm / yarn / pnpm

### インストールと起動

```bash
# リポジトリをクローン
git clone <repo-url>
cd nextjs-todo

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルド |
| `npm start` | 本番サーバーを起動 |
| `npm run lint` | ESLint によるコードチェック |

## データ構造

```typescript
type Todo = {
  id: string        // crypto.randomUUID() で生成
  text: string      // タスクのテキスト
  completed: boolean // 完了状態
  createdAt: string  // 作成日時（ISO 8601）
}
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

| ファイル | 種別 | 役割 |
|----------|------|------|
| `page.tsx` | Server Component | データ取得・ページレンダリング |
| `TodoItem.tsx` | Client Component | ユーザー操作（チェック・削除） |

## ライセンス

MIT
