
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Brain, TrendingUp, Target, AlertTriangle, CheckCircle, Calendar, DollarSign, Lightbulb, Zap } from 'lucide-react';

const Analyse = () => {
  const [expenses, setExpenses] = useState([]);
  const [timeFilter, setTimeFilter] = useState('6months');
  const [analytics, setAnalytics] = useState({
    spendingTrends: [],
    categoryBreakdown: [],
    weeklyPattern: [],
    monthlyComparison: [],
    aiInsights: [],
    budgetRecommendations: []
  });
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchExpensesAndAnalyze();
    }
  }, [user, timeFilter]);

  const fetchExpensesAndAnalyze = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      
      setExpenses(data || []);
      generateAdvancedAnalytics(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch expense data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAdvancedAnalytics = (expenseData: any[]) => {
    const now = new Date();
    let filteredData = expenseData;

    // Apply time filter
    if (timeFilter === '1month') {
      filteredData = expenseData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (now.getTime() - expenseDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
      });
    } else if (timeFilter === '3months') {
      filteredData = expenseData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (now.getTime() - expenseDate.getTime()) <= (90 * 24 * 60 * 60 * 1000);
      });
    } else if (timeFilter === '6months') {
      filteredData = expenseData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (now.getTime() - expenseDate.getTime()) <= (180 * 24 * 60 * 60 * 1000);
      });
    }

    // Generate spending trends by month
    const spendingTrends = [];
    const monthsToShow = timeFilter === '1month' ? 4 : timeFilter === '3months' ? 6 : 12;
    
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i);
      const monthExpenses = filteredData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === date.getMonth() && 
               expenseDate.getFullYear() === date.getFullYear();
      });
      const total = monthExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      spendingTrends.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        amount: total,
        count: monthExpenses.length
      });
    }

    // Generate category breakdown
    const categoryTotals = {};
    filteredData.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
    });

    const categoryBreakdown = Object.keys(categoryTotals)
      .map(category => ({ name: category, value: categoryTotals[category] }))
      .sort((a, b) => b.value - a.value);

    // Generate weekly spending pattern
    const weeklyPattern = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let day = 0; day < 7; day++) {
      const dayExpenses = filteredData.filter(expense => {
        return new Date(expense.date).getDay() === day;
      });
      const total = dayExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      weeklyPattern.push({
        day: dayNames[day],
        amount: total / Math.max(1, Math.ceil(filteredData.length / 30)), // Average per occurrence
        count: dayExpenses.length
      });
    }

    // Generate AI insights
    const totalSpent = filteredData.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const avgExpense = totalSpent / Math.max(1, filteredData.length);
    const topCategory = categoryBreakdown[0]?.name || 'None';
    const topCategoryAmount = categoryBreakdown[0]?.value || 0;
    const topCategoryPercentage = totalSpent > 0 ? (topCategoryAmount / totalSpent * 100) : 0;

    // Weekend vs Weekday analysis
    const weekendExpenses = filteredData.filter(expense => {
      const day = new Date(expense.date).getDay();
      return day === 0 || day === 6;
    });
    const weekdayExpenses = filteredData.filter(expense => {
      const day = new Date(expense.date).getDay();
      return day >= 1 && day <= 5;
    });

    const weekendTotal = weekendExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const weekdayTotal = weekdayExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const weekendAvg = weekendTotal / Math.max(1, weekendExpenses.length);
    const weekdayAvg = weekdayTotal / Math.max(1, weekdayExpenses.length);

    const aiInsights = [
      {
        type: 'spending_pattern',
        icon: Brain,
        title: 'Top Spending Category',
        description: `${topCategory} accounts for ${topCategoryPercentage.toFixed(1)}% of your expenses ($${topCategoryAmount.toFixed(2)})`,
        severity: topCategoryPercentage > 40 ? 'warning' : 'info'
      },
      {
        type: 'day_pattern',
        icon: Calendar,
        title: 'Weekend vs Weekday',
        description: weekendAvg > weekdayAvg ? 
          `You spend ${((weekendAvg / weekdayAvg - 1) * 100).toFixed(0)}% more per transaction on weekends` :
          `You spend ${((weekdayAvg / weekendAvg - 1) * 100).toFixed(0)}% more per transaction on weekdays`,
        severity: 'info'
      },
      {
        type: 'frequency',
        icon: TrendingUp,
        title: 'Transaction Frequency',
        description: `You average ${(filteredData.length / Math.max(1, spendingTrends.length)).toFixed(1)} transactions per month`,
        severity: 'info'
      },
      {
        type: 'budget',
        icon: Target,
        title: 'Budget Recommendation',
        description: `Based on your spending, consider a monthly budget of $${(totalSpent * 1.1 / Math.max(1, spendingTrends.length)).toFixed(0)}`,
        severity: 'success'
      }
    ];

    // Budget recommendations based on AI analysis
    const budgetRecommendations = [
      {
        category: topCategory,
        current: topCategoryAmount,
        recommended: topCategoryAmount * 0.9,
        reason: 'Reduce your highest spending category by 10%'
      },
      {
        category: 'Emergency Fund',
        current: 0,
        recommended: totalSpent * 0.2,
        reason: 'Build an emergency fund worth 20% of monthly expenses'
      },
      {
        category: 'Savings Goal',
        current: 0,
        recommended: totalSpent * 0.15,
        reason: 'Aim to save 15% of your monthly spending'
      }
    ];

    setAnalytics({
      spendingTrends,
      categoryBreakdown,
      weeklyPattern,
      monthlyComparison: spendingTrends.slice(-2),
      aiInsights,
      budgetRecommendations
    });
  };

  const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#EC4899', '#EF4444', '#F97316', '#EAB308'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 text-center">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            AI Financial Analytics
          </h1>
          <p className="text-gray-600 text-lg">
            Deep insights into your spending patterns powered by artificial intelligence
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center mb-6">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {analytics.aiInsights.map((insight, index) => (
            <Card key={index} className={`${
              insight.severity === 'warning' ? 'border-orange-200 bg-orange-50' :
              insight.severity === 'success' ? 'border-green-200 bg-green-50' :
              'border-blue-200 bg-blue-50'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <insight.icon className={`h-5 w-5 ${
                    insight.severity === 'warning' ? 'text-orange-600' :
                    insight.severity === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spending Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Spending Trends
              </CardTitle>
              <CardDescription>Monthly spending pattern analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.spendingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3B82F6" 
                    fill="url(#colorGradient)"
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Smart Category Analysis
              </CardTitle>
              <CardDescription>AI-powered expense categorization</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Pattern */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Weekly Spending Pattern
              </CardTitle>
              <CardDescription>Average spending by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.weeklyPattern}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Avg Amount']} />
                  <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Budget Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-indigo-600" />
                AI Budget Recommendations
              </CardTitle>
              <CardDescription>Personalized budget suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.budgetRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{rec.category}</p>
                      <p className="text-sm text-gray-600">{rec.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">
                        ${rec.recommended.toFixed(0)}
                      </p>
                      <p className="text-xs text-gray-500">recommended</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Lightbulb className="h-6 w-6 mr-2" />
              AI-Powered Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Optimize Categories</h3>
                <p className="text-sm opacity-90">Review and adjust your top spending categories</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <Target className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Set Smart Goals</h3>
                <p className="text-sm opacity-90">Create realistic budgets based on your patterns</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm opacity-90">Monitor your improvement with AI insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analyse;
