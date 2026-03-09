"use client";

import { TerminalSim } from "@/components/terminal/TerminalSim";
import { GitGraph } from "@/components/graph/GitGraph";
import { ScenarioPanel } from "@/components/scenario/ScenarioPanel";
import { useTerminal } from "@/hooks/useTerminal";
import { useScenario } from "@/hooks/useScenario";

export default function Home() {
  const { history, cwd, executeCommand, appendSystemMessage, commits, branch } = useTerminal();
  const { currentScenario, currentStep, isCompleted, checkCommand } = useScenario();

  const handleCommand = (cmd: string) => {
    // 1. Execute the git logic
    executeCommand(cmd);

    // 2. Check if it matches the current learning scenario
    if (!isCompleted && currentStep) {
      const isMatch = checkCommand(cmd);
      if (isMatch) {
        appendSystemMessage(`\n✅ ${currentStep.successMessage}\n`, 'success');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 pt-24 gap-8 sm:p-20">
      <main className="flex flex-col items-center gap-8 w-full max-w-6xl text-center">

        {/* Scenario Progress Panel at the top */}
        <ScenarioPanel
          scenario={currentScenario}
          currentStep={currentStep}
          isCompleted={isCompleted}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <TerminalSim history={history} cwd={cwd} executeCommand={handleCommand} />

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
