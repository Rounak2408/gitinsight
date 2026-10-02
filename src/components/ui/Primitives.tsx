import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertTriangle, CheckCircle2, Info, XCircle, ChevronRight, RefreshCw } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed select-none';
    
    const variants = {
      primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm border border-indigo-500/30 hover:shadow-indigo-500/20 active:scale-[0.98]',
      secondary: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60',
      outline: 'bg-transparent border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200',
      ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
      danger: 'bg-red-600 hover:bg-red-500 text-white shadow-sm active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-5 py-2.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// --- BADGE ---
export const Badge: React.FC<{
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'purple';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ variant = 'default', children, className, onClick }) => {
  const styles = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-800/50',
    info: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200 dark:border-sky-800/50',
    purple: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
  };

  return (
    <span
      onClick={onClick}
      className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border transition-colors', styles[variant], className, onClick && 'cursor-pointer hover:opacity-80')}
    >
      {children}
    </span>
  );
};

// --- TEXTAREA ---
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          'w-full bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all',
          error && 'border-red-500 focus:ring-red-500/40',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
);
Textarea.displayName = 'Textarea';

// --- CARD & METRIC CARD ---
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700',
      onClick && 'cursor-pointer hover:shadow-md active:scale-[0.995]',
      className
    )}
  >
    {children}
  </div>
);

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  badgeText?: string;
  className?: string;
}> = ({ title, value, subtitle, icon, trend, badgeText, className }) => (
  <Card className={cn('relative overflow-hidden group', className)}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
    {(trend || badgeText) && (
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        {trend && (
          <span className={cn('font-medium inline-flex items-center gap-0.5', trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
            {trend.positive ? '+' : ''}{trend.value}
          </span>
        )}
        {badgeText && <Badge variant="purple">{badgeText}</Badge>}
      </div>
    )}
  </Card>
);

// --- INPUT & SEARCH INPUT ---
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; icon?: React.ReactNode }>(
  ({ label, error, icon, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none">{icon}</div>}
        <input
          ref={ref}
          className={cn(
            'w-full bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all',
            icon && 'pl-10',
            error && 'border-red-500 focus:ring-red-500/40',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
);
Input.displayName = 'Input';

// --- PROGRESS RING & PROGRESS BAR ---
export const ProgressRing: React.FC<{
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}> = ({ value, size = 70, strokeWidth = 6, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getColor = (v: number) => {
    if (v >= 85) return '#10b981'; // Emerald
    if (v >= 70) return '#6366f1'; // Indigo
    if (v >= 50) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="inline-flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-800"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">{value}%</span>
      </div>
      {label && <span className="text-xs font-medium text-slate-500 mt-1">{label}</span>}
    </div>
  );
};

export const ProgressBar: React.FC<{ value: number; colorClassName?: string; height?: string }> = ({
  value,
  colorClassName = 'bg-indigo-600 dark:bg-indigo-500',
  height = 'h-2',
}) => (
  <div className={cn('w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden', height)}>
    <div
      className={cn('h-full transition-all duration-700 ease-out rounded-full', colorClassName)}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// --- SKELETON ---
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse bg-slate-200 dark:bg-slate-800/80 rounded-lg', className)} />
);

// --- EMPTY & ERROR STATES ---
export const EmptyState: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, description, icon, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
    <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">{icon || <Info className="w-8 h-8" />}</div>
    <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6">{description}</p>
    {action}
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  message: string;
  onRetry?: () => void;
}> = ({ title = 'Failed to load data', message, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/20">
    <XCircle className="w-10 h-10 text-rose-500 mb-3" />
    <h3 className="text-sm font-semibold text-rose-900 dark:text-rose-200">{title}</h3>
    <p className="text-xs text-rose-700 dark:text-rose-400 max-w-md mt-1 mb-4">{message}</p>
    {onRetry && (
      <Button variant="danger" size="sm" onClick={onRetry} icon={<RefreshCw className="w-3.5 h-3.5" />}>
        Try Again
      </Button>
    )}
  </div>
);

// --- MATCH INDICATOR ---
export const MatchIndicator: React.FC<{ score: number }> = ({ score }) => {
  let color = 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60';
  if (score < 75) color = 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60';
  if (score < 50) color = 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60';

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border', color)}>
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      {score}% Match
    </div>
  );
};
