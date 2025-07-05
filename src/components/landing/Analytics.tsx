
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Analytics = () => {
  return (
    <section id="analytics" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Deep Insights & Smart Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your spending data into actionable insights with comprehensive reports, visual breakdowns, and intelligent comparisons.
          </p>
        </div>

        {/* Analytics Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Comprehensive Reports */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Comprehensive Reports</CardTitle>
                  <CardDescription>Weekly and monthly spending overviews</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-100 text-sm">Budget Spent</p>
                    <p className="text-2xl font-bold">$2,847</p>
                    <p className="text-sm text-blue-200">of $3,500 budget</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Remaining</p>
                    <p className="text-2xl font-bold">$653</p>
                    <p className="text-sm text-blue-200">18.7% left</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Real-time budget tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Custom date range reports
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Export to PDF/Excel
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Visual Breakdowns */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <PieChart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Visual Breakdowns</CardTitle>
                  <CardDescription>Category and trend visualizations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: 'Food & Dining', amount: '$1,247', percentage: 44, color: 'bg-red-500' },
                  { category: 'Transportation', amount: '$543', percentage: 19, color: 'bg-blue-500' },
                  { category: 'Shopping', amount: '$432', percentage: 15, color: 'bg-green-500' },
                  { category: 'Entertainment', amount: '347', percentage: 12, color: 'bg-yellow-500' },
                  { category: 'Other', amount: '$278', percentage: 10, color: 'bg-gray-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-16 text-right">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparative Analytics */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Comparative Analytics</h3>
              <p className="text-gray-600">Week-over-Week and Month-over-Month insights</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* WoW Comparison */}
            <div className="text-center">
              <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ArrowDownRight className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Week over Week</h4>
              <p className="text-2xl font-bold text-green-600 mb-1">-12.5%</p>
              <p className="text-sm text-gray-500">$156 less than last week</p>
            </div>

            {/* MoM Comparison */}
            <div className="text-center">
              <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ArrowUpRight className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Month over Month</h4>
              <p className="text-2xl font-bold text-red-600 mb-1">+8.3%</p>
              <p className="text-sm text-gray-500">$231 more than last month</p>
            </div>

            {/* Spending Splits */}
            <div className="text-center">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ticket Size Analysis</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Small (&lt;$25):</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medium ($25-$100):</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Large (&gt;$100):</span>
                  <span className="font-medium">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
