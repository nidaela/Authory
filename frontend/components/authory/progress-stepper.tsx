export const evidenceProgressSteps = [
  "Archivo recibido",
  "Hash generado",
  "Registro preparado",
  "Evidencia creada",
] as const;

export interface ProgressStepperProps {
  currentStep?: number;
  steps?: readonly string[];
  className?: string;
}

export function ProgressStepper({
  currentStep = 1,
  steps = evidenceProgressSteps,
  className = "",
}: ProgressStepperProps) {
  return (
    <ol className={`grid gap-0 sm:grid-cols-4 ${className}`}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const stateClass = isCurrent
          ? "bg-cyan"
          : isComplete
            ? "bg-success"
            : "bg-white";

        return (
          <li
            key={`${stepNumber}-${step}`}
            aria-current={isCurrent ? "step" : undefined}
            className={`flex min-h-20 items-center gap-3 border-2 border-border p-3 sm:-ml-0.5 sm:flex-col sm:items-start ${stateClass}`}
          >
            <span className="flex size-7 shrink-0 items-center justify-center border-2 border-border bg-white font-ui text-[11px] font-bold">
              {String(stepNumber).padStart(2, "0")}
            </span>
            <span className="font-ui text-[11px] font-semibold leading-5 text-ink">{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
