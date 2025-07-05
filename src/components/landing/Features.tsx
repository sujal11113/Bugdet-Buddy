
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Brain, 
  Camera, 
  PlusCircle,
  Scan,
  Zap,
  Upload,
  FileText
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: PlusCircle,
      title: 'Manual Expense Entry',
      description: 'Quickly add expenses with comprehensive details including name, amount, category, date, and receipt attachments.',
      badge: 'Essential',
      badgeColor: 'bg-blue-100 text-blue-800',
      details: [
        'Smart form with auto-suggestions',
        'Custom categories and tags',
        'Receipt photo attachments',
        'Recurring expense templates'
      ]
    },
    {
      icon: Brain,
      title: 'Automatic Categorization',
      description: 'AI-powered intelligent tagging automatically sorts your transactions into Food, Travel, Bills, Shopping, and custom categories.',
      badge: 'AI-Powered',
      badgeColor: 'bg-purple-100 text-purple-800',
      details: [
        'Machine learning categorization',
        'Learns your spending patterns',
        'Custom category creation',
        'Bulk re-categorization tools'
      ]
    },
    {
      icon: Camera,
      title: 'Screenshot-Based Recording',
      description: 'Revolutionary OCR technology extracts expense details from screenshots, emails, receipts, and statements automatically.',
      badge: 'Game Changer',
      badgeColor: 'bg-green-100 text-green-800',
      details: [
        'OCR text extraction',
        'Email receipt parsing',
        'Bank statement processing',
        'Multi-format support'
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Effortless Tracking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From manual entry to AI-powered automation, our comprehensive suite of tools makes expense tracking intuitive and intelligent.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${
                    index === 0 ? 'from-blue-500 to-blue-600' :
                    index === 1 ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  }`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={`${feature.badgeColor} border-0`}>
                    {feature.badge}
                  </Badge>
                </div>
                
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {feature.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Screenshot Feature Highlight */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Screenshot Magic in Action
              </h3>
              <p className="text-gray-600 mb-6">
                Simply capture or upload any receipt, email confirmation, or bank statement. 
                Our advanced OCR technology instantly extracts all the details you need.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Scan, text: 'Auto-detect text' },
                  { icon: Zap, text: 'Instant processing' },
                  { icon: Upload, text: 'Multiple formats' },
                  { icon: FileText, text: 'Smart extraction' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">Processing...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Merchant:</span>
                    <span className="font-medium">Target Store</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-green-600">$47.83</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">Nov 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <Badge className="bg-blue-100 text-blue-800">Shopping</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
