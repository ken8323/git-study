import { gitConcepts, commonCommands } from "@/lib/knowledge";
import { FolderGit2, TerminalSquare } from "lucide-react";

export default function LearnPage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-8 pt-32 gap-12 sm:p-20">
            <main className="flex flex-col gap-12 w-full max-w-4xl">

                {/* Header Section */}
                <section className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-50">
                        Gitの基礎知識
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        コマンドを打つ前に、Gitがどのようにファイルを管理しているかを知っておきましょう。
                    </p>
                </section>

                {/* Areas Concept Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b pb-2 border-zinc-200 dark:border-zinc-800">
                        <FolderGit2 className="w-6 h-6 text-blue-500" />
                        <h2 className="text-2xl font-bold tracking-tight">4つのデータ保管場所</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {gitConcepts.map((concept) => (
                            <div key={concept.id} className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    {concept.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {concept.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Basic Commands Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b pb-2 border-zinc-200 dark:border-zinc-800">
                        <TerminalSquare className="w-6 h-6 text-emerald-500" />
                        <h2 className="text-2xl font-bold tracking-tight">よく使う基本コマンド</h2>
                    </div>

                    <div className="glass-panel rounded-2xl overflow-hidden">
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {commonCommands.map((item, idx) => (
                                <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <div className="shrink-0 sm:w-1/3">
                                        <code className="bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 px-2 py-1.5 rounded-md font-mono text-sm whitespace-nowrap">
                                            {item.cmd}
                                        </code>
                                    </div>
                                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                        {item.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
