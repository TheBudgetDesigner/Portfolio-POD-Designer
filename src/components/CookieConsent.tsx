import { useState, useEffect } from 'react';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false,
    necessary: true
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      analytics: true,
      marketing: true,
      necessary: true
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
    
    // Track consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        marketing_storage: 'granted'
      });
    }
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
    
    // Track consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        marketing_storage: preferences.marketing ? 'granted' : 'denied'
      });
    }
  };

  const handleDecline = () => {
    const declined = {
      analytics: false,
      marketing: false,
      necessary: true
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(declined));
    setIsVisible(false);
    
    // Track consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        marketing_storage: 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="macos-window max-w-4xl mx-auto">
        <div className="macos-titlebar">
          <div className="macos-controls">
            <div className="macos-control red"></div>
            <div className="macos-control yellow"></div>
            <div className="macos-control green"></div>
          </div>
          
          <div className="text-sm font-medium text-white/80">
            Cookie Preferences
          </div>
          
          <div className="w-12"></div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                We value your privacy
              </h3>
              <p className="text-white/80 mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By continuing to use our site, you consent to our use of cookies.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Necessary Cookies</div>
                    <div className="text-white/60 text-sm">Required for the website to function properly</div>
                  </div>
                  <div className="text-green-400 font-medium">Always Active</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Analytics Cookies</div>
                    <div className="text-white/60 text-sm">Help us understand how visitors interact with our website</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                      preferences.analytics ? 'bg-gradient-to-r from-portfolio-red-500 to-portfolio-blue-500' : 'bg-white/20'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Marketing Cookies</div>
                    <div className="text-white/60 text-sm">Used to deliver personalized advertisements</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                      preferences.marketing ? 'bg-gradient-to-r from-portfolio-red-500 to-portfolio-blue-500' : 'bg-white/20'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col justify-center space-y-4">
              <button
                onClick={handleAcceptAll}
                className="glass-button bg-gradient-to-r from-portfolio-red-600/20 to-portfolio-blue-600/20 hover:from-portfolio-red-600/30 hover:to-portfolio-blue-600/30 px-6 py-3 text-center"
              >
                Accept All Cookies
              </button>
              
              <button
                onClick={handleAcceptSelected}
                className="glass-button px-6 py-3 text-center"
              >
                Accept Selected
              </button>
              
              <button
                onClick={handleDecline}
                className="glass-button bg-white/5 hover:bg-white/10 px-6 py-3 text-center"
              >
                Decline All
              </button>
              
              <div className="text-center">
                <a 
                  href="/privacy-policy" 
                  className="text-white/60 hover:text-white text-sm underline"
                >
                  Learn more about our cookie policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 