import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  getSleepHoursDistribution,
  getPersonalIssuesImpact,
  getEnvironmentalStressors,
} from '../utils/dataProcessing';

const StressFactors = ({ responses }) => {
  const sleepData = useMemo(() => getSleepHoursDistribution(responses), [responses]);
  const personalIssues = useMemo(() => getPersonalIssuesImpact(responses), [responses]);
  const environmental = useMemo(() => getEnvironmentalStressors(responses), [responses]);

  const personalColors = ['#22c55e', '#a7f3d0', '#16a34a'];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Stress Factors</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Sleep Hours Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" tick={{ fill: '#6b7280' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#fb923c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Personal Issues Impact</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={personalIssues}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={(entry) => `${entry.label}: ${entry.percentage}%`}
              >
                {personalIssues.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={personalColors[index % personalColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} respondents`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Environmental Stressors</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={environmental} layout="vertical" margin={{ left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" allowDecimals={false} tick={{ fill: '#6b7280' }} />
            <YAxis dataKey="stressor" type="category" width={140} tick={{ fill: '#6b7280' }} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StressFactors;
