import React, { useMemo } from 'react';
import {
  getYearLevelDistribution,
  getAverageExamStress,
  getAcademicStressors,
  getAcademicStressFrequency,
} from '../utils/dataProcessing';

const Overview = ({ responses }) => {
  const yearDist = useMemo(() => getYearLevelDistribution(responses), [responses]);
  const averageStress = useMemo(() => getAverageExamStress(responses), [responses]);
  const stressors = useMemo(() => getAcademicStressors(responses), [responses]);
  const stressFreq = useMemo(() => getAcademicStressFrequency(responses), [responses]);

  const total = responses.length;
  const topStressor = stressors[0]?.stressor || 'Projects';

  const metrics = [
    {
      title: 'Total Respondents',
      value: total,
      color: 'from-blue-500 to-blue-600',
      detail: `${yearDist.thirdYear.count} Third Year`,
    },
    {
      title: 'Year Split',
      value: `${yearDist.thirdYear.percentage}% / ${yearDist.fourthYear.percentage}%`,
      color: 'from-orange-400 to-orange-500',
      detail: '3rd Year / 4th Year',
    },
    {
      title: 'Avg Exam Stress',
      value: Number(averageStress).toFixed(2),
      color: 'from-purple-500 to-purple-600',
      detail: 'Scale 1-5',
    },
    {
      title: 'Top Stressor',
      value: topStressor,
      color: 'from-yellow-400 to-yellow-500',
      detail: `${stressors[0]?.percentage || '0.0'}% respondents`,
    },
  ];

  const quickInsights = [
    `${stressFreq.find((f) => f.frequency === 'Sometimes')?.percentage || '0.0'}% feel academic stress sometimes`,
    `${stressFreq.find((f) => f.frequency === 'Always')?.percentage || '0.0'}% experience constant stress`,
    `${yearDist.thirdYear.percentage}% are 3rd year students`,
    `${topStressor} appears most often among academic stressors`,
    `Average exam stress holds at ${Number(averageStress).toFixed(2)} out of 5`,
  ];

  const objectives = [
    'Identify dominant academic stressors impacting BSCS students',
    'Quantify exam-related stress and coping behavior patterns',
    'Recommend interventions for scheduling, resources, and guidance',
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className={`bg-gradient-to-br ${metric.color} text-white rounded-lg p-5 shadow-md`}
          >
            <p className="text-sm opacity-90">{metric.title}</p>
            <p className="text-3xl font-bold mt-1">{metric.value}</p>
            <p className="text-sm mt-1 opacity-90">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-3">Study Objectives</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {objectives.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-3">Quick Insights</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {quickInsights.map((insight) => (
              <li key={insight}>{insight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
