export type ScenarioStep = {
    id: string;
    instruction: string;
    expectedCommand: string; // Basic exact match or regex string for simplicity
    successMessage: string;
};

export type Scenario = {
    id: string;
    title: string;
    description: string;
    steps: ScenarioStep[];
};

export const scenarios: Scenario[] = [
    {
        id: "basics-1",
        title: "初めてのリポジトリ作成",
        description: "Gitのバージョン管理を始める第一歩として、リポジトリを初期化してみましょう。まずは 'git init' からスタートです。",
        steps: [
            {
                id: "step-1",
                instruction: "リポジトリを初期化するコマンドを入力してください。",
                expectedCommand: "git init",
                successMessage: "素晴らしい！空のGitリポジトリが作成され、ファイル変更の追跡が始まります。",
            },
            {
                id: "step-2",
                instruction: "現在のリポジトリの状態を確認してみましょう。",
                expectedCommand: "git status",
                successMessage: "ステータスの確認はとても重要です。今はまだ何もコミットされていませんね。",
            },
            {
                id: "step-3",
                instruction: "変更を保存するために、最初のコミットを作成してください。（例: git commit -m \"first commit\"）",
                expectedCommand: "^git commit -m .*", // Simple regex simulation for matching
                successMessage: "おめでとうございます！最初のコミットが作成されました。グラフにも反映されているはずです。",
            }
        ]
    }
];
