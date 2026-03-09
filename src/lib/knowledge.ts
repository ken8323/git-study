export type Concept = {
    id: string;
    title: string;
    description: string;
    icon?: string;
};

export const gitConcepts: Concept[] = [
    {
        id: "working-tree",
        title: "ワーキングツリー (Working Tree)",
        description: "現在作業しているディレクトリそのものです。ここでファイルを編集したり、新しく作成したりします。",
    },
    {
        id: "index",
        title: "インデックス (Index / Staging Area)",
        description: "コミットする準備ができた変更を一時的に保存しておく場所（ステージングエリア）です。`git add`コマンドでここに変更を登録します。",
    },
    {
        id: "local-repo",
        title: "ローカルリポジトリ (Local Repository)",
        description: "自分のPC上にある、変更履歴（コミット）が保存される場所です。`.git` フォルダの中にデータが格納されています。",
    },
    {
        id: "remote-repo",
        title: "リモートリポジトリ (Remote Repository)",
        description: "GitHubのように、インターネット等を通じて共有されるリポジトリです。チーム開発でコードを共有するのに使います。",
    }
];

export const commonCommands = [
    { cmd: "git init", desc: "現在のディレクトリに新しいGitリポジトリ（.gitフォルダ）を作成します。" },
    { cmd: "git status", desc: "現在のリポジトリの状態（変更されたファイルや、コミット待ちのファイルなど）を確認します。" },
    { cmd: "git add <file>", desc: "ファイルの変更をインデックス（コミットの準備領域）に追加します。" },
    { cmd: "git add .", desc: "現在のディレクトリ以下のすべての変更をインデックスに追加します。" },
    { cmd: "git commit -m \"message\"", desc: "インデックスに追加された変更を、メッセージと共にローカルリポジトリに記録します。" },
    { cmd: "git log", desc: "これまでのコミット履歴を確認します。" }
];
