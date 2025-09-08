interface StepperProps {
  currentStep: number;
  steps: string[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step Circle */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            index < currentStep 
              ? 'bg-primary text-primary-foreground' 
              : index === currentStep
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}>
            {index + 1}
          </div>
          
          {/* Step Label */}
          <span className={`ml-2 text-sm font-medium ${
            index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {step}
          </span>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={`flex-1 h-px mx-4 ${
              index < currentStep ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}