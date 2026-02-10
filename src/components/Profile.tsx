import { User, Mail, MapPin, Briefcase, Award, Shield, Bell, Lock } from 'lucide-react';

export function Profile() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                  JD
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Jessica Doe</h2>
                  <p className="text-gray-600 mb-4">Senior Product Manager</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      jessica.doe@email.com
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Singapore
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    defaultValue="Experienced product leader with 8+ years building scalable platforms. Passionate about creating inclusive workplace cultures and mentoring women in tech."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {['Product Strategy', 'User Research', 'Data Analysis', 'Agile', 'Team Leadership', 'Stakeholder Management'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Job Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Roles
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Product Manager, UX Lead"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Safety Score
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="80"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Any</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Arrangement
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Open to all</option>
                    <option>Remote only</option>
                    <option>Hybrid</option>
                    <option>Flexible hours</option>
                    <option>Job-share</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">24</div>
                    <div className="text-sm text-gray-600">Jobs Viewed</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">8</div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">2</div>
                    <div className="text-sm text-gray-600">Companies Reviewed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Notifications</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Privacy</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Security</span>
                </button>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Singpass Verification</h3>
              <p className="text-sm text-purple-100 mb-4">
                Verify your employment status to access Shield Protocol and unlock all features.
              </p>
              <button className="w-full py-2 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                Verify with Singpass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
