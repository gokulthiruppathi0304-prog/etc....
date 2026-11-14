import React, { useState } from 'react';
import { 
  CheckSquare, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  BookOpen
} from 'lucide-react';
import api from '../services/api';

const AVAILABLE_TEST_SKILLS = [
  "FastAPI",
  "React",
  "Python",
  "Docker",
  "SQL",
  "Git",
  "Machine Learning"
];

export default function AssessmentLab({ 
  onAssessmentCompleted, 
  readinessScore, 
  profile 
}) {
  const [selectedSkill, setSelectedSkill] = useState(AVAILABLE_TEST_SKILLS[0]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [question_id]: option_id }
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = async (skillToTest = selectedSkill) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setAnswers({});
    try {
      const data = await api.generateAssessment(skillToTest, 4);
      setQuestions(data.questions || []);
      setSelectedSkill(skillToTest);
      setQuizStarted(true);
    } catch (err) {
      setError(err.message || 'Failed to generate assessment questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmitQuiz = async () => {
    // Check all questions answered
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      setError(`Please select an answer for all questions (${unanswered.length} remaining).`);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const formattedAnswers = Object.entries(answers).map(([qid, oid]) => ({
        question_id: qid,
        selected_option_id: oid
      }));

      const evalData = await api.evaluateAssessment(selectedSkill, formattedAnswers);
      setResult(evalData);
      
      // Notify parent to re-fetch profile, twin, and analytics
      if (onAssessmentCompleted) {
        onAssessmentCompleted(evalData);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit assessment evaluation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetLab = () => {
    setQuizStarted(false);
    setQuestions([]);
    setAnswers({});
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Interactive Skill Diagnostic</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            AI Assessment Lab
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Validate competencies to convert self-reported <strong className="text-amber-300">[ESTIMATED]</strong> skills into verified <strong className="text-emerald-400">[ASSESSED]</strong> credentials.
          </p>
        </div>

        {quizStarted && (
          <button
            onClick={resetLab}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-white/10 transition flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Change Subject</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* View 1: Skill Picker (when not started) */}
      {!quizStarted && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-lg text-white">Select a Skill to Diagnose</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              The Assessment Agent will curate 4 diagnostic multiple-choice questions to evaluate your theoretical and applied competency.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {AVAILABLE_TEST_SKILLS.map((skill) => {
              const isSelected = selectedSkill === skill;
              const isAssessed = (profile?.current_skills || []).some(
                s => s.name.toLowerCase() === skill.toLowerCase() && s.status === 'ASSESSED'
              );

              return (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-gradient-to-b from-brand-violet/20 to-brand-blue/20 border-brand-violet text-white shadow-glow-sm' 
                      : 'bg-navy-800/80 hover:bg-navy-750 border-white/5 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-extrabold text-sm block">{skill}</span>
                    <span className="text-[11px] text-slate-400 block">4 Questions</span>
                  </div>

                  <div className="mt-3">
                    {isAssessed ? (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-400">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-300 font-semibold">
                        Needs Verification
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => startQuiz()}
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet hover:from-brand-indigo hover:to-brand-purple text-white font-bold text-sm shadow-glow-md transition flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Questions...</span>
                </>
              ) : (
                <>
                  <span>Begin {selectedSkill} Diagnostic</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* View 2: Active Quiz Questions */}
      {quizStarted && !result && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-navy-800/80 border border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300">
              Assessing: <strong className="text-white text-sm">{selectedSkill}</strong>
            </span>
            <span className="text-brand-cyan font-bold">
              {Object.keys(answers).length} of {questions.length} Answered
            </span>
          </div>

          <div className="space-y-5">
            {questions.map((q, idx) => (
              <div key={q.id} className="glass-panel p-6 rounded-2xl space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet">
                    Question {idx + 1}
                  </span>
                  <span className="text-[11px] text-slate-400">{q.difficulty} Level</span>
                </div>

                <h4 className="font-extrabold text-sm sm:text-base text-white leading-relaxed">
                  {q.question}
                </h4>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const isChosen = answers[q.id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition flex items-center space-x-3 ${
                          isChosen 
                            ? 'bg-brand-violet/20 border-brand-violet text-white shadow-sm' 
                            : 'bg-navy-800/60 hover:bg-navy-800 border-white/5 text-slate-300'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isChosen ? 'bg-brand-violet text-white' : 'bg-navy-750 text-slate-400'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet hover:from-brand-indigo hover:to-brand-purple text-white font-bold text-sm shadow-glow-md transition flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Answers...</span>
                </>
              ) : (
                <>
                  <CheckSquare className="w-4 h-4" />
                  <span>Submit Diagnostic Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* View 3: Result Summary & Detailed Explanations */}
      {result && (
        <div className="space-y-6">
          
          {/* Result Score Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border text-center space-y-4 ${
            result.passed 
              ? 'bg-gradient-to-b from-emerald-500/15 via-navy-850 to-navy-900 border-emerald-500/30' 
              : 'bg-gradient-to-b from-amber-500/15 via-navy-850 to-navy-900 border-amber-500/30'
          }`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg ${
              result.passed ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-navy-950'
            }`}>
              {result.passed ? <Award className="w-8 h-8" /> : <HelpCircle className="w-8 h-8" />}
            </div>

            <div className="space-y-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${result.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {result.passed ? 'Assessment Passed & Verified' : 'Practice Recommended'}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white">
                {result.score}% Score
              </h3>
              <p className="text-xs text-slate-400">
                {result.correct_count} of {result.total_questions} questions answered correctly
              </p>
            </div>

            <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
              {result.evaluation_summary}
            </p>

            {result.passed ? (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Status upgraded to verified [ASSESSED]</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <span>Adaptive Roadmap marked this skill for targeted revision</span>
              </div>
            )}
          </div>

          {/* Detailed Question Reviews */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-base text-white">Answer Explanations</h4>

            {(result.reviews || []).map((rev, i) => (
              <div key={rev.question_id || i} className="glass-panel p-5 rounded-2xl space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-400">Question {i + 1}</span>
                  {rev.is_correct ? (
                    <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-rose-400 font-bold text-xs">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect</span>
                    </span>
                  )}
                </div>

                <p className="font-bold text-sm text-slate-100">{rev.question}</p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-navy-800/80 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Your Answer:</span>
                    <span className={`font-bold ${rev.is_correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                      Option {rev.selected_option_id}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy-800/80 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Correct Answer:</span>
                    <span className="font-bold text-emerald-400">
                      Option {rev.correct_option_id}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-850 border border-white/5 text-xs text-slate-300">
                  <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider block mb-1">
                    Explanation
                  </span>
                  <p className="leading-relaxed">{rev.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={resetLab}
              className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 font-bold text-xs border border-white/10 transition"
            >
              Take Another Diagnostic Test
            </button>
            <button
              onClick={() => startQuiz(selectedSkill)}
              className="px-4 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-xs transition"
            >
              Retake This Assessment
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
