export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }: { size?: 'sm' | 'md' | 'lg', text?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-white/20 border-t-white/60 rounded-full animate-spin`}></div>
        
        {/* Inner glow */}
        <div className={`${sizeClasses[size]} absolute inset-0 border-4 border-transparent border-t-portfolio-red-500/40 rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-r from-portfolio-red-500 to-portfolio-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {text && (
        <p className="text-white/70 text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="glass-panel p-12 rounded-3xl">
        <LoadingSpinner size="lg" text="Loading Portfolio..." />
      </div>
    </div>
  );
};

export const SkeletonLoader = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-white/10 rounded-lg h-4 mb-2"></div>
      <div className="bg-white/10 rounded-lg h-4 mb-2 w-3/4"></div>
      <div className="bg-white/10 rounded-lg h-4 w-1/2"></div>
    </div>
  );
}; 