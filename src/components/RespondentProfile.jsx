import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getYearLevelDistribution } from '../utils/dataProcessing';

const RespondentProfile = ({ data }) => {
  const distribution = useMemo(() => getYearLevelDistribution(data), [data]);

  const chartData = [
    {
      name: '3rd Year',
      value: distribution.thirdYear.count,
      percentage: distribution.thirdYear.percentage,
      color: '#fb923c',
    },
    {
      name: '4th Year',
      value: distribution.fourthYear.count,
      percentage: distribution.fourthYear.percentage,
      color: '#fbbf24',
    },
  ];

  const summaryCards = [
    {
      title: 'Total Respondents',
      value: distribution.total,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: '3rd Year Students',
      value: `${distribution.thirdYear.count} (${distribution.thirdYear.percentage}%)`,
      color: 'bg-orange-50 text-orange-700',
    },
    {
      title: '4th Year Students',
      value: `${distribution.fourthYear.count} (${distribution.fourthYear.percentage}%)`,
      color: 'bg-yellow-50 text-yellow-700',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Respondent Profile</h2>
        <p className="text-sm text-gray-600">Distribution by year level and summary stats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card) => (
          <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{card.title}</p>
            <p className="text-2xl font-light text-gray-900 mt-3">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-4">Distribution by Year Level</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.percentage}%`}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [`${value} students`, props.payload.name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RespondentProfile;
