"use client";

import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

type OutputLine = {
    id: string;
    type: 'input' | 'output' | 'error' | 'success';
    content: string;
};

export function TerminalSim({
    history,
    cwd,
    executeCommand
}: {
    history: OutputLine[];
    cwd: string;
    executeCommand: (cmd: string) => void;
}) {
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="text-left w-full max-w-3xl glass-panel rounded-xl overflow-hidden font-mono text-sm bg-zinc-950/80 dark:bg-zinc-950/80 text-zinc-300 shadow-2xl relative"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex items-center px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs text-zinc-500 font-sans font-medium">~/git-study — zsh</div>
            </div>

            <div className="p-4 h-[400px] overflow-y-auto">
                <div className="space-y-1 mb-2">
                    {history.map((line) => (
                        <div key={line.id} className={`${line.type === 'error' ? 'text-red-400' :
                            line.type === 'success' ? 'text-emerald-400 font-bold' :
                                line.type === 'input' ? 'text-white' : 'text-zinc-400'
                            } whitespace-pre-wrap break-all`}>
                            {line.content}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-white">
                    <span className="shrink-0 text-emerald-400">{cwd} %</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none border-none ring-0 p-0 m-0"
                        autoFocus
                        spellCheck={false}
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
