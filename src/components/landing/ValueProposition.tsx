
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
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ValueProposition = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Eye,
      title: 'Enhanced Financial Visibility',
      description: 'Get crystal-clear insights into where your money goes with automated tracking and intelligent categorization.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Smarter Budgeting',
      description: 'Set realistic budgets and track progress with AI-powered recommendations based on your spending patterns.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Reduced Financial Stress',
      description: 'Stay in control with real-time alerts, spending limits, and proactive budget management tools.',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Actionable AI Insights',
      description: 'Receive personalized recommendations to optimize spending, find savings opportunities, and improve financial health.',
      color: 'from-orange-500 to-pink-500'
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-16">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            Why Choose ExpenseTracker
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Transform Your Financial Future
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
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
                <p className="text-purple-100 text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Statistics */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-white/10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">87%</p>
              <p className="text-purple-200">Average savings increase</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">3 min</p>
              <p className="text-purple-200">Daily time investment</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">50K+</p>
              <p className="text-purple-200">Users trust us</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Start your journey to financial freedom today. No credit card required. 
            Experience the power of AI-driven expense tracking in just minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group shadow-lg"
              onClick={() => navigate('/auth')}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
              onClick={scrollToContact}
            >
              Contact Us
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-purple-200">
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

        {/* Contact Section */}
        <div id="contact" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Mail className="h-8 w-8 text-purple-400" />
              <p className="text-purple-100 font-medium">Email</p>
              <a href="mailto:support@expensetracker.com" className="text-white hover:text-purple-300 transition-colors">
                support@expensetracker.com
              </a>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Phone className="h-8 w-8 text-purple-400" />
              <p className="text-purple-100 font-medium">Phone</p>
              <a href="tel:+15551234567" className="text-white hover:text-purple-300 transition-colors">
                +1 (555) 123-4567
              </a>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <MapPin className="h-8 w-8 text-purple-400" />
              <p className="text-purple-100 font-medium">Location</p>
              <p className="text-white">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
