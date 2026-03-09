"use client";

import { TerminalSim } from "@/components/terminal/TerminalSim";
import { GitGraph } from "@/components/graph/GitGraph";
import { useTerminal } from "@/hooks/useTerminal";

export default function Home() {
  const { history, cwd, executeCommand, commits, branch } = useTerminal();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 pt-32 gap-12 sm:p-20">
      <main className="flex flex-col items-center gap-6 w-full max-w-6xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-900 dark:text-zinc-50 drop-shadow-sm">
          Gitを視覚的にマスターする
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-4">
          ブラウザ上のターミナルで実際にコマンドを打ちながら、Gitの仕組みをリアルタイムなグラフで学べるインタラクティブな学習アプリです。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <TerminalSim history={history} cwd={cwd} executeCommand={executeCommand} />

          <div className="flex flex-col gap-4">
            <div className="glass-panel px-4 py-2 rounded-xl text-left bg-zinc-950/80 dark:bg-zinc-950/80 border-b border-zinc-800 flex justify-between">
              <span className="text-sm font-semibold text-zinc-300">リアルタイムグラフ</span>
              <span className="text-sm font-mono text-zinc-500">HEAD &rarr; {branch}</span>
            </div>
            <GitGraph commits={commits} activeBranch={branch} />
          </div>
        </div>

      </main>
    </div>
  );
}
