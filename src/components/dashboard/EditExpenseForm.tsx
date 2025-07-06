
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import ReceiptUpload from './ReceiptUpload';

type Expense = Database['public']['Tables']['expenses']['Row'];
type ExpenseCategory = Database['public']['Enums']['expense_category'];

interface EditExpenseFormProps {
  expense: Expense;
  onClose: () => void;
}

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ expense, onClose }) => {
  const [expenseName, setExpenseName] = useState(expense.expense_name);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState<ExpenseCategory>(expense.category);
  const [date, setDate] = useState(expense.date);
  const [attachment, setAttachment] = useState<string>(expense.attachment || '');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const categories: ExpenseCategory[] = [
    'Food', 'Travel', 'Utilities', 'Entertainment', 
    'Healthcare', 'Shopping', 'Education', 'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('expenses')
        .update({
          expense_name: expenseName,
          amount: parseFloat(amount),
          category: category,
          date,
          attachment: attachment || null
        })
        .eq('id', expense.id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Expense updated successfully!",
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">Edit Expense</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 text-center">
        <div className="space-y-2">
          <Label htmlFor="expenseName" className="block text-center">Expense Name</Label>
          <Input
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="e.g., Coffee at Starbucks"
            required
            className="text-center"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="block text-center">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            className="text-center"
          />
        </div>

        <div className="space-y-2">
          <Label className="block text-center">Category</Label>
          <Select value={category} onValueChange={(value: ExpenseCategory) => setCategory(value)} required>
            <SelectTrigger className="text-center">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-center">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="block text-center">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="text-center"
          />
        </div>

        <div className="space-y-2">
          <Label className="block text-center">Receipt</Label>
          <div className="flex justify-center">
            <ReceiptUpload 
              onUploadComplete={(url) => setAttachment(url)}
              expenseId={expense.id}
            />
          </div>
          {attachment && (
            <div className="text-center">
              <p className="text-sm text-green-600">Receipt attached</p>
              <img src={attachment} alt="Receipt" className="max-w-32 h-auto mx-auto mt-2 rounded" />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Expense'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditExpenseForm;
