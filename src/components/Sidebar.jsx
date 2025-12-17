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
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold">SS</div>
          <div>
            <p className="text-sm text-gray-300">Student Stress</p>
            <p className="text-lg font-semibold">Dashboard</p>
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
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
