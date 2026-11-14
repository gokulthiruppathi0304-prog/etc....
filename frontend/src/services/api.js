/**
 * SkillPath AI 2.0 API Service Client
 * Handles HTTP communications between Vite Frontend and FastAPI Backend.
 */

const BASE_URL = ''; // Relative path, handled by Vite proxy to http://127.0.0.1:8000

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(errBody.detail || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // System Health
  getHealth: () => request('/health'),

  // Profile & Digital Twin
  getProfile: () => request('/api/profile'),
  updateProfile: (profileData) => request('/api/profile', {
    method: 'POST',
    body: JSON.stringify(profileData),
  }),
  resetDemoData: () => request('/api/demo/reset', {
    method: 'POST',
  }),

  // Skill Intelligence & Career Matching
  analyzeSkills: (targetCareer) => request('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ target_career: targetCareer }),
  }),
  matchCareers: () => request('/api/career-match', {
    method: 'POST',
    body: JSON.stringify({ include_all_domains: true }),
  }),

  // AI Assessment Lab
  generateAssessment: (skill, numQuestions = 4) => request('/api/assessment/generate', {
    method: 'POST',
    body: JSON.stringify({ skill, num_questions: numQuestions }),
  }),
  evaluateAssessment: (skill, answers) => request('/api/assessment/evaluate', {
    method: 'POST',
    body: JSON.stringify({ skill, answers }),
  }),

  // Adaptive Roadmap
  getRoadmap: () => request('/api/roadmap'),
  toggleRoadmapTask: (weekNumber, taskId, completed) => request('/api/roadmap/update', {
    method: 'POST',
    body: JSON.stringify({
      week_number: weekNumber,
      task_id: taskId,
      completed,
    }),
  }),

  // Progress Analytics
  getProgress: () => request('/api/progress'),

  // AI Career Mentor
  getMentorHistory: () => request('/api/mentor/history'),
  sendMentorMessage: (message, context = null) => request('/api/mentor/chat', {
    method: 'POST',
    body: JSON.stringify({ message, context }),
  }),

  // Agent Command Center
  getAgentsStatus: () => request('/api/agents/status'),
  triggerPipeline: () => request('/api/agents/trigger-pipeline', {
    method: 'POST',
  }),
};

export default api;
