import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LearnerProfile from './components/LearnerProfile';
import DigitalTwin from './components/DigitalTwin';
import SkillGapAnalyzer from './components/SkillGapAnalyzer';
import CareerMatching from './components/CareerMatching';
import LearningRoadmap from './components/LearningRoadmap';
import AssessmentLab from './components/AssessmentLab';
import ProgressAnalytics from './components/ProgressAnalytics';
import CareerMentor from './components/CareerMentor';
import AgentCommandCenter from './components/AgentCommandCenter';
import api from './services/api';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Data States
  const [profile, setProfile] = useState(null);
  const [readinessScore, setReadinessScore] = useState(58);
  const [storageNotice, setStorageNotice] = useState('');
  const [storageMode, setStorageMode] = useState('temporary_in_memory');
  const [activities, setActivities] = useState([]);
  
  const [gaps, setGaps] = useState([]);
  const [chartComparison, setChartComparison] = useState([]);
  const [learningRecommendations, setLearningRecommendations] = useState([]);
  
  const [careerMatches, setCareerMatches] = useState([]);
  const [disclaimer, setDisclaimer] = useState('');
  
  const [roadmap, setRoadmap] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [lastReport, setLastReport] = useState(null);

  // Loading & Action States
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  // Load all platform data
  const loadAllData = async () => {
    try {
      const [
        profileRes,
        analysisRes,
        careerRes,
        roadmapRes,
        progressRes,
        agentsRes
      ] = await Promise.all([
        api.getProfile(),
        api.analyzeSkills(),
        api.matchCareers(),
        api.getRoadmap(),
        api.getProgress(),
        api.getAgentsStatus()
      ]);

      if (profileRes?.profile) {
        setProfile(profileRes.profile);
        setReadinessScore(profileRes.profile.readiness_score || 58);
        setStorageNotice(profileRes.storage_notice || '');
        setStorageMode(profileRes.storage_mode || 'temporary_in_memory');
        setActivities(profileRes.activities || []);
      }

      if (analysisRes) {
        setGaps(analysisRes.all_gaps || []);
        setChartComparison(analysisRes.chart_comparison || []);
        setLearningRecommendations(analysisRes.learning_recommendations || []);
        if (analysisRes.readiness_score) {
          setReadinessScore(analysisRes.readiness_score);
        }
      }

      if (careerRes) {
        setCareerMatches(careerRes.career_matches || []);
        setDisclaimer(careerRes.disclaimer || '');
      }

      if (roadmapRes?.roadmap) {
        setRoadmap(roadmapRes.roadmap);
      }

      if (progressRes) {
        setProgressData(progressRes);
      }

      if (agentsRes?.agents) {
        setAgents(agentsRes.agents);
      }
    } catch (err) {
      console.error('Error loading platform state:', err);
      setGlobalError('Unable to connect to the SkillPath AI backend. Please verify that FastAPI is running on port 8000.');
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers
  const handleUpdateProfile = async (updatedData) => {
    setIsSaving(true);
    try {
      const res = await api.updateProfile(updatedData);
      setProfile(res.profile);
      setReadinessScore(res.readiness_score);
      // Reload dependent modules
      await loadAllData();
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDemo = async () => {
    setIsSyncing(true);
    try {
      const res = await api.resetDemoData();
      setProfile(res.profile);
      setReadinessScore(res.readiness_score);
      await loadAllData();
      setActiveTab('dashboard');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleTask = async (weekNumber, taskId, completed) => {
    try {
      const res = await api.toggleRoadmapTask(weekNumber, taskId, completed);
      setRoadmap(res.roadmap);
      // Refresh progress data
      const progRes = await api.getProgress();
      setProgressData(progRes);
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const handleSetTargetCareer = async (newCareerTitle) => {
    setIsSyncing(true);
    try {
      const res = await api.updateProfile({ target_career: newCareerTitle });
      setProfile(res.profile);
      setReadinessScore(res.readiness_score);
      await loadAllData();
      setActiveTab('skill-gaps');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAssessmentCompleted = async (evalResult) => {
    await loadAllData();
  };

  const handleTriggerPipeline = async () => {
    setIsSyncing(true);
    try {
      const report = await api.triggerPipeline();
      setLastReport(report);
      setReadinessScore(report.readiness_score);
      await loadAllData();
    } catch (err) {
      console.error('Pipeline error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center space-y-4 p-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-violet flex items-center justify-center shadow-glow-md animate-pulse">
          <Loader2 className="w-7 h-7 text-white animate-spin" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white">Initializing SkillPath AI 2.0</h2>
          <p className="text-xs text-slate-400">Synchronizing 8 specialized agents and digital twin models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      
      {/* Top Navbar */}
      <Navbar
        profile={profile}
        readinessScore={readinessScore}
        storageNotice={storageNotice}
        storageMode={storageMode}
        onResetDemo={handleResetDemo}
        onTriggerPipeline={handleTriggerPipeline}
        isSyncing={isSyncing}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Global Connection Error Banner */}
      {globalError && (
        <div className="bg-rose-500/15 border-b border-rose-500/30 px-4 py-2.5 text-center text-xs text-rose-300 flex items-center justify-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              profile={profile}
              readinessScore={readinessScore}
              roadmap={roadmap}
              gaps={gaps}
              activities={activities}
              onNavigate={setActiveTab}
              onTriggerPipeline={handleTriggerPipeline}
              isSyncing={isSyncing}
            />
          )}

          {activeTab === 'profile' && (
            <LearnerProfile
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onResetDemo={handleResetDemo}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'digital-twin' && (
            <DigitalTwin
              profile={profile}
              readinessScore={readinessScore}
              onNavigate={setActiveTab}
              onTriggerPipeline={handleTriggerPipeline}
              isSyncing={isSyncing}
            />
          )}

          {activeTab === 'skill-gaps' && (
            <SkillGapAnalyzer
              gaps={gaps}
              chartComparison={chartComparison}
              targetCareer={profile?.target_career}
              readinessScore={readinessScore}
              onNavigate={setActiveTab}
              learningRecommendations={learningRecommendations}
            />
          )}

          {activeTab === 'career-matching' && (
            <CareerMatching
              careers={careerMatches}
              currentProfile={profile}
              onSetTargetCareer={handleSetTargetCareer}
              disclaimer={disclaimer}
            />
          )}

          {activeTab === 'roadmap' && (
            <LearningRoadmap
              roadmap={roadmap}
              onToggleTask={handleToggleTask}
              targetCareer={profile?.target_career}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'assessment-lab' && (
            <AssessmentLab
              onAssessmentCompleted={handleAssessmentCompleted}
              readinessScore={readinessScore}
              profile={profile}
            />
          )}

          {activeTab === 'analytics' && (
            <ProgressAnalytics
              progressData={progressData}
              readinessScore={readinessScore}
              targetCareer={profile?.target_career}
              profile={profile}
            />
          )}

          {activeTab === 'mentor' && (
            <CareerMentor
              profile={profile}
              roadmap={roadmap}
            />
          )}

          {activeTab === 'command-center' && (
            <AgentCommandCenter
              agents={agents}
              onTriggerPipeline={handleTriggerPipeline}
              isSyncing={isSyncing}
              lastReport={lastReport}
            />
          )}
        </main>

      </div>

    </div>
  );
}
