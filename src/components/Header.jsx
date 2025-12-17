import React from 'react';
import { Users, CheckCircle, TrendingUp } from 'lucide-react';

const metrics = [
  {
    key: 'total',
    label: 'Total Respondents',
    icon: Users,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    key: 'complete',
    label: 'Complete Responses',
    icon: CheckCircle,
    gradient: 'from-green-500 to-green-600',
  },
  {
    key: 'average',
    label: 'Average Exam Stress',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-purple-700',
  },
];

const Header = ({ totalRespondents = 0, completeResponses = 0, averageStress = 0 }) => {
  const values = {
    total: totalRespondents,
    complete: completeResponses,
    average: averageStress,
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900">Student Stress Analysis</h1>
          <p className="text-sm text-gray-500 mt-2 font-light">
            Mabini College · Computer Studies · AY 2024-2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map(({ key, label, icon: Icon, gradient }) => (
            <div
              key={key}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
                  <p className="text-3xl font-light text-gray-900 mt-3">
                    {key === 'average' ? Number(values[key]).toFixed(2) : values[key]}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Icon size={20} className="text-gray-600" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
