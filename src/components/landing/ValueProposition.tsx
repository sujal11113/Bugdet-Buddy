
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Target, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const ValueProposition = () => {
  const benefits = [
    {
      icon: Eye,
      title: 'Enhanced Financial Visibility',
      description: 'Get crystal-clear insights into where your money goes with automated tracking and intelligent categorization.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Smarter Budgeting',
      description: 'Set realistic budgets and track progress with AI-powered recommendations based on your spending patterns.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Reduced Financial Stress',
      description: 'Stay in control with real-time alerts, spending limits, and proactive budget management tools.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Actionable AI Insights',
      description: 'Receive personalized recommendations to optimize spending, find savings opportunities, and improve financial health.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            Why Choose ExpenseTracker
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Transform Your Financial Future
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands who've taken control of their finances with our AI-enhanced platform. 
            Experience the difference intelligent expense tracking makes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Statistics */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">87%</p>
              <p className="text-blue-200">Average savings increase</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">3 min</p>
              <p className="text-blue-200">Daily time investment</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">50K+</p>
              <p className="text-blue-200">Users trust us</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your journey to financial freedom today. No credit card required. 
            Experience the power of AI-driven expense tracking in just minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg group">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-blue-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
