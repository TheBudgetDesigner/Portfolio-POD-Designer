import { useEffect, useState } from 'react';

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  });

  useEffect(() => {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: 'FCP',
            value: Math.round(fcp.startTime)
          });
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: 'LCP',
            value: Math.round(lcp.startTime)
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: 'FID',
            value: Math.round(fid.processingStart - fid.startTime)
          });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000) / 1000
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: 'TTFB',
            value: Math.round(ttfb)
          });
        }
      }

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  // Track user interactions
  useEffect(() => {
    const trackInteraction = (event: string, element: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'user_interaction', {
          event_category: 'engagement',
          event_label: element,
          value: 1
        });
      }
    };

    // Track button clicks
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        trackInteraction('click', button.textContent || 'button');
      });
    });

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) {
          trackInteraction('scroll', `${maxScroll}%`);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="glass-panel p-4 rounded-lg text-xs">
        <div className="text-white/80 mb-2 font-medium">Performance</div>
        <div className="space-y-1 text-white/60">
          <div>FCP: {Math.round(metrics.fcp)}ms</div>
          <div>LCP: {Math.round(metrics.lcp)}ms</div>
          <div>FID: {Math.round(metrics.fid)}ms</div>
          <div>CLS: {(metrics.cls * 1000).toFixed(3)}</div>
          <div>TTFB: {Math.round(metrics.ttfb)}ms</div>
        </div>
      </div>
    </div>
  );
}; 