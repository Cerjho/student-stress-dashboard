import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getCopingMechanisms, getSuggestions } from '../utils/dataProcessing';

const CopingMechanisms = ({ responses }) => {
  const mechanisms = useMemo(() => getCopingMechanisms(responses), [responses]);
  const suggestions = useMemo(() => getSuggestions(responses), [responses]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Coping Mechanisms</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Preferred Coping Strategies</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={mechanisms}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mechanism" tick={{ fill: '#6b7280' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Student Suggestions</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <p className="text-sm text-gray-500 font-medium">{suggestion.name}</p>
                <p className="text-gray-800 mt-1">{suggestion.text}</p>
              </div>
            ))}
            {suggestions.length === 0 && (
              <p className="text-gray-500 text-sm">No suggestions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopingMechanisms;
