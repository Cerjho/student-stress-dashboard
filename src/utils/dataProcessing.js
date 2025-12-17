export const getYearLevelDistribution = (data = []) => {
  const filtered = data.filter((r) => r && r.year_level);
  const thirdYear = filtered.filter((r) => r.year_level === '3rd year').length;
  const fourthYear = filtered.filter((r) => r.year_level === '4th year').length;
  const total = filtered.length || 1;

  return {
    thirdYear: {
      count: thirdYear,
      percentage: ((thirdYear / total) * 100).toFixed(1),
    },
    fourthYear: {
      count: fourthYear,
      percentage: ((fourthYear / total) * 100).toFixed(1),
    },
    total: filtered.length,
  };
};

export const getAcademicStressFrequency = (data = []) => {
  const filtered = data.filter((r) => r && r.academic_stress_frequency);
  const total = filtered.length || 1;
  const frequencies = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

  return frequencies.map((freq) => {
    const count = filtered.filter((r) => r.academic_stress_frequency === freq).length;
    return {
      frequency: freq,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    };
  });
};

export const getExamStressLevels = (data = []) => {
  const filtered = data.filter((r) => r && r.exam_stress_level !== null && r.exam_stress_level !== undefined);
  const total = filtered.length || 1;
  const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];

  return [1, 2, 3, 4, 5].map((level, index) => {
    const count = filtered.filter((r) => r.exam_stress_level === level).length;
    return {
      level,
      label: labels[index],
      count,
      percentage: ((count / total) * 100).toFixed(1),
    };
  });
};

export const getAcademicStressors = (data = []) => {
  const valid = data.filter((r) => r && Array.isArray(r.academic_stressors) && r.academic_stressors.length > 0);
  const allStressors = valid.flatMap((r) => r.academic_stressors);
  const total = data.length || 1;

  const counts = {};
  allStressors.forEach((s) => {
    counts[s] = (counts[s] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([stressor, count]) => ({
      stressor,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count);
};

export const getSleepHoursDistribution = (data = []) => {
  const filtered = data.filter((r) => r && r.sleep_hours);
  const total = filtered.length || 1;
  const categories = ['3-4 hours', '5-6 hours', '7-8 hours', 'More than 8 hours'];

  return categories.map((label) => {
    const count = filtered.filter((r) => r.sleep_hours === label).length;
    return {
      label,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    };
  });
};

export const getEnvironmentalStressors = (data = []) => {
  const valid = data.filter(
    (r) => r && Array.isArray(r.environmental_stressors) && r.environmental_stressors.length > 0
  );
  const allStressors = valid.flatMap((r) => r.environmental_stressors);
  const total = data.length || 1;

  const counts = {};
  allStressors.forEach((s) => {
    counts[s] = (counts[s] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([stressor, count]) => ({
      stressor,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count);
};

export const getCopingMechanisms = (data = []) => {
  const valid = data.filter((r) => r && Array.isArray(r.coping_mechanisms) && r.coping_mechanisms.length > 0);
  const all = valid.flatMap((r) => r.coping_mechanisms);
  const total = data.length || 1;

  const counts = {};
  all.forEach((m) => {
    counts[m] = (counts[m] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([mechanism, count]) => ({
      mechanism,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count);
};

export const filterByYearLevel = (data = [], level) => {
  if (!level || level === 'All') return data;
  return data.filter((r) => r && r.year_level === level);
};

export const getAverageExamStress = (data = []) => {
  const filtered = data.filter((r) => r && r.exam_stress_level !== null && r.exam_stress_level !== undefined);
  if (filtered.length === 0) return 0;
  const total = filtered.reduce((sum, r) => sum + Number(r.exam_stress_level || 0), 0);
  return (total / filtered.length).toFixed(2);
};

export const getCompleteResponseCount = (data = []) => {
  const requiredFields = [
    'academic_stress_frequency',
    'exam_stress_level',
    'academic_stressors',
    'sleep_hours',
    'personal_issues_affect_performance',
    'school_environment_affects_stress',
    'environmental_stressors',
    'coping_mechanisms',
  ];

  return data.filter((r) => {
    if (!r) return false;
    return requiredFields.every((field) => {
      const value = r[field];
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== '';
    });
  }).length;
};

export const getSuggestions = (data = []) => {
  return data
    .filter((r) => r && r.suggestions)
    .map((r) => ({
      id: r.respondent_id,
      name: r.name,
      text: r.suggestions,
    }));
};

export const getPersonalIssuesImpact = (data = []) => {
  const filtered = data.filter((r) => r && r.personal_issues_affect_performance);
  const total = filtered.length || 1;
  const options = ['Yes', 'No', 'Sometimes'];

  return options.map((opt) => {
    const count = filtered.filter((r) => r.personal_issues_affect_performance === opt).length;
    return {
      label: opt,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    };
  });
};
