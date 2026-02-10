import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Shield, TrendingUp, AlertTriangle, CheckCircle, Filter } from 'lucide-react';
import { jobsAPI } from '../utils/api';
import { SafeFlexScore } from './SafeFlexScore';
import { generateSafeFlexScoreData, generateFlexibilityBreakdown } from '../utils/scoreGenerator';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  safetyScore: number;
  flexibilityScore: number;
  description: string;
  fairnessWarning: boolean;
  greenFlags: string[];
  redFlags: string[];
}

export function JobBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<'safeflex' | 'flexibility'>('safeflex');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.getAll();

      // If no jobs exist, initialize with sample data
      if (!response.jobs || response.jobs.length === 0) {
        await jobsAPI.init();
        const newResponse = await jobsAPI.getAll();
        setJobs(newResponse.jobs || []);
      } else {
        setJobs(response.jobs);
      }
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <p className="text-red-800 mb-4">{error}</p>
            <button
              onClick={loadJobs}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Board with Safe-Flex Scores</h1>
          <p className="text-xl text-gray-600">
            Every listing includes AI-powered workplace culture metrics
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Score Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="text-gray-700">Safety Score: Workplace culture & psychological safety</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-pink-600" />
              <span className="text-gray-700">Flexibility Score: Work-life balance & arrangements</span>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${selectedJob?.id === job.id
                  ? 'border-purple-500 ring-2 ring-purple-200'
                  : 'border-purple-100 hover:border-purple-300'
                  }`}
              >
                {/* Job Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    {job.fairnessWarning && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Fairness Alert</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>
                </div>

                {/* Safe-Flex Scores */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">Safety Score</span>
                      </div>
                      <span className="text-sm font-semibold text-purple-700">{job.safetyScore}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                        style={{ width: `${job.safetyScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-pink-600" />
                        <span className="text-sm font-medium">Flexibility Score</span>
                      </div>
                      <span className="text-sm font-semibold text-pink-700">{job.flexibilityScore}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all"
                        style={{ width: `${job.flexibilityScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Flags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.greenFlags.slice(0, 2).map((flag) => (
                    <span
                      key={flag}
                      className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-lg"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {flag}
                    </span>
                  ))}
                  {job.redFlags.length > 0 && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-lg">
                      <AlertTriangle className="w-3 h-3" />
                      {job.redFlags.length} concern{job.redFlags.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Job Detail Panel */}
          <div className="hidden lg:block sticky top-24 h-fit">
            {selectedJob ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedJob.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">{selectedJob.company}</p>

                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => setActiveTab('safeflex')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'safeflex' ? 'bg-white shadow text-purple-700' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Safe-Flex Score
                  </button>
                  <button
                    onClick={() => setActiveTab('flexibility')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'flexibility' ? 'bg-white shadow text-pink-700' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Flexibility Breakdown
                  </button>
                </div>

                <div className="mt-6 mb-8">
                  <SafeFlexScore
                    overallScore={
                      activeTab === 'safeflex'
                        ? Math.round((selectedJob.safetyScore + selectedJob.flexibilityScore) / 2)
                        : selectedJob.flexibilityScore
                    }
                    companyName={selectedJob.company}
                    factors={
                      activeTab === 'safeflex'
                        ? generateSafeFlexScoreData(selectedJob)
                        : generateFlexibilityBreakdown(selectedJob)
                    }
                    variant={activeTab}
                  />
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all">
                  Apply Now
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-purple-100 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}