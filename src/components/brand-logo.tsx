import { Shield } from "lucide-react";

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center">
        <Shield className="w-6 h-6 text-primary" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-foreground leading-none">危司通</h1>
        <p className="text-sm text-muted-foreground leading-none mt-1">WastePass</p>
      </div>
    </div>
  );
}