import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar as CalendarIcon,
  Receipt,
  Edit,
  Trash2,
  FileText,
  Coins
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Expense = Database['public']['Tables']['expenses']['Row'];
type ExpenseCategory = Database['public']['Enums']['expense_category'];

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const { user } = useAuth();
  const { toast } = useToast();

  const categories: ExpenseCategory[] = [
    'Food', 'Travel', 'Utilities', 'Entertainment', 
    'Healthcare', 'Shopping', 'Education', 'Other'
  ];

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  useEffect(() => {
    filterAndSortExpenses();
  }, [expenses, searchTerm, filterCategory, sortBy, dateRange, currentPage]);

  const fetchExpenses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

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

  const filterAndSortExpenses = () => {
    let filtered = expenses.filter(expense => {
      const matchesSearch = expense.expense_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
      
      let matchesDateRange = true;
      if (dateRange.from || dateRange.to) {
        const expenseDate = new Date(expense.date);
        if (dateRange.from && expenseDate < dateRange.from) matchesDateRange = false;
        if (dateRange.to && expenseDate > dateRange.to) matchesDateRange = false;
      }
      
      return matchesSearch && matchesCategory && matchesDateRange;
    });

    // Sort expenses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'amount-high':
          return Number(b.amount) - Number(a.amount);
        case 'amount-low':
          return Number(a.amount) - Number(b.amount);
        case 'name':
          return a.expense_name.localeCompare(b.expense_name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'date-old':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        default: // date-new
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    setFilteredExpenses(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Amount', 'Category', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredExpenses.map(expense => [
        expense.date,
        `"${expense.expense_name}"`,
        expense.amount,
        expense.category,
        '""' // Notes placeholder
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense deleted successfully",
      });
      
      fetchExpenses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Expense History
            </h1>
            <p className="text-gray-600">
              Detailed view of all your transactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Budget-Buddy</span>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{filteredExpenses.length}</div>
                <div className="text-blue-100">Total Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
                <div className="text-blue-100">Total Amount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  ${filteredExpenses.length > 0 ? (totalAmount / filteredExpenses.length).toFixed(2) : '0.00'}
                </div>
                <div className="text-blue-100">Average per Transaction</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Filters & Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-new">Newest First</SelectItem>
                  <SelectItem value="date-old">Oldest First</SelectItem>
                  <SelectItem value="amount-high">Highest Amount</SelectItem>
                  <SelectItem value="amount-low">Lowest Amount</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd")} -{" "}
                          {format(dateRange.to, "LLL dd")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange(range || {})}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setSortBy('date-new');
                  setDateRange({});
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>

              {/* Export */}
              <Button 
                onClick={exportToCSV}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredExpenses.length)} of {filteredExpenses.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-12 px-6">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No expenses found matching your criteria</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setDateRange({});
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead className="w-[100px]">Amount</TableHead>
                        <TableHead className="w-[120px]">Category</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="w-[80px]">Receipt</TableHead>
                        <TableHead className="w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedExpenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="font-medium">
                            <div className="max-w-[180px] truncate" title={expense.expense_name}>
                              {expense.expense_name}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${Number(expense.amount).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {expense.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(expense.date), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell>
                            {expense.attachment ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(expense.attachment!, '_blank')}
                                className="h-8 w-8 p-0"
                              >
                                <Receipt className="h-4 w-4" />
                              </Button>
                            ) : (
                              <span className="text-gray-400 text-xs">None</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteExpense(expense.id)}
                                className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t">
                    <div className="text-sm text-gray-500">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseHistory;