
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Plus, TrendingUp, DollarSign, Target, Brain, Lightbulb, ArrowUp, ArrowDown } from 'lucide-react';
import AddExpenseForm from '@/components/dashboard/AddExpenseForm';

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    totalThisMonth: 0,
    topCategory: '',
    recentExpenses: [],
    monthlyTrend: [],
    aiInsights: []
  });
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        setExpenses(data || []);
        calculateAdvancedStats(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAdvancedStats = (expenseData: any[]) => {
    const now = new Date();
    const thisMonth = expenseData.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    });

    const lastMonth = expenseData.filter(expense => {
      const expenseDate = new Date(expense.date);
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
      return expenseDate.getMonth() === lastMonthDate.getMonth() && 
             expenseDate.getFullYear() === lastMonthDate.getFullYear();
    });

    const totalThisMonth = thisMonth.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const totalLastMonth = lastMonth.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    // Calculate category totals and find top category
    const categoryTotals = {};
    thisMonth.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
    });
    
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, ''
    );

    // Generate AI insights
    const monthlyChange = totalLastMonth > 0 ? ((totalThisMonth - totalLastMonth) / totalLastMonth * 100) : 0;
    const avgDailySpend = totalThisMonth / now.getDate();
    const weekendSpending = thisMonth.filter(expense => {
      const day = new Date(expense.date).getDay();
      return day === 0 || day === 6;
    }).reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    const weekdaySpending = totalThisMonth - weekendSpending;
    const weekendAvg = weekendSpending / 8; // Assuming 8 weekend days in a month
    const weekdayAvg = weekdaySpending / 22; // Assuming 22 weekdays in a month

    const aiInsights = [
      {
        type: 'trend',
        title: monthlyChange > 0 ? 'Spending Increased' : 'Spending Decreased',
        description: `Your spending ${monthlyChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(monthlyChange).toFixed(1)}% compared to last month`,
        color: monthlyChange > 0 ? 'text-red-600' : 'text-green-600',
        icon: monthlyChange > 0 ? ArrowUp : ArrowDown
      },
      {
        type: 'pattern',
        title: 'Weekend Spending Pattern',
        description: weekendAvg > weekdayAvg ? 
          `You spend ${((weekendAvg - weekdayAvg) / weekdayAvg * 100).toFixed(0)}% more on weekends` :
          `You spend ${((weekdayAvg - weekendAvg) / weekdayAvg * 100).toFixed(0)}% more on weekdays`,
        color: 'text-blue-600',
        icon: Brain
      },
      {
        type: 'suggestion',
        title: 'Budget Suggestion',
        description: `Based on your spending pattern, consider setting a daily limit of $${(avgDailySpend * 1.1).toFixed(0)}`,
        color: 'text-purple-600',
        icon: Target
      }
    ];

    // Generate monthly trend data
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i);
      const monthExpenses = expenseData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === date.getMonth() && 
               expenseDate.getFullYear() === date.getFullYear();
      });
      const total = monthExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      last6Months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        amount: total
      });
    }

    const recentExpenses = expenseData.slice(0, 5);

    setStats({
      totalThisMonth,
      topCategory,
      recentExpenses,
      monthlyTrend: last6Months,
      aiInsights
    });
  };

  const getCategoryData = () => {
    const categoryTotals = {};
    expenses.forEach((expense: any) => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
    });

    return Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));
  };

  const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#EC4899', '#EF4444', '#F97316', '#EAB308'];

  if (loading) {
    return (
      <div className="space-y-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded mx-auto"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mx-auto">
          AI-Powered Dashboard
        </h1>
        <div className="flex gap-3">
          <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddExpenseForm onClose={() => {
                setShowAddExpense(false);
                fetchExpenses();
              }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.aiInsights.map((insight, index) => (
          <Card key={index} className="bg-gradient-to-r from-gray-50 to-white border-l-4 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">{insight.title}</CardTitle>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">${stats.totalThisMonth.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700">Top Category</CardTitle>
            <Target className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900">{stats.topCategory || 'None'}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{expenses.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              6-Month Spending Trend
            </CardTitle>
            <CardDescription>Your spending pattern over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.monthlyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No trend data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-600" />
              AI Category Analysis
            </CardTitle>
            <CardDescription>Smart categorization of your expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {expenses.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getCategoryData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getCategoryData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No expenses to analyze
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest expenses with AI insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentExpenses.length > 0 ? (
              stats.recentExpenses.map((expense: any) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                  <div>
                    <p className="font-medium">{expense.expense_name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm text-gray-500">{expense.category}</p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">AI Categorized</span>
                      <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-blue-600">${parseFloat(expense.amount).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No recent expenses
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
