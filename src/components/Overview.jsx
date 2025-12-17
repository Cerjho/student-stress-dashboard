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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
          >
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{metric.title}</p>
            <p className="text-3xl font-light text-gray-900 mt-4">{metric.value}</p>
            <p className="text-sm text-gray-500 mt-2 font-light">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h3 className="text-xl font-light text-gray-900 mb-6">Study Objectives</h3>
          <ul className="space-y-3">
            {objectives.map((obj) => (
              <li key={obj} className="flex items-start">
                <span className="text-gray-400 mr-3">·</span>
                <span className="text-gray-600 font-light">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h3 className="text-xl font-light text-gray-900 mb-6">Quick Insights</h3>
          <ul className="space-y-3">
            {quickInsights.map((insight) => (
              <li key={insight} className="flex items-start">
                <span className="text-gray-400 mr-3">·</span>
                <span className="text-gray-600 font-light">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
