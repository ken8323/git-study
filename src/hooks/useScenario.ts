import { useState } from 'react';
import { scenarios, Scenario } from '@/lib/scenarios';

export function useScenario() {
    const [currentScenario] = useState<Scenario | null>(scenarios[0]); // Default to first scenario
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const currentStep = currentScenario ? currentScenario.steps[currentStepIndex] : null;

    const checkCommand = (command: string) => {
        if (!currentStep || isCompleted) return false;

        // Direct match or regex match
        const isRegex = currentStep.expectedCommand.startsWith('^');
        const isMatch = isRegex
            ? new RegExp(currentStep.expectedCommand).test(command.trim())
            : currentStep.expectedCommand === command.trim();

        if (isMatch) {
            if (currentScenario && currentStepIndex < currentScenario.steps.length - 1) {
                // Move to next step
                setCurrentStepIndex(prev => prev + 1);
            } else {
                // Scenario completed
                setIsCompleted(true);
            }
            return true;
        }

        return false;
    };

    const resetScenario = () => {
        setCurrentStepIndex(0);
        setIsCompleted(false);
    };

    return {
        currentScenario,
        currentStep,
        currentStepIndex,
        isCompleted,
        checkCommand,
        resetScenario
    };
}
