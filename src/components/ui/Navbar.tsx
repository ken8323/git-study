import Link from "next/link";
import { Terminal, LayoutDashboard, BookOpen } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-white/60 dark:bg-zinc-950/60 shadow-sm px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <Terminal className="w-6 h-6" />
                Git Study
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <Link href="/learn" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    学ぶ (学び)
                </Link>
                <Link href="/dashboard" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    ダッシュボード
                </Link>
            </div>
        </nav>
    );
}
