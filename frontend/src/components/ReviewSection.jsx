import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Operations Manager, BlueSky Retail',
    text: 'Trace360 helped us reduce delivery delays by 30%. The real-time tracking is a game-changer.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Lee',
    role: 'Logistics Director, Peak Apparel',
    text: 'Clean dashboard and real-time tracking is very reliable. The analytics are extremely insightful.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'CEO, Urban Cart',
    text: 'A truly production-grade platform. It scales perfectly with our growing delivery fleet.',
    rating: 4,
  }
];

export default function ReviewSection() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Trusted by Industry Leaders</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">See what our customers are saying</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review) => (
          <div key={review.id} className="card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < review.rating ? 'currentColor' : 'none'} 
                    className={i < review.rating ? 'text-amber-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-[var(--text-primary)] italic mb-6">"{review.text}"</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)]">{review.name}</p>
              <p className="text-xs text-[var(--text-secondary)]">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
