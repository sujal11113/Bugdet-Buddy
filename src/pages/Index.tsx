import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Brain, 
  Camera, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  DollarSign,
  Clock,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye,
  Target
} from 'lucide-react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Analytics from '@/components/landing/Analytics';
import ValueProposition from '@/components/landing/ValueProposition';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-purple-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">FinTrack</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#analytics" className="text-gray-600 hover:text-purple-600 transition-colors">Analytics</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Reviews</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-purple-600">
                Log In
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        <Features />
        <Analytics />
        <ValueProposition />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
