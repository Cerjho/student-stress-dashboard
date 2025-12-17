import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getExamStressLevels, getAverageExamStress } from '../utils/dataProcessing';

const ExamStress = ({ responses }) => {
  const levelData = useMemo(() => getExamStressLevels(responses), [responses]);
  const average = useMemo(() => getAverageExamStress(responses), [responses]);

  const highestLevel = levelData.reduce((max, cur) => (cur.count > max.count ? cur : max), levelData[0] || {
    level: 0,
    count: 0,
  });

  const total = responses.length || 1;
  const moderateShare = levelData.find((d) => d.level === 3)?.percentage || '0.0';

  const cards = [
    { title: 'Average Level', value: Number(average).toFixed(2), tone: 'from-purple-500 to-purple-700' },
    { title: 'Most Common Level', value: `Level ${highestLevel?.level || '-'}`, tone: 'from-blue-500 to-blue-600' },
    { title: 'Moderate Share', value: `${moderateShare}%`, tone: 'from-green-500 to-green-600' },
    { title: 'Total Respondents', value: total, tone: 'from-yellow-400 to-yellow-500' },
  ];

  const findings = [
    `${moderateShare}% report moderate exam stress (Level 3).`,
    `Highest concentration is at Level ${highestLevel?.level || '-'}.`,
    `Average exam stress sits at ${Number(average).toFixed(2)} out of 5.`,
    'Interventions should prioritize managing Level 3-4 workloads.',
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Exam Stress</h2>
        <p className="text-sm text-gray-600">Stress levels distribution across all respondents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.title} className={`bg-gradient-to-br ${card.tone} text-white rounded-lg p-5 shadow-md`}>
            <p className="text-sm opacity-90">{card.title}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Exam Stress Levels (1-5)</h3>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={levelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" tick={{ fill: '#6b7280' }} />
            <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 0 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-3">Key Findings</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {findings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamStress;
