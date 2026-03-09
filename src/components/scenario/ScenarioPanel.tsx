"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { Scenario, ScenarioStep } from "@/lib/scenarios";

export function ScenarioPanel({
    scenario,
    currentStep,
    isCompleted
}: {
    scenario: Scenario | null;
    currentStep: ScenarioStep | null;
    isCompleted: boolean;
}) {
    if (!scenario) return null;

    return (
        <div className="glass-panel w-full p-6 text-left flex flex-col gap-4 relative overflow-hidden bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-mono">
                        LESSON
                    </span>
                    {scenario.title}
                </h2>
                {isCompleted && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                        CLEAR!
                    </span>
                )}
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {scenario.description}
            </p>

            <div className="mt-2 flex flex-col gap-3">
                {scenario.steps.map((step) => {
                    // Check if this step is past, current, or future
                    const stepIndex = scenario.steps.findIndex(s => s.id === step.id);
                    const currentIndex = currentStep ? scenario.steps.findIndex(s => s.id === currentStep.id) : scenario.steps.length;

                    const isPast = stepIndex < currentIndex || isCompleted;
                    const isCurrent = stepIndex === currentIndex && !isCompleted;

                    return (
                        <div
                            key={step.id}
                            className={`flex gap-3 text-sm p-3 rounded-lg border transition-all ${isCurrent
                                ? "bg-white dark:bg-zinc-900 border-blue-300 dark:border-blue-700 shadow-sm"
                                : isPast
                                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 opacity-80"
                                    : "bg-zinc-50/50 dark:bg-zinc-900/30 border-transparent opacity-50"
                                }`}
                        >
                            <div className="mt-0.5 shrink-0">
                                {isPast ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : isCurrent ? (
                                    <CircleDashed className="w-5 h-5 text-blue-500 animate-[spin_4s_linear_infinite]" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-medium ${isPast ? "text-emerald-800 dark:text-emerald-300 line-through decoration-emerald-500/30" : isCurrent ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500"}`}>
                                    {step.instruction}
                                </span>
                                {isCurrent && (
                                    <motion.span
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-xs text-zinc-500 font-mono mt-1"
                                    >
                                        ヒント: `{step.expectedCommand}` を試してみてください
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
