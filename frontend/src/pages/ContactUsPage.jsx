import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-[var(--text-primary)]">Contact Us</h1>
        <p className="text-[var(--text-secondary)] mt-1">Get in touch with our team for support or business inquiries.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--accent)] border border-[var(--border-color)]">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">Email Us</p>
                <a href="mailto:trace360@gmail.com" className="text-[var(--text-primary)] font-medium hover:text-[var(--accent)] transition-colors">
                  trace360@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--accent)] border border-[var(--border-color)]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">Location</p>
                <p className="text-[var(--text-primary)] font-medium">Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 card">
          <h2 className="text-xl font-semibold mb-6 text-[var(--text-primary)]">Send us a message</h2>
          
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-md border border-green-200 dark:border-green-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">✓</div>
              <p className="font-medium">Thanks for reaching out! We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--text-primary)]">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--text-primary)]">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-[var(--text-primary)]">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[var(--accent)] text-white px-5 py-2.5 rounded-md font-medium text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 w-full justify-center sm:w-auto"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
