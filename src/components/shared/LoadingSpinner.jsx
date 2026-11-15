import { Loader2 } from 'lucide-react';

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default function LoadingSpinner({ size = 'md', message = '' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2
        className={`${sizeMap[size] || sizeMap.md} text-indigo-400 animate-spin`}
      />
      {message && (
        <p className="text-slate-400 text-lg font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
