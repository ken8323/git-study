import { useState, useEffect } from 'react';
import { scenarios, Scenario } from '@/lib/scenarios';

export function useScenario() {
    const [currentScenario] = useState<Scenario | null>(scenarios[0]); // Default to first scenario
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        let savedStepIndex = 0;
        let savedIsCompleted = false;

        try {
            const savedState = localStorage.getItem('git-study-progress');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                if (currentScenario && parsed[currentScenario.id]) {
                    savedStepIndex = parsed[currentScenario.id].stepIndex || 0;
                    savedIsCompleted = parsed[currentScenario.id].isCompleted || false;
                }
            }
        } catch (error) {
            console.error('Failed to load progress from localStorage', error);
        }

        const timeoutId = setTimeout(() => {
            setCurrentStepIndex(savedStepIndex);
            setIsCompleted(savedIsCompleted);
            setIsLoaded(true);
        }, 0);
        return () => clearTimeout(timeoutId);
    }, [currentScenario]);

    // Save state whenever it changes (after initial load)
    useEffect(() => {
        if (!isLoaded || !currentScenario) return;

        try {
            const savedState = localStorage.getItem('git-study-progress');
            const parsed = savedState ? JSON.parse(savedState) : {};

            parsed[currentScenario.id] = {
                stepIndex: currentStepIndex,
                isCompleted: isCompleted,
                lastUpdated: new Date().toISOString()
            };

            localStorage.setItem('git-study-progress', JSON.stringify(parsed));
        } catch (error) {
            console.error('Failed to save progress to localStorage', error);
        }
    }, [currentStepIndex, isCompleted, currentScenario, isLoaded]);

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
        isLoaded,
        checkCommand,
        resetScenario
    };
}
