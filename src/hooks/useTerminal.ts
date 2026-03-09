import { useState } from 'react';

export type OutputLine = {
    id: string;
    type: 'input' | 'output' | 'error';
    content: string;
};

export function useTerminal() {
    const [history, setHistory] = useState<OutputLine[]>([]);
    const [cwd, setCwd] = useState('~/git-study');

    const [commits, setCommits] = useState<{ id: string, message: string, branch: string, parents: string[] }[]>([]);
    const [branch, setBranch] = useState('main');

    const executeCommand = (command: string) => {
        // Add the input to history
        setHistory(prev => [...prev, { id: crypto.randomUUID(), type: 'input', content: `${cwd} % ${command}` }]);

        const args = command.trim().split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/); // split by space but keep quoted strings
        const cmd = args[0];

        // Dummy logic for now
        let output = '';
        let isError = false;

        if (cmd === 'git') {
            const subCmd = args[1];
            if (subCmd === 'init') {
                output = `空のGitリポジトリを初期化しました: ${cwd}/.git/`;
            } else if (subCmd === 'status') {
                output = `現在のブランチ: ${branch}\nまだコミットはありません\nコミットするものがありません (ファイルを作成して "git add" で追跡してください)`;
            } else if (subCmd === 'commit') {
                const msgIndex = args.indexOf('-m');
                let msg = '更新';
                if (msgIndex !== -1 && args[msgIndex + 1]) {
                    msg = args[msgIndex + 1].replace(/"/g, '');
                }
                const newCommitId = Math.random().toString(16).substring(2, 9);
                const parents = commits.length > 0 ? [commits[commits.length - 1].id] : [];
                setCommits(prev => [{ id: newCommitId, message: msg, branch, parents }, ...prev]); // Prepend so latest is top
                output = `[${branch} ${newCommitId}] ${msg}\n 1 file changed, 1 insertion(+)`;
            } else {
                output = `git: '${subCmd}' はgitコマンドではありません。 'git --help' を参照してください。`;
                isError = true;
            }
        } else if (cmd === 'clear') {
            setHistory([]);
            return;
        } else if (cmd !== '') {
            output = `zsh: コマンドが見つかりません: ${cmd}`;
            isError = true;
        }

        if (output) {
            setHistory(prev => [...prev, {
                id: crypto.randomUUID(),
                type: isError ? 'error' : 'output',
                content: output
            }]);
        }
    };

    const appendSystemMessage = (message: string, type: 'output' | 'error' | 'success' = 'output') => {
        setHistory(prev => [...prev, {
            id: crypto.randomUUID(),
            type: type as any,
            content: message
        }]);
    };

    const clear = () => setHistory([]);

    return { history, cwd, executeCommand, appendSystemMessage, clear, commits, branch };
}
