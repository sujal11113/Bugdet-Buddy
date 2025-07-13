
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, BarChart3, PieChart, History } from 'lucide-react';

const DashboardSidebar = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard', exact: true },
    { to: '/dashboard/spends', icon: CreditCard, label: 'Add Expense' },
    { to: '/dashboard/summary', icon: PieChart, label: 'Summary' },
    { to: '/dashboard/history', icon: History, label: 'History' },
    { to: '/dashboard/analyse', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-md border-r border-blue-200 p-6">
      <nav className="space-y-2">
        {navItems.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
