
import { useState } from 'react';
import emailjs from 'emailjs-com';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const SERVICE_ID = 'service_gamqcf8';
const TEMPLATE_ID = 'template_krss8yk';
const PUBLIC_KEY = 'SvfHCN24CZX776rh0';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      // Track conversion with analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: 'portfolio_contact'
        });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Create</span> Together
          </h2>
          <p className="text-xl text-white/80">
            Ready to bring your POD ideas to life? Let's discuss your next project.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 animate-on-scroll">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 glass-panel border border-green-500/30 bg-green-500/10">
              <div className="flex items-center text-green-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 glass-panel border border-red-500/30 bg-red-500/10">
              <div className="flex items-center text-red-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Something went wrong. Please try again.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 glass-panel text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.name 
                      ? 'focus:ring-red-500/50 border-red-500/30' 
                      : 'focus:ring-portfolio-red-500/50'
                  }`}
                  placeholder="Your Name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 glass-panel text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'focus:ring-red-500/50 border-red-500/30' 
                      : 'focus:ring-portfolio-blue-500/50'
                  }`}
                  placeholder="premiumdesignercdn@gmail.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-white mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 glass-panel text-white placeholder-white/50 focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${
                  errors.message 
                    ? 'focus:ring-red-500/50 border-red-500/30' 
                    : 'focus:ring-portfolio-red-500/50'
                }`}
                placeholder="Tell me about your project..."
                disabled={isSubmitting}
              ></textarea>
              {errors.message && (
                <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.message}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`glass-button bg-gradient-to-r from-portfolio-red-600/20 to-portfolio-blue-600/20 hover:from-portfolio-red-600/30 hover:to-portfolio-blue-600/30 px-12 py-4 text-lg font-semibold transition-all duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <div className="glass-panel p-8 inline-block">
            <h3 className="text-xl font-semibold mb-4 text-white">Get In Touch</h3>
            <div className="space-y-2 text-white/80">
              <p>📧 premiumdesignercdn@gmail.com</p>
              <p>📱 +212 6 72504422</p>
              <p>⏰ Available Monday - Friday, 9AM - 6PM GMT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
