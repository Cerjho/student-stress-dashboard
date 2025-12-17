import React from 'react';
import { Home, Users, BookOpen, FileText, TrendingUp, Heart } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'profile', label: 'Respondent Profile', icon: Users },
    { id: 'academic', label: 'Academic Stress', icon: BookOpen },
    { id: 'exams', label: 'Exam Stress', icon: FileText },
    { id: 'factors', label: 'Stress Factors', icon: TrendingUp },
    { id: 'coping', label: 'Coping Mechanisms', icon: Heart },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <div className="mb-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white text-xs font-medium">SS</span>
          </div>
          <div>
            <p className="text-lg font-light text-gray-900">Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all text-left group ${
                isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} strokeWidth={1.5} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} />
              <span className="text-sm font-light">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
