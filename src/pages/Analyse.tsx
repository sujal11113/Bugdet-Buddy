
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target, Award } from 'lucide-react';

type Expense = Database['public']['Tables']['expenses']['Row'];

const Analyse = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<string>('month');
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [dailyData, setDailyData] = useState<any[]>([]);

  const { user } = useAuth();
  const { toast } = useToast();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  useEffect(() => {
    if (expenses.length > 0) {
      processAnalyticsData();
    }
  }, [expenses, timeRange]);

  const fetchExpenses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch expenses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = () => {
    const now = new Date();
    let filteredExpenses = expenses;

    // Filter by time range
    if (timeRange === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filteredExpenses = expenses.filter(expense => new Date(expense.date) >= oneMonthAgo);
    } else if (timeRange === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredExpenses = expenses.filter(expense => new Date(expense.date) >= oneWeekAgo);
    } else if (timeRange === 'year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      filteredExpenses = expenses.filter(expense => new Date(expense.date) >= oneYearAgo);
    }

    // Process category data
    const categoryTotals: { [key: string]: number } = {};
    filteredExpenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + Number(expense.amount);
    });

    const categoryChartData = Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount,
      percentage: ((amount / Object.values(categoryTotals).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
    }));

    setCategoryData(categoryChartData);

    // Process monthly data
    const monthlyTotals: { [key: string]: number } = {};
    filteredExpenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(expense.amount);
    });

    const monthlyChartData = Object.entries(monthlyTotals).map(([month, amount]) => ({
      month,
      amount
    }));

    setMonthlyData(monthlyChartData);

    // Process daily data for the last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayExpenses = filteredExpenses.filter(expense => expense.date === dateStr);
      const total = dayExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
      
      last7Days.push({
        day: date.toLocaleDateString('default', { weekday: 'short' }),
        amount: total
      });
    }

    setDailyData(last7Days);
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const thisMonthSpent = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const now = new Date();
      return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const lastMonthSpent = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return expenseDate.getMonth() === lastMonth.getMonth() && expenseDate.getFullYear() === lastMonth.getFullYear();
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const monthlyChange = lastMonthSpent > 0 ? ((thisMonthSpent - lastMonthSpent) / lastMonthSpent) * 100 : 0;
  const averageDaily = thisMonthSpent / new Date().getDate();
  const topCategory = categoryData.length > 0 ? categoryData.reduce((max, cat) => cat.value > max.value ? cat : max) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 text-center">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Expense Analytics
          </h1>
          <p className="text-gray-600 text-lg">
            Analyze your spending patterns and gain financial insights
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center mb-6">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold">${thisMonthSpent.toFixed(2)}</div>
              <p className="text-xs text-green-100 flex items-center justify-center">
                {monthlyChange > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(monthlyChange).toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
              <Target className="h-4 w-4" />
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold">${averageDaily.toFixed(2)}</div>
              <p className="text-xs text-purple-100">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Category</CardTitle>
              <Award className="h-4 w-4" />
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-lg font-bold">{topCategory?.name || 'N/A'}</div>
              <p className="text-xs text-orange-100">
                ${topCategory?.value.toFixed(2) || '0.00'} ({topCategory?.percentage || '0'}%)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Pie Chart */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Breakdown of expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Monthly Bar Chart */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Monthly Spending Trend</CardTitle>
              <CardDescription>Monthly expense totals</CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                    <Bar dataKey="amount" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Daily Spending Line Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="text-center">
              <CardTitle>Daily Spending (Last 7 Days)</CardTitle>
              <CardDescription>Your daily expense pattern</CardDescription>
            </CardHeader>
            <CardContent>
              {dailyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                    <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500">No data available</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Financial Insights</CardTitle>
            <CardDescription>AI-powered spending analysis</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {expenses.length === 0 ? (
              <p className="text-gray-500">Start adding expenses to see personalized insights!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Spending Frequency</h4>
                  <p className="text-sm text-blue-600">
                    You make an average of {Math.round(expenses.length / 30)} transactions per month
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Budget Recommendation</h4>
                  <p className="text-sm text-green-600">
                    Consider setting a monthly budget of ${(thisMonthSpent * 1.1).toFixed(2)} based on current spending
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Savings Potential</h4>
                  <p className="text-sm text-purple-600">
                    Track {topCategory?.name || 'dining'} expenses more closely - it's your highest category
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analyse;
