
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Smartphone, Brain, BarChart3 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="h-4 w-4" />
                <span>AI-Powered Finance Tracking</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smarter Spending
                <span className="block text-blue-600">Starts Here</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Automatically track, categorize, and analyze your expenses — all in one place. 
                Take control of your finances with intelligent insights and effortless expense management.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg group border-gray-300 hover:border-blue-600 hover:text-blue-600">
                <Play className="mr-2 h-5 w-5" />
                Try the Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* Visual/Demo */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Mock app interface */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
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
                  { name: 'Starbucks Coffee', amount: '$4.75', category: 'Food', color: 'bg-orange-100 text-orange-800' },
                  { name: 'Uber Ride', amount: '$18.50', category: 'Travel', color: 'bg-green-100 text-green-800' },
                  { name: 'Netflix Subscription', amount: '$15.99', category: 'Entertainment', color: 'bg-purple-100 text-purple-800' }
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
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-pulse">
              <Brain className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
