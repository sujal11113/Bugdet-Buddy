
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { DollarSign, Plus, Upload, User, LogOut } from 'lucide-react';
import AddExpenseForm from './AddExpenseForm';
import UserProfile from './UserProfile';

const DashboardNavbar = () => {
  const { signOut } = useAuth();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-blue-200 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FinTrack
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddExpenseForm onClose={() => setShowAddExpense(false)} />
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="border-blue-300 hover:bg-blue-50">
            <Upload className="h-4 w-4 mr-2" />
            Upload Receipt
          </Button>

          <Dialog open={showProfile} onOpenChange={setShowProfile}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-300 hover:bg-blue-50">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <UserProfile onClose={() => setShowProfile(false)} />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={signOut}
            className="border-red-300 hover:bg-red-50 text-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
