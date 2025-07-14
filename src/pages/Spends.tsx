
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Edit, Trash2, Eye, Search, Filter, Plus, Receipt } from 'lucide-react';
import AddExpenseForm from '@/components/dashboard/AddExpenseForm';
import EditExpenseForm from '@/components/dashboard/EditExpenseForm';

type Expense = Database['public']['Tables']['expenses']['Row'];
type ExpenseCategory = Database['public']['Enums']['expense_category'];

const Spends = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  const categories: ExpenseCategory[] = [
    'Food', 'Travel', 'Utilities', 'Entertainment', 
    'Healthcare', 'Shopping', 'Education', 'Other'
  ];

  useEffect(() => {
    if (user) {
      fetchExpenses();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('expenses-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'expenses',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchExpenses();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  useEffect(() => {
    filterAndSortExpenses();
  }, [expenses, searchTerm, filterCategory, sortBy]);

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
      return matchesSearch && matchesCategory;
    });

    // Sort expenses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return Number(b.amount) - Number(a.amount);
        case 'name':
          return a.expense_name.localeCompare(b.expense_name);
        case 'category':
          return a.category.localeCompare(b.category);
        default: // date
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    setFilteredExpenses(filtered);
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
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Expense Management
          </h1>
          <p className="text-gray-600 text-lg">
            Track, manage, and analyze all your expenses in one place
          </p>
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Total Expenses</CardTitle>
            <CardDescription className="text-blue-100">
              {filteredExpenses.length} expenses found
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold">${totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
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

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddExpenseForm onClose={() => setShowAddExpense(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Expenses Table */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Your Expenses</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-8 px-6">
                <p className="text-gray-500 mb-4">No expenses found</p>
                <Button 
                  onClick={() => setShowAddExpense(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Expense
                </Button>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center w-[20%]">Name</TableHead>
                      <TableHead className="text-center w-[15%]">Amount</TableHead>
                      <TableHead className="text-center w-[15%]">Category</TableHead>
                      <TableHead className="text-center w-[15%]">Date</TableHead>
                      <TableHead className="text-center w-[15%]">Receipt</TableHead>
                      <TableHead className="text-center w-[20%]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="text-center font-medium p-2 break-words">
                          <div className="max-w-[150px] truncate" title={expense.expense_name}>
                            {expense.expense_name}
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-2 font-medium">
                          ${Number(expense.amount).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center p-2">
                          <Badge variant="secondary" className="text-xs">
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center p-2 text-sm">
                          {new Date(expense.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center p-2">
                          {expense.attachment ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setViewingReceipt(expense.attachment)}
                              className="h-8 w-8 p-0"
                            >
                              <Receipt className="h-4 w-4" />
                            </Button>
                          ) : (
                            <span className="text-gray-400 text-xs">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center p-2">
                          <div className="flex justify-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingExpense(expense)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteExpense(expense.id)}
                              className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
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
            )}
          </CardContent>
        </Card>

        {/* Edit Expense Dialog */}
        {editingExpense && (
          <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
            <DialogContent>
              <EditExpenseForm 
                expense={editingExpense}
                onClose={() => setEditingExpense(null)}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Receipt Viewer Dialog */}
        {viewingReceipt && (
          <Dialog open={!!viewingReceipt} onOpenChange={() => setViewingReceipt(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-center">Receipt</DialogTitle>
              </DialogHeader>
              <div className="text-center">
                <img 
                  src={viewingReceipt} 
                  alt="Receipt" 
                  className="max-w-full h-auto mx-auto rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Spends;
