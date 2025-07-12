
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Smartphone, Brain, BarChart3, Camera, Zap, Target } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32 text-center">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                <Brain className="h-5 w-5" />
                <span>AI-Powered Financial Intelligence</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Finance
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Experience the future of expense management with AI-powered categorization, 
                intelligent insights, and automated receipt processing. Take control of your 
                finances like never before.
              </p>
            </div>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 text-lg group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/auth')}
              >
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-4 text-lg group border-2 border-blue-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                onClick={scrollToFeatures}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Discover Features
              </Button>
            </div>

            {/* Trust indicators with enhanced styling */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center justify-center space-x-2 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Bank-level Security</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI-Powered Insights</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Free Forever Plan</span>
              </div>
            </div>
          </div>

          {/* Enhanced Visual/Demo with realistic mobile app mockup */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-black rounded-[2.5rem] p-1">
                  <div className="bg-white rounded-[2rem] overflow-hidden h-[600px] w-[300px]">
                    {/* Status bar */}
                    <div className="bg-gray-50 px-6 py-2 flex justify-between items-center text-xs text-gray-600">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>

                    {/* App header */}
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Budget-Buddy AI</h3>
                        <div className="flex space-x-2">
                          <Camera className="h-5 w-5" />
                          <Brain className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/20 rounded-lg p-3">
                          <p className="text-blue-100 text-xs">This Month</p>
                          <p className="text-xl font-bold">$2,847</p>
                          <p className="text-xs text-blue-200">↓ 12% vs last month</p>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                          <p className="text-blue-100 text-xs">AI Savings</p>
                          <p className="text-xl font-bold">$432</p>
                          <p className="text-xs text-blue-200">Smart suggestions</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Insights section */}
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400">
                      <div className="flex items-center mb-2">
                        <Brain className="h-4 w-4 text-amber-600 mr-2" />
                        <span className="text-sm font-semibold text-amber-800">AI Insight</span>
                      </div>
                      <p className="text-xs text-amber-700">You spend 23% more on weekends. Consider setting a weekend budget!</p>
                    </div>

                    {/* Recent expenses with AI categorization */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 text-sm">Recent Expenses</h4>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Auto-categorized</span>
                      </div>
                      
                      {[
                        { name: 'Starbucks Coffee', amount: '$4.75', category: 'Food & Dining', color: 'bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800', confidence: '98%' },
                        { name: 'Uber Ride', amount: '$18.50', category: 'Transportation', color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800', confidence: '95%' },
                        { name: 'Netflix', amount: '$15.99', category: 'Entertainment', color: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800', confidence: '100%' }
                      ].map((expense, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900 text-sm">{expense.name}</p>
                              <span className="font-semibold text-gray-900 text-sm">{expense.amount}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${expense.color}`}>
                                {expense.category}
                              </span>
                              <span className="text-xs text-gray-400">AI: {expense.confidence}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick actions */}
                    <div className="p-4 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2">
                        <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg">
                          <Camera className="h-5 w-5 text-blue-600 mb-1" />
                          <span className="text-xs text-blue-600">Scan Receipt</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg">
                          <Target className="h-5 w-5 text-green-600 mb-1" />
                          <span className="text-xs text-green-600">Set Goal</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-purple-600 mb-1" />
                          <span className="text-xs text-purple-600">Analytics</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-4 -right-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-2xl p-4 animate-bounce">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-2xl p-4 animate-pulse">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-xl p-3 animate-ping">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
