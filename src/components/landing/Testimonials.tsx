
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Manager',
      avatar: '/placeholder.svg',
      initials: 'SC',
      rating: 5,
      text: "ExpenseTracker's AI categorization is a game-changer. I used to spend hours organizing receipts, now everything happens automatically. I've saved over $400 this month just by being more aware of my spending patterns!"
    },
    {
      name: 'Michael Rodriguez',
      role: 'Small Business Owner',
      avatar: '/placeholder.svg',
      initials: 'MR',
      rating: 5,
      text: "The screenshot feature is incredible! I can just snap a photo of any receipt and it extracts all the details perfectly. As a busy entrepreneur, this saves me so much time on expense reporting."
    },
    {
      name: 'Emily Johnson',
      role: 'Graduate Student',
      avatar: '/placeholder.svg',
      initials: 'EJ',
      rating: 5,
      text: "Finally, a budgeting app that actually works! The insights help me understand my spending habits, and the weekly reports keep me accountable. I've never been this good at managing money."
    },
    {
      name: 'David Park',
      role: 'Software Engineer',
      avatar: '/placeholder.svg',
      initials: 'DP',
      rating: 5,
      text: "The analytics dashboard is beautiful and informative. I love seeing the week-over-week comparisons - it's like having a personal financial advisor. The AI suggestions have helped me optimize my spending significantly."
    },
    {
      name: 'Lisa Thompson',
      role: 'Freelance Designer',
      avatar: '/placeholder.svg',
      initials: 'LT',
      rating: 5,
      text: "As someone who manages both personal and business expenses, this app is perfect. The categorization is smart, and I can easily separate my different expense types. The time I save is worth its weight in gold!"
    },
    {
      name: 'James Wilson',
      role: 'Family Finance Manager',
      avatar: '/placeholder.svg',
      initials: 'JW',
      rating: 5,
      text: "Managing expenses for a family of four was overwhelming until I found ExpenseTracker. The budget tracking and spending alerts help us stay on track with our financial goals. Highly recommended!"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Thousands 
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">of Users</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See what our users say about transforming their financial management with ExpenseTracker.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 ring-2 ring-purple-100">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
              <span className="text-sm">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
              <span className="text-sm">50,000+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"></div>
              <span className="text-sm">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
