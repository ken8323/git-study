"use client";

import { motion } from "framer-motion";

export type CommitNode = {
    id: string; // e.g. "a1b2c3d"
    message: string;
    branch: string;
    parents: string[]; // parent commit ids
};

export function GitGraph({ commits, activeBranch }: { commits: CommitNode[], activeBranch: string }) {
    return (
        <div className="w-full glass-panel rounded-xl p-6 min-h-[300px] flex items-center justify-center relative overflow-hidden bg-white/50 dark:bg-zinc-900/50">
            {commits.length === 0 ? (
                <div className="text-zinc-500 text-sm font-medium">No commits yet. Try "git commit".</div>
            ) : (
                <div className="relative flex flex-col gap-8 w-full items-center">
                    {/* Simple vertical graph representation for MVP */}
                    {commits.map((commit, index) => (
                        <motion.div
                            key={commit.id}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative flex items-center w-full justify-center group"
                        >
                            {/* Connection line to parent */}
                            {index < commits.length - 1 && (
                                <div className="absolute top-10 left-1/2 w-0.5 h-12 bg-zinc-300 dark:bg-zinc-700 -translate-x-1/2 z-0" />
                            )}

                            <div className="flex items-center gap-4 z-10 relative bg-white dark:bg-black p-3 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-md">
                                <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                                <div className="flex flex-col items-start pr-4">
                                    <span className="text-xs font-mono text-zinc-500">{commit.id.substring(0, 7)}</span>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{commit.message}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
