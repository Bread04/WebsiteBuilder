import { useState, useEffect } from 'react';
import { Shield, Lock, Users, AlertTriangle, CheckCircle, Eye, EyeOff, FileText } from 'lucide-react';
import { shieldAPI } from '../utils/api';

export function ShieldProtocol() {
  const [reportType, setReportType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({ totalReports: 0, collectiveActions: 0, companiesFlagged: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const response = await shieldAPI.getStats();
      setStats({
        totalReports: response.totalReports || 0,
        collectiveActions: response.collectiveActions || 0,
        companiesFlagged: response.companiesFlagged || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      await shieldAPI.submitReport({
        reportType,
        description,
        isAnonymous,
        company: company || undefined,
        department: department || undefined,
      });
      
      setSubmitted(true);
      
      // Reload stats
      await loadStats();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setReportType('');
        setDescription('');
        setCompany('');
        setDepartment('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const incidentTypes = [
    'Gender discrimination',
    'Harassment',
    'Unequal pay',
    'Maternity discrimination',
    'Microaggressions',
    'Career advancement barriers',
    'Other',
  ];

  const features = [
    {
      icon: Lock,
      title: 'Zero-Knowledge Proofs',
      description: 'Your identity remains private. Reports are encrypted and verified without revealing who you are.',
    },
    {
      icon: Users,
      title: 'Collective Action',
      description: 'When ≥3 verified reports target the same manager/department, automatic collective report is generated.',
    },
    {
      icon: Shield,
      title: 'Verified Employees Only',
      description: 'Singpass verification ensures only real employees can report, preventing fake reviews.',
    },
    {
      icon: FileText,
      title: 'Immutable Ledger',
      description: 'All incidents are logged in an immutable ledger that cannot be altered or deleted.',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Protected by Zero-Knowledge Proofs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shield Protocol
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Private incident reporting that protects your identity while enabling collective action against workplace harassment and discrimination
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.totalReports > 0 && (
            <div
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stats.totalReports}
              </div>
              <div className="font-semibold text-gray-900">Reports Filed</div>
              <div className="text-sm text-gray-500">Last 6 months</div>
            </div>
          )}
          {stats.collectiveActions > 0 && (
            <div
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stats.collectiveActions}
              </div>
              <div className="font-semibold text-gray-900">Collective Actions</div>
              <div className="text-sm text-gray-500">Successfully triggered</div>
            </div>
          )}
          {stats.companiesFlagged > 0 && (
            <div
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stats.companiesFlagged}
              </div>
              <div className="font-semibold text-gray-900">Companies Flagged</div>
              <div className="text-sm text-gray-500">Pattern detected</div>
            </div>
          )}
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
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Report Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">File a Report</h2>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted</h3>
                <p className="text-gray-600">
                  Your report has been encrypted and stored securely. Your identity remains protected.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Incident Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Type
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select type...</option>
                    {incidentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Describe the incident... (encrypted and private)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    required
                  />
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      isAnonymous ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        isAnonymous ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {isAnonymous ? (
                        <EyeOff className="w-4 h-4 text-purple-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="font-medium text-gray-900">
                        {isAnonymous ? 'Anonymous Report' : 'Identified Report'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {isAnonymous
                        ? 'Your identity is protected by zero-knowledge proofs'
                        : 'Your identity will be shared with relevant authorities'}
                    </p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Collective Action Trigger</p>
                      <p>
                        If 3 or more verified reports are filed against the same manager or department,
                        the system automatically generates a collective report for HR/MOM.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  {submitting ? 'Submitting...' : 'Submit Secure Report'}
                </button>
              </form>
            )}
          </div>

          {/* How It Works */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Verify Identity</h3>
                    <p className="text-purple-100 text-sm">
                      Singpass verification confirms you're an actual employee without revealing your identity
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Encrypt & Submit</h3>
                    <p className="text-purple-100 text-sm">
                      Your report is encrypted using zero-knowledge proofs and stored in an immutable ledger
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pattern Detection</h3>
                    <p className="text-purple-100 text-sm">
                      AI monitors for patterns. When threshold is met, collective action is triggered automatically
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Safe Action</h3>
                    <p className="text-purple-100 text-sm">
                      Collective report is sent to HR/MOM, removing the risk of being an individual target
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Why Shield Protocol?</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  Traditional reporting systems put the burden and risk on individual women, often leading to retaliation or career damage.
                </p>
                <p>
                  Shield Protocol uses <span className="font-semibold text-purple-600">cryptographic zero-knowledge proofs</span> to verify your employment status without revealing your identity, enabling safe reporting.
                </p>
                <p>
                  By waiting for a threshold of reports before taking action, the system removes the "individual target" problem and enables collective power.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}