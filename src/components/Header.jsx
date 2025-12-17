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
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Student Stress Analysis Dashboard</h1>
          <p className="text-base text-blue-100 mt-1">
            Mabini College - College of Computer Studies | AY 2024-2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map(({ key, label, icon: Icon, gradient }) => (
            <div
              key={key}
              className={`bg-gradient-to-br ${gradient} text-white rounded-lg p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{label}</p>
                  <p className="text-3xl font-bold mt-1">
                    {key === 'average' ? Number(values[key]).toFixed(2) : values[key]}
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Icon size={24} />
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
