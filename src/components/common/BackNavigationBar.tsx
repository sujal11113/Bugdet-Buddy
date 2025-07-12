
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, StickyNote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackNavigationBarProps {
  title?: string;
  backTo?: string;
}

const BackNavigationBar: React.FC<BackNavigationBarProps> = ({ 
  title = "Budget-Buddy", 
  backTo = "/" 
}) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-blue-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(backTo)}
              className="text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <StickyNote className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{title}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BackNavigationBar;
