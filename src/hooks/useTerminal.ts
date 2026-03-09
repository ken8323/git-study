import { useState } from 'react';

export type OutputLine = {
    id: string;
    type: 'input' | 'output' | 'error' | 'success';
    content: string;
};

export function useTerminal() {
    const [history, setHistory] = useState<OutputLine[]>([]);
    const [cwd] = useState('~/git-study');

    const [commits, setCommits] = useState<{ id: string, message: string, branch: string, parents: string[] }[]>([]);
    const [branch] = useState('main');

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
                output = `Initialized empty Git repository in ${cwd}/.git/`;
            } else if (subCmd === 'status') {
                output = `On branch ${branch}\nNo commits yet\n\nnothing to commit (create/copy files and use "git add" to track)`;
            } else if (subCmd === 'commit') {
                const msgIndex = args.indexOf('-m');
                let msg = 'Update';
                if (msgIndex !== -1 && args[msgIndex + 1]) {
                    msg = args[msgIndex + 1].replace(/"/g, '');
                }
                const newCommitId = Math.random().toString(16).substring(2, 9);
                const parents = commits.length > 0 ? [commits[commits.length - 1].id] : [];
                setCommits(prev => [{ id: newCommitId, message: msg, branch, parents }, ...prev]); // Prepend so latest is top
                output = `[${branch} (root-commit) ${newCommitId}] ${msg}\n 1 file changed, 1 insertion(+)`;
            } else {
                output = `git: '${subCmd}' is not a git command. See 'git --help'.`;
                isError = true;
            }
        } else if (cmd === 'clear') {
            setHistory([]);
            return;
        } else if (cmd !== '') {
            output = `zsh: command not found: ${cmd}`;
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

    const appendSystemMessage = (message: string, type: 'output' | 'error' | 'success' | 'input' = 'output') => {
        setHistory(prev => [...prev, {
            id: crypto.randomUUID(),
            type,
            content: message
        }]);
    };

    const clear = () => setHistory([]);

    return { history, cwd, executeCommand, appendSystemMessage, clear, commits, branch };
}
