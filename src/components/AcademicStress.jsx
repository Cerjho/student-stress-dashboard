import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  getAcademicStressFrequency,
  getAcademicStressors,
  filterByYearLevel,
} from '../utils/dataProcessing';

const AcademicStress = ({ responses }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredData = useMemo(() => filterByYearLevel(responses, activeFilter), [responses, activeFilter]);
  const frequencyData = useMemo(() => getAcademicStressFrequency(filteredData), [filteredData]);
  const stressorData = useMemo(() => getAcademicStressors(filteredData), [filteredData]);

  const filterButtons = [
    { id: 'All', label: 'All' },
    { id: '3rd year', label: '3rd Year' },
    { id: '4th year', label: '4th Year' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-light text-gray-900">Academic Stress</h2>
          <p className="text-sm text-gray-500 mt-1 font-light">Frequency and key academic stressors</p>
        </div>
        <div className="flex space-x-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-all ${
                activeFilter === btn.id ? 'bg-gray-900 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">Academic Stress Frequency</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="frequency" tick={{ fill: '#6b7280' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h3 className="text-lg font-light text-gray-900 mb-6">Academic Stressors</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stressorData} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: '#6b7280' }} allowDecimals={false} />
              <YAxis dataKey="stressor" type="category" width={120} tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#fb923c" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AcademicStress;
