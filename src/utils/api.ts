import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-00525c18`;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// Job Board API
export const jobsAPI = {
  getAll: () => fetchAPI('/jobs'),
  getById: (id: string) => fetchAPI(`/jobs/${id}`),
  init: () => fetchAPI('/jobs/init', { method: 'POST' }),
};

// Shield Protocol API
export const shieldAPI = {
  submitReport: (data: {
    reportType: string;
    description: string;
    isAnonymous: boolean;
    company?: string;
    department?: string;
  }) => fetchAPI('/shield/report', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getStats: () => fetchAPI('/shield/stats'),
};

// Flex-Match API
export const flexMatchAPI = {
  getPartners: () => fetchAPI('/flex-match/partners'),
  init: () => fetchAPI('/flex-match/init', { method: 'POST' }),
};

// Amplify Portfolio API
export const amplifyAPI = {
  getExperiences: () => fetchAPI('/amplify/experiences'),
  transform: (original: string) => fetchAPI('/amplify/transform', {
    method: 'POST',
    body: JSON.stringify({ original }),
  }),
};

// Profile API
export const profileAPI = {
  get: (userId: string) => fetchAPI(`/profile/${userId}`),
  update: (userId: string, data: any) => fetchAPI(`/profile/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Network Graph API
export const nexusAPI = {
  getNetwork: () => fetchAPI('/nexus/network'),
};
