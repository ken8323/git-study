"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Trophy, Clock, PlayCircle } from "lucide-react";
import { scenarios } from "@/lib/scenarios";
import Link from "next/link";

type ProgressData = {
    [scenarioId: string]: {
        stepIndex: number;
        isCompleted: boolean;
        lastUpdated: string;
    };
};

export default function DashboardPage() {
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let savedProgress: ProgressData | null = null;
        try {
            const saved = localStorage.getItem("git-study-progress");
            if (saved) {
                savedProgress = JSON.parse(saved);
            }
        } catch (e) {
            console.error("Failed to load progress", e);
        }

        // Defer setting state slightly to avoid sync rendering cascade warning
        const timeout = setTimeout(() => {
            setProgress(savedProgress);
            setMounted(true);
        }, 0);
        return () => clearTimeout(timeout);
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch

    const completedCount = scenarios.filter(s => progress?.[s.id]?.isCompleted).length;
    const totalScenarios = scenarios.length;
    const progressPercentage = Math.round((completedCount / totalScenarios) * 100) || 0;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-8 pt-32 gap-12 sm:p-20">
            <main className="flex flex-col gap-8 w-full max-w-4xl">

                {/* Header Section */}
                <section className="text-left space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                        ダッシュボード
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        あなたの学習進捗と実績を確認できます。
                    </p>
                </section>

                {/* Stats Overview */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">達成度</span>
                        <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
                            {progressPercentage}%
                        </div>
                        <div className="w-full bg-emerald-200/50 dark:bg-emerald-900/50 h-2 rounded-full overflow-hidden mt-2">
                            <div
                                className="bg-emerald-500 h-full transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">クリアした課題</span>
                        <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-baseline gap-1">
                            {completedCount} <span className="text-lg text-zinc-400 font-normal">/ {totalScenarios}</span>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">学習スコア</span>
                        <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
                            {completedCount * 100}
                        </div>
                    </div>
                </section>

                {/* Scenario List */}
                <section className="space-y-4 mt-8">
                    <h2 className="text-2xl font-bold tracking-tight border-b pb-2 border-zinc-200 dark:border-zinc-800">
                        課題リスト
                    </h2>

                    <div className="flex flex-col gap-4">
                        {scenarios.map((scenario) => {
                            const data = progress?.[scenario.id];
                            const isCompleted = data?.isCompleted;
                            const stepIndex = data?.stepIndex || 0;
                            const totalSteps = scenario.steps.length;

                            const isStarted = !isCompleted && stepIndex > 0;

                            return (
                                <div key={scenario.id} className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <div className="flex gap-4 items-start">
                                        <div className="shrink-0 mt-1">
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                            ) : isStarted ? (
                                                <Clock className="w-8 h-8 text-blue-500" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                                {scenario.title}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                                                {scenario.description}
                                            </p>

                                            <div className="flex items-center gap-2 mt-3 text-xs font-mono">
                                                <span className={`px-2 py-1 rounded-full ${isCompleted ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : isStarted ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                                                    {isCompleted ? 'クリア済' : isStarted ? `進行中 (${stepIndex}/${totalSteps})` : '未着手'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link href="/" className="shrink-0 w-full sm:w-auto">
                                        <button className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold transition-all flex items-center justify-center gap-2">
                                            <PlayCircle className="w-4 h-4" />
                                            {isCompleted ? 'もう一度' : isStarted ? '再開する' : 'はじめる'}
                                        </button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </main>
        </div>
    );
}
