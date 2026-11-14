import React, { useState } from 'react';
import { 
  User, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw, 
  Sparkles,
  BookOpen,
  Clock,
  Layers,
  ShieldCheck
} from 'lucide-react';

const CAREER_OPTIONS = [
  "Full-Stack AI Engineer",
  "Data Scientist & ML Specialist",
  "Cloud DevOps & Platform Engineer",
  "Frontend Architect & UI Engineer",
  "Backend Systems & API Engineer",
  "Cybersecurity & DevSecOps Analyst"
];

const EDUCATION_LEVELS = [
  "High School Student",
  "Undergraduate (Computer Science)",
  "Undergraduate (Non-CS Engineering / Sciences)",
  "Graduate / Master's Student",
  "Bootcamp Student / Self-Taught Developer",
  "Career Switcher / Junior Professional"
];

export default function LearnerProfile({ profile, onUpdateProfile, onResetDemo, isSaving }) {
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [educationLevel, setEducationLevel] = useState(profile?.education_level || EDUCATION_LEVELS[1]);
  const [targetCareer, setTargetCareer] = useState(profile?.target_career || CAREER_OPTIONS[0]);
  const [learningStyle, setLearningStyle] = useState(profile?.learning_style || 'Hands-on projects with code reviews');
  const [weeklyHours, setWeeklyHours] = useState(profile?.weekly_hours_commitment || 12);
  const [skills, setSkills] = useState(profile?.current_skills || []);
  const [interests, setInterests] = useState(profile?.interests || []);
  
  // Local state for adding a skill
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  // Local state for adding an interest
  const [newInterest, setNewInterest] = useState('');

  // Status message
  const [notification, setNotification] = useState(null);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    // Check if already exists
    if (skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      setNotification({ type: 'error', text: `Skill "${newSkillName}" is already listed.` });
      return;
    }

    const updated = [
      ...skills,
      {
        name: newSkillName.trim(),
        level: newSkillLevel,
        status: 'ESTIMATED',
        assessed_score: null
      }
    ];
    setSkills(updated);
    setNewSkillName('');
    setNotification({ type: 'success', text: `Added ${newSkillName.trim()} (${newSkillLevel}) to skills.` });
  };

  const handleRemoveSkill = (skillNameToRemove) => {
    const updated = skills.filter(s => s.name !== skillNameToRemove);
    setSkills(updated);
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    if (interests.includes(newInterest.trim())) return;
    setInterests([...interests, newInterest.trim()]);
    setNewInterest('');
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setNotification({ type: 'error', text: 'Student name is required.' });
      return;
    }

    try {
      await onUpdateProfile({
        full_name: fullName,
        education_level: educationLevel,
        target_career: targetCareer,
        learning_style: learningStyle,
        weekly_hours_commitment: Number(weeklyHours),
        current_skills: skills,
        interests: interests,
      });

      setNotification({ 
        type: 'success', 
        text: 'Profile saved! AI Orchestrator has updated your Digital Twin and Roadmap.' 
      });

      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      setNotification({ type: 'error', text: err.message || 'Failed to save profile.' });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2.5">
            <User className="w-6 h-6 text-brand-violet" />
            <span>Learner Profile & Preferences</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure your technical background, career goals, and learning velocity parameters.
          </p>
        </div>

        <button
          onClick={onResetDemo}
          type="button"
          className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-white/10 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Demo Data</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl border flex items-center space-x-3 text-xs sm:text-sm transition-all ${
          notification.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
            <span>Identity & Academic Baseline</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Chen"
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-violet transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Education Level
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-violet transition"
              >
                {EDUCATION_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Target Career Goal */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 border-l-4 border-l-brand-violet">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet" />
              <span>Target Career Evolution Path</span>
            </h3>
            <span className="text-[11px] font-semibold text-brand-cyan">
              Adapts Roadmap Reactively
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Primary Target Role
            </label>
            <select
              value={targetCareer}
              onChange={(e) => setTargetCareer(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-violet transition font-bold"
            >
              {CAREER_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-2">
              Note: Changing your career goal immediately updates your Skill Gap Matrix, Roadmap Modules, and AI Digital Twin benchmarks.
            </p>
          </div>
        </div>

        {/* Section 3: Current Skills */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Current Technical Skills</span>
            </h3>
            <span className="text-xs text-slate-400">
              {skills.length} skills declared
            </span>
          </div>

          {/* Current Skill Chips */}
          <div className="flex flex-wrap gap-2.5 min-h-[48px] p-3 rounded-xl bg-navy-800/60 border border-white/5">
            {skills.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No skills added yet. Add your first skill below.</span>
            ) : (
              skills.map((s) => (
                <div 
                  key={s.name}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-navy-800 border border-white/10 text-xs shadow-sm"
                >
                  <span className="font-bold text-slate-100">{s.name}</span>
                  <span className="text-[10px] text-slate-400">({s.level})</span>
                  
                  {s.status === 'ASSESSED' ? (
                    <span className="inline-flex items-center space-x-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{s.assessed_score}%</span>
                    </span>
                  ) : (
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300">
                      ESTIMATED
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s.name)}
                    className="p-1 text-slate-400 hover:text-rose-400 transition"
                    title={`Remove ${s.name}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Skill Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g. Docker, TypeScript, SQL)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-navy-800 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-violet transition w-full"
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-navy-800 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-violet transition w-full sm:w-auto"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl bg-navy-750 hover:bg-navy-700 text-slate-200 font-semibold text-xs border border-white/10 transition flex items-center space-x-1 w-full sm:w-auto justify-center"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Section 4: Learning Preferences & Velocity */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-brand-pink" />
            <span>Learning Preferences & Study Commitment</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Preferred Learning Modality
              </label>
              <input
                type="text"
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}
                placeholder="e.g. Hands-on coding projects, video tutorials..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-violet transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Weekly Study Hours Commitment
                </label>
                <span className="text-xs font-bold text-brand-cyan">{weeklyHours} hours/week</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="2"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className="w-full accent-brand-violet cursor-pointer h-2 bg-navy-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>4 hrs (Micro)</span>
                <span>12 hrs (Standard)</span>
                <span>30 hrs (Bootcamp)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Interests & Subdomains */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Interests & Technology Domains</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-navy-800 border border-white/10 text-xs font-medium text-slate-200"
              >
                <span>{interest}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="p-0.5 text-slate-400 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add interest (e.g. Autonomous Agents, Microservices)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-navy-800 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-violet transition"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="px-3.5 py-2 rounded-xl bg-navy-750 hover:bg-navy-700 text-slate-200 font-semibold text-xs border border-white/10 transition flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet hover:from-brand-indigo hover:to-brand-purple text-white font-bold text-xs sm:text-sm shadow-glow-md transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Synchronizing Agents...' : 'Save Profile & Recalculate'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
