import React, { useMemo, useState } from 'react';
import './App.css';
import data from './data/respondents.json';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import RespondentProfile from './components/RespondentProfile';
import AcademicStress from './components/AcademicStress';
import ExamStress from './components/ExamStress';
import StressFactors from './components/StressFactors';
import CopingMechanisms from './components/CopingMechanisms';
import { getAverageExamStress, getCompleteResponseCount } from './utils/dataProcessing';

const App = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const responses = useMemo(() => data.responses || [], []);

  const totalRespondents = data.total_respondents || responses.length;
  const completeResponses = useMemo(() => getCompleteResponseCount(responses), [responses]);
  const averageStress = useMemo(() => getAverageExamStress(responses), [responses]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview responses={responses} />;
      case 'profile':
        return <RespondentProfile data={responses} />;
      case 'academic':
        return <AcademicStress responses={responses} />;
      case 'exams':
        return <ExamStress responses={responses} />;
      case 'factors':
        return <StressFactors responses={responses} />;
      case 'coping':
        return <CopingMechanisms responses={responses} />;
      default:
        return <Overview responses={responses} />;
    }
  };

  return (
    <div className="app-shell">
      <Header
        totalRespondents={totalRespondents}
        completeResponses={completeResponses}
        averageStress={averageStress}
      />
      <div className="app-content">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="bg-gray-50 min-h-screen">{renderSection()}</main>
      </div>
    </div>
  );
};

export default App;
