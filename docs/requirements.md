# Git Study App: 要件定義・開発計画 (Requirements & Development Plan)

## 1. アプリ概要 (Overview)
Gitのコマンドや概念を、直感的に操作しながら学べるインタラクティブな学習アプリケーション。
プロジェクトの基本方針（Appleのような洗練されたデザイン、NotionのようなクリーンなUI、グラスモーフィズム等の採用）に基づき、初心者にも分かりやすく、触っていて心地よいUI/UXを目指します。

## 2. コア機能 (Core Features)

1. **インタラクティブ・ターミナル (Interactive Terminal)**
   - ブラウザ上で動作する仮想ターミナル。
   - `git init`, `git add`, `git commit`, `git branch` などの基本コマンドを実際に入力・実行可能。

2. **ビジュアル・コミットグラフ (Visual Commit Graph)**
   - ターミナルでの操作に連動して、リアルタイムにブランチやコミットの履歴が描画される機能。
   - 抽象的なGitの概念（ツリー構造、HEADの移動など）を視覚的に理解させます。

3. **シナリオベース学習 (Scenario-based Lessons)**
   - 「初めてのコミット」「ブランチを切ってみよう」「コンフリクトの解消」といったステップバイステップの課題（シナリオ）を用意。
   - ユーザーが正しいコマンドを入力すると次のステップへ進む仕組み。

4. **Gitの基礎学習・ナレッジベース (Git Basics Knowledge Base)**
   - ディレクトリ構成（ワーキングツリー、インデックス、ローカルリポジトリ、リモート）の解説。
   - よく使われる用語集（コミット、プッシュ、プル、フェッチ、マージ、コンフリクトなど）のわかりやすい説明。
   - コマンド操作だけでなく、仕組み（「今、ファイルがどこにあるのか」）を理解できるような図解や解説ページを用意。

5. **学習進捗トラッキング (Progress Tracking)**
   - 各シナリオの達成状況や、学習コンテンツの閲覧状況を保存し、ダッシュボードで確認できる機能。

## 3. 技術スタック (Tech Stack)

*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4 (Glassmorphism, タイポグラフィ重視)
*   **Animation:** Framer Motion (ターミナルの文字入力アニメーション、グラフの滑らかな描画など)
*   **Icons:** Lucide React
*   **State Management:** React Context / Zustand (仮想ファイルシステムやGit履歴の管理用)

## 4. 開発フェーズ (Development Phases)

### Phase 1: 基盤構築・UIデザイン案作成 (Foundation & UI System)
*   Next.jsプロジェクトの初期化 (`git-study` ディレクトリ内)。
*   Tailwind CSS (Glassmorphism用トークン設定) と Framer Motionのセットアップ。
*   全体レイアウト、ナビゲーション、ダッシュボードのモックアップ作成。

### Phase 2: コアシミュレータ開発 (Core Simulation Engine)
*   Gitコマンドをパースし、仮想のリポジトリ状態（コミット履歴、ブランチ構造）を更新するロジックの実装。

### Phase 3: インタラクティブUIの実装 (Interactive Terminal & Visualizer)
*   仮想ターミナルUIコンポーネントの実装。
*   仮想リポジトリの状態を元に、ノードとエッジでコミット履歴を描画するグラフコンポーネントの実装。

### Phase 4: コンテンツ作成・ブラッシュアップ (Content & Polish)
*   学習シナリオデータの作成と組み込み。
*   マイクロインタラクション（ホバー効果、画面遷移時のアニメーション）の追加と全体的なデザインの調整（Visual Polish）。
