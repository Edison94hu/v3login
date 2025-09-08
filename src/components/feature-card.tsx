import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative bg-card/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1 h-36 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-black/5 after:via-transparent after:to-white/10 after:pointer-events-none dark:after:from-white/5 dark:after:to-black/10">
      <div className="flex flex-col gap-3 h-full relative z-10">
        {title === "标签打印" ? (
          <div className="w-6 h-6 flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-foreground">
              <path 
                d="M3 7a2 2 0 0 1 2-2h11.5a2 2 0 0 1 1.414.586l2.5 2.5A2 2 0 0 1 21 9.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M16 5v4h4" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <circle 
                cx="7" 
                cy="13" 
                r="1.5" 
                fill="currentColor"
              />
              <rect 
                x="10" 
                y="11" 
                width="8" 
                height="1" 
                rx="0.5" 
                fill="currentColor"
              />
              <rect 
                x="10" 
                y="14" 
                width="6" 
                height="1" 
                rx="0.5" 
                fill="currentColor"
              />
            </svg>
          </div>
        ) : (
          <Icon className="w-6 h-6 text-foreground flex-shrink-0" />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-base text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}