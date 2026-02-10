import { Link } from "react-router";
import {
  Shield,
  Briefcase,
  DollarSign,

  TrendingUp,
  Sparkles,
  ArrowRight,
  Award,
  Target,
  Users,
} from "lucide-react";
import { DataInitializer } from "./DataInitializer";

export function Home() {
  const features = [
    {
      icon: Briefcase,
      title: "Safe-Flex Score",
      description:
        "AI-powered workplace culture metrics based on real employee reviews",
      link: "/safety-score",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Shield Protocol",
      description:
        "Private incident reporting with zero-knowledge proofs for your safety",
      link: "/shield",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: TrendingUp,
      title: "Flex-Match",
      description:
        "Job-share matching for women seeking work-life balance",
      link: "/flex-match",
      color: "from-blue-500 to-blue-600",
    },

    {
      icon: Sparkles,
      title: "Amplify Portfolio",
      description:
        "Transform caregiving gaps into corporate value",
      link: "/amplify",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: DollarSign,
      title: "Benefits Wallet",
      description:
        "Visualize your Total Professional Worth & Economic Leverage",
      link: "/wallet",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const stats = [
    { label: "Active Users", value: "12,400+", icon: Users },
    { label: "Companies Rated", value: "850+", icon: Award },
    { label: "Job Matches", value: "3,200+", icon: Target },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm">
              <Award className="w-4 h-4" />
              <span>
                Supporting SDG 5 (Gender Equality) & SDG 8
                (Decent Work)
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Your Career, Your Terms
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beyond Binary shifts the power dynamic from employer
              to female talent. Navigate Singapore's employment
              market with confidence, safety, and data-driven
              insights.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                to="/jobs"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Explore Jobs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shield"
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-all"
              >
                <Shield className="w-4 h-4" />
                Learn About Shield
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Powered by AI Intelligence
            </h2>
            <p className="text-xl text-gray-600">
              A proactive digital agent that manages your
              professional identity and safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  to={feature.link}
                  className="group bg-white rounded-2xl p-8 shadow-sm border border-purple-100 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              How Beyond Binary Works
            </h2>
            <p className="text-xl text-gray-600">
              Your proactive partner in navigating Singapore's
              employment landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold">Analyze</h3>
              <p className="text-gray-600">
                AI analyzes workplace culture, salary fairness,
                and network dynamics
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold">Match</h3>
              <p className="text-gray-600">
                Get matched with opportunities that align with
                your values and needs
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold">Thrive</h3>
              <p className="text-gray-600">
                Navigate your career with confidence, safety,
                and strategic insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Initializer */}
      <DataInitializer />
    </div>
  );
}