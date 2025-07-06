
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Smartphone, Brain, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="h-4 w-4" />
                <span>AI-Powered Finance Tracking</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smarter Spending
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Starts Here</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Automatically track, categorize, and analyze your expenses — all in one place. 
                Take control of your finances with intelligent insights and effortless expense management.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg group shadow-lg"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg group border-blue-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
                onClick={scrollToFeatures}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* Visual/Demo */}
          <div className="relative flex justify-center">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Mock app interface */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">November Overview</h3>
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-100 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold">$2,847</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Budget Left</p>
                    <p className="text-2xl font-bold">$653</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">Recent Expenses</h4>
                  <span className="text-sm text-gray-500">Auto-categorized</span>
                </div>
                
                {[
                  { name: 'Starbucks Coffee', amount: '$4.75', category: 'Food', color: 'bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800' },
                  { name: 'Uber Ride', amount: '$18.50', category: 'Travel', color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' },
                  { name: 'Netflix Subscription', amount: '$15.99', category: 'Entertainment', color: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800' }
                ].map((expense, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{expense.name}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${expense.color}`}>
                        {expense.category}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">{expense.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg p-3 animate-bounce">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg p-3 animate-pulse">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
