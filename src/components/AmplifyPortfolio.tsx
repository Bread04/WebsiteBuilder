import { useState, useEffect } from 'react';
import { Sparkles, Plus, Eye, EyeOff, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { amplifyAPI } from '../utils/api';

interface Experience {
  id: string;
  original: string;
  transformed: string;
  skills: string[];
  dateRange: string;
}

const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: '1',
    original: 'Took time off to raise my two children, managing household schedules, budgeting, and conflict resolution.',
    transformed: 'Managed multi-stakeholder schedules and quarterly household budgets ($50k/yr). Mediated conflicts and fostered emotional intelligence development in a dynamic environment.',
    skills: ['Conflict Resolution', 'Budgeting', 'Time Management', 'Emotional Intelligence'],
    dateRange: 'Jan 2021 - Present'
  },
  {
    id: '2',
    original: 'Volunteered as PTA Treasurer. Collected dues and organized two fundraisers.',
    transformed: 'Oversaw financial operations for a non-profit organization. Successfully executed two large-scale fundraising events, increasing annual revenue by 15%.',
    skills: ['Financial Oversight', 'Event Planning', 'Revenue Growth', 'Non-profit Management'],
    dateRange: 'Sep 2019 - Dec 2020'
  }
];

export function AmplifyPortfolio() {
  const [showIdentity, setShowIdentity] = useState(false);
  const [newExperience, setNewExperience] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>(DEFAULT_EXPERIENCES);
  const [loading, setLoading] = useState(true);
  const [transforming, setTransforming] = useState(false);
  const [viewMode, setViewMode] = useState<'candidate' | 'recruiter'>('candidate');
  const [interviewRequested, setInterviewRequested] = useState(false);

  useEffect(() => {
    // Simulate loading or fetch if needed, but ensure defaults are shown for demo
    setLoading(false);
  }, []);

  async function loadExperiences() {
    try {
      setLoading(true);
      const response = await amplifyAPI.getExperiences();
      setExperiences(response.experiences || []);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleTransform() {
    if (!newExperience.trim()) return;

    try {
      setTransforming(true);
      // Mock transformation for demo purposes if API fails or for speed
      const mockResponse = {
        experience: {
          id: Date.now().toString(),
          original: newExperience,
          transformed: "Transformed: " + newExperience, // In real app, AI does this
          skills: ['Adaptability', 'Communication'],
          dateRange: 'Present'
        }
      };

      // Attempt API call, fallback to mock if it fails/is not implemented
      try {
        const response = await amplifyAPI.transform(newExperience);
        setExperiences([response.experience, ...experiences]);
      } catch (err) {
        console.warn("API unavailable, using mock", err);
        setExperiences([mockResponse.experience, ...experiences]);
      }

      setNewExperience('');
    } catch (error) {
      console.error('Error transforming experience:', error);
      alert('Failed to transform experience. Please try again.');
    } finally {
      setTransforming(false);
    }
  }

  const transformations = [
    { before: 'Household budget management', after: 'Financial Planning & Analysis' },
    { before: 'Meal planning for family', after: 'Supply Chain & Logistics Optimization' },
    { before: 'Teaching kids new skills', after: 'Training & Development' },
    { before: 'Resolving family conflicts', after: 'Mediation & Conflict Resolution' },
    { before: 'Planning family vacations', after: 'Project Management & Coordination' },
    { before: 'Home renovation project', after: 'Vendor Management & Quality Control' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {viewMode === 'candidate' ? (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Transform Caregiving Into Corporate Value</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Amplify Portfolio Builder
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AI-powered translation of caregiving gaps into valuable corporate skills. Generate blind skill exports that reveal your identity only after employer interest.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 mb-4">
                <p className="text-sm font-medium">Gap-Blind Matching Mode</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {interviewRequested ? 'Sarah Jenkins' : 'Candidate #8492'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {interviewRequested
                  ? 'Contact: sarah.jenkins@example.com | Available for interview'
                  : 'Skills-Matched Profile (94% Match) | Identity Hidden'}
              </p>
            </>
          )}

          <div className="mt-8 flex justify-center">
            <div className="bg-gray-100 p-1 rounded-xl flex">
              <button
                onClick={() => setViewMode('candidate')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'candidate' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Candidate View
              </button>
              <button
                onClick={() => setViewMode('recruiter')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'recruiter' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Recruiter View
              </button>
            </div>
          </div>
        </div>

        {/* Before/After Examples (Candidate Only) */}
        {viewMode === 'candidate' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              See the Transformation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transformations.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Original</div>
                    <p className="text-gray-700 italic">"{item.before}"</p>
                  </div>
                  <div className="flex items-center gap-2 my-3">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-pink-300" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-600 mb-2 font-medium">Amplified</div>
                    <p className="text-gray-900 font-medium">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Builder */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {viewMode === 'recruiter' ? 'Experience History' : 'Your Amplified Experiences'}
              </h2>

              {/* Add New Experience (Candidate Only) */}
              {viewMode === 'candidate' && (
                <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Add New Experience</h3>
                  <div className="space-y-3">
                    <textarea
                      value={newExperience}
                      onChange={(e) => setNewExperience(e.target.value)}
                      placeholder="Describe your caregiving or volunteer experience..."
                      rows={3}
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                      onClick={handleTransform}
                      disabled={transforming}
                    >
                      <Sparkles className="w-4 h-4" />
                      Transform with AI
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Experiences */}
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border border-purple-200 rounded-2xl overflow-hidden">
                    {/* Original (Candidate Only) */}
                    {viewMode === 'candidate' && (
                      <div className="bg-gray-50 p-4">
                        <div className="text-xs text-gray-500 mb-1 font-medium">ORIGINAL</div>
                        <p className="text-gray-700 italic">{exp.original}</p>
                      </div>
                    )}

                    {/* Transformed */}
                    <div className="bg-white p-4 border-t border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <div className="text-xs text-purple-600 font-semibold">AMPLIFIED</div>
                        </div>
                        {viewMode === 'recruiter' && (
                          <span className="text-xs text-gray-500 font-mono">
                            {interviewRequested ? exp.dateRange : '[Dates Hidden]'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-900 font-medium mb-4">{exp.transformed}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blind Resume Export (Candidate) OR Full Profile (Recruiter) */}
            {viewMode === 'candidate' ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Blind Skill Export</h2>
                <p className="text-gray-600 mb-6">
                  Generate a resume that strips your name and dates, revealing your identity only after the employer expresses interest in your verified skill set.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {showIdentity ? (
                        <Eye className="w-5 h-5 text-purple-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">Identity Protection</p>
                        <p className="text-sm text-gray-600">
                          {showIdentity ? 'Name and dates visible' : 'Name and dates hidden'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowIdentity(!showIdentity)}
                      className={`w-12 h-6 rounded-full transition-colors ${showIdentity ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${showIdentity ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                      />
                    </button>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all">
                    <Download className="w-5 h-5" />
                    Download Blind Resume
                  </button>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-medium mb-1">How it works</p>
                        <p>
                          Your resume focuses purely on skills and achievements. Once an employer clicks "Interested",
                          they'll receive your full profile with identity revealed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Profile Action Header */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 sticky top-4 z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {interviewRequested ? 'Sarah Jenkins' : 'Candidate #8492'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Match Score: <span className="text-green-600 font-bold">94%</span> • {interviewRequested ? 'Available immediately' : 'Available in 2 weeks'}
                      </p>
                    </div>

                    {interviewRequested ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Request Sent</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setInterviewRequested(true)}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-bold"
                      >
                        Request Interview
                      </button>
                    )}
                  </div>
                  {!interviewRequested && (
                    <p className="text-xs text-gray-500 mt-2 text-right">
                      Reveals full identity and timeline
                    </p>
                  )}
                </div>

                {/* Professional Summary */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Summary</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Results-oriented Operations Professional with over 10 years of experience managing complex logistics, budgets, and stakeholder relationships. Proven track record in high-pressure environments, demonstrating strong conflict resolution mediation and financial oversight capabilities. Specialized in translating ad-hoc challenges into structured, scalable processes.
                  </p>
                </div>

                {/* Skills Matrix */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Verified Skills</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Operations & Strategy</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Strategic Planning', 'Resource Allocation', 'Logistics Management', 'Process Optimization'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Financial Management</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Budgeting ($50k+)', 'Expense Tracking', 'Fundraising', 'Vendor Negotiations'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Leadership</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Conflict Resolution', 'Team Coordination', 'Stakeholder Management', 'Mentoring'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium border border-pink-100">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">Bachelor of Science, Business Administration</h4>
                        <p className="text-gray-600">University of Washington</p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                        {interviewRequested ? '2008 - 2012' : '[Year Hidden]'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Why Amplify?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Combat Resume Bias</p>
                    <p className="text-sm text-purple-100">
                      Remove signals that trigger unconscious bias (gaps, gender-coded names)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Translate Real Value</p>
                    <p className="text-sm text-purple-100">
                      Caregiving develops real skills that corporate environments value
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Skills-First Hiring</p>
                    <p className="text-sm text-purple-100">
                      Force employers to focus on capabilities, not career timelines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Reclaim Your Narrative</p>
                    <p className="text-sm text-purple-100">
                      Non-linear career paths are not deficits—they're diverse experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Impact Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Interview Rate</span>
                    <span className="text-sm font-semibold text-gray-900">+47%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '47%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">vs. traditional resume</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Employer Interest</span>
                    <span className="text-sm font-semibold text-gray-900">+62%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '62%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">with blind skill export</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Salary Offers</span>
                    <span className="text-sm font-semibold text-gray-900">+23%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '23%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">higher than pre-gap salary</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-900">Rachel T.</p>
                  <p className="text-sm text-gray-600">Now Sr. Operations Manager</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "Amplify helped me see that my 3-year caregiving break wasn't a gap—it was a masterclass
                in operations, crisis management, and stakeholder coordination. I'm now making 30% more
                than before my 'gap'."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}