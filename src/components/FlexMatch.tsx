import { useState, useEffect } from 'react';
import { Users, Clock, Briefcase, CheckCircle, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { flexMatchAPI } from '../utils/api';

interface JobSharePartner {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: string;
  matchScore: number;
  experience: string;
  timezone: string;
}

export function FlexMatch() {
  const [selectedPartner, setSelectedPartner] = useState<JobSharePartner | null>(null);
  const [partners, setPartners] = useState<JobSharePartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  async function loadPartners() {
    try {
      setLoading(true);
      const response = await flexMatchAPI.getPartners();
      
      // If no partners exist, initialize with sample data
      if (!response.partners || response.partners.length === 0) {
        await flexMatchAPI.init();
        const newResponse = await flexMatchAPI.getPartners();
        setPartners(newResponse.partners || []);
      } else {
        setPartners(response.partners);
      }
    } catch (error) {
      console.error('Error loading partners:', error);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      icon: Users,
      title: 'Complementary Skills',
      description: 'AI matches you with partners who have overlapping core skills but complementary specializations.',
    },
    {
      icon: Clock,
      title: 'Schedule Coordination',
      description: 'Automated handover logistics ensure seamless transitions and corporate performance.',
    },
    {
      icon: Briefcase,
      title: 'High-Level Roles',
      description: 'Access senior positions that were previously incompatible with caregiving responsibilities.',
    },
    {
      icon: Calendar,
      title: 'Flexible Arrangements',
      description: 'Design custom schedules that work for both partners and the employer.',
    },
  ];

  const benefits = [
    'Maintain career progression while managing caregiving duties',
    'Share a senior role with another talented professional',
    'Reduce burnout and improve work-life balance',
    'Learn from your job-share partner\'s expertise',
    'Prove the viability of flexible work arrangements',
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Breaking the Linear Career Model</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Flex-Match Algorithm
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two talented women, one high-level role. AI-powered job-share matching that enables career progression without sacrificing caregiving responsibilities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partner Matches */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Your Top Matches</h2>
              <span className="text-sm text-gray-600">{partners.length} partners found</span>
            </div>

            {partners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className={`bg-white rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                  selectedPartner?.id === partner.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-purple-100 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{partner.role}</p>
                    <p className="text-sm text-gray-500">{partner.experience}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {partner.matchScore}%
                    </div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Available:</span>
                    <span>{partner.availability}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {partner.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Set Your Preferences</p>
                    <p className="text-blue-100">Define your skills, availability, and ideal role</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold mb-1">AI Matches Partners</p>
                    <p className="text-blue-100">Algorithm finds complementary skills and schedules</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Connect & Coordinate</p>
                    <p className="text-blue-100">Meet your partner and plan handover logistics</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    4
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Apply Together</p>
                    <p className="text-blue-100">Submit joint application for senior roles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Why Job-Share?</h3>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Complete your profile to find your ideal job-share partner
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                Complete Profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              156
            </div>
            <div className="font-semibold text-gray-900">Active Job-Shares</div>
            <div className="text-sm text-gray-500">Currently working</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              94%
            </div>
            <div className="font-semibold text-gray-900">Success Rate</div>
            <div className="text-sm text-gray-500">Employer satisfaction</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              2.4x
            </div>
            <div className="font-semibold text-gray-900">Productivity Gain</div>
            <div className="text-sm text-gray-500">vs. single full-time</div>
          </div>
        </div>
      </div>
    </div>
  );
}