interface PasswordStrengthBarProps {
  password: string;
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const calculateStrength = (pwd: string): number => {
    let score = 0;
    
    // Length check
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    return Math.min(score, 4);
  };

  const getStrengthInfo = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { label: '弱', color: 'bg-destructive', textColor: 'text-destructive' };
      case 2:
        return { label: '一般', color: 'bg-warning-main', textColor: 'text-warning-main' };
      case 3:
        return { label: '良好', color: 'bg-primary', textColor: 'text-primary' };
      case 4:
        return { label: '强', color: 'bg-accent-ok', textColor: 'text-accent-ok' };
      default:
        return { label: '弱', color: 'bg-muted', textColor: 'text-muted-foreground' };
    }
  };

  const strength = calculateStrength(password);
  const { label, color, textColor } = getStrengthInfo(strength);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index < strength ? color : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${textColor}`}>
        密码强度：{label}
      </p>
    </div>
  );
}