import { useState, useEffect, useRef } from 'react';
import { Network, TrendingUp, Users, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  role: string;
  influence: number;
  isBridge: boolean;
  connections: number;
}

export function NexusGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  const userNode: NetworkNode = {
    id: 'user',
    name: 'You',
    role: 'Senior Analyst',
    influence: 42,
    isBridge: false,
    connections: 8,
  };

  const networkNodes: NetworkNode[] = [
    {
      id: '1',
      name: 'Lisa Tan',
      role: 'VP of Engineering',
      influence: 95,
      isBridge: true,
      connections: 24,
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Product Director',
      influence: 88,
      isBridge: true,
      connections: 19,
    },
    {
      id: '3',
      name: 'Sarah Wong',
      role: 'Design Lead',
      influence: 76,
      isBridge: false,
      connections: 12,
    },
    {
      id: '4',
      name: 'David Lee',
      role: 'Senior Manager',
      influence: 64,
      isBridge: false,
      connections: 10,
    },
    {
      id: '5',
      name: 'Rachel Lim',
      role: 'Team Lead',
      influence: 58,
      isBridge: false,
      connections: 8,
    },
  ];

  const recommendations = [
    {
      node: networkNodes[0],
      reason: 'Bridge node to executive leadership',
      action: 'Request informational interview',
      impact: '+32% influence',
    },
    {
      node: networkNodes[1],
      reason: 'Central to product org decision-making',
      action: 'Join cross-functional project',
      impact: '+28% influence',
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw network graph
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    // User node in center
    const userX = centerX;
    const userY = centerY;

    // Draw connections first
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;

    networkNodes.forEach((node, index) => {
      const angle = (index / networkNodes.length) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Draw line to user
      ctx.beginPath();
      ctx.moveTo(userX, userY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Draw some inter-node connections
      if (index < networkNodes.length - 1) {
        const nextAngle = ((index + 1) / networkNodes.length) * Math.PI * 2 - Math.PI / 2;
        const nextX = centerX + Math.cos(nextAngle) * radius;
        const nextY = centerY + Math.sin(nextAngle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }
    });

    // Draw nodes
    networkNodes.forEach((node, index) => {
      const angle = (index / networkNodes.length) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const nodeRadius = 6 + (node.influence / 100) * 8;

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = node.isBridge ? '#8b5cf6' : '#60a5fa';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Name label
      ctx.fillStyle = '#374151';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, x, y + nodeRadius + 14);
    });

    // Draw user node
    ctx.beginPath();
    ctx.arc(userX, userY, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#ec4899';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('You', userX, userY + 25);

  }, [networkNodes]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 mb-4">
            <Network className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by Graph Theory</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nexus Network Graph
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Map your professional network using discrete mathematics. Identify if you're structurally isolated and discover strategic connections to increase your influence.
          </p>
        </div>

        {/* Network Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userNode.influence}</div>
                <div className="text-sm text-gray-600">Influence Score</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Betweenness Centrality</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userNode.connections}</div>
                <div className="text-sm text-gray-600">Direct Connections</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">First-degree network</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Network className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-600">Bridge Nodes</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Key connectors identified</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Peripheral</div>
                <div className="text-sm text-gray-600">Network Position</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Action recommended</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Network Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Network Map</h2>
              
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-6">
                <canvas
                  ref={canvasRef}
                  className="w-full"
                  style={{ height: '400px' }}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded-full" />
                  <span className="text-gray-700">You</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full" />
                  <span className="text-gray-700">Bridge Nodes (High Influence)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded-full" />
                  <span className="text-gray-700">Regular Connections</span>
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Network Analysis</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">Structural Isolation Detected</p>
                    <p className="text-sm text-amber-800">
                      You're currently positioned in a peripheral node with limited access to decision-makers.
                      Your betweenness centrality is low (42), which may impact career advancement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Growth Opportunity</p>
                    <p className="text-sm text-blue-800">
                      By connecting with 2 identified bridge nodes, you could increase your influence score
                      by up to 60%, moving from peripheral to intermediate network position.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Smart Recommendations</h3>
              <p className="text-sm text-purple-100 mb-4">
                AI-powered suggestions to increase your betweenness centrality and network influence
              </p>

              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{rec.node.name}</h4>
                        <p className="text-xs text-purple-100 mb-1">{rec.node.role}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                            Influence: {rec.node.influence}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-purple-200">Why:</span>
                        <p className="text-white">{rec.reason}</p>
                      </div>
                      <div>
                        <span className="text-purple-200">Action:</span>
                        <p className="text-white">{rec.action}</p>
                      </div>
                      <div className="flex items-center gap-2 text-green-300 font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        {rec.impact}
                      </div>
                    </div>

                    <button className="w-full mt-3 py-2 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium text-sm">
                      Connect Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Understanding Graph Theory */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Understanding Network Metrics</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900 mb-1">Betweenness Centrality</p>
                  <p className="text-gray-600">
                    Measures how often you appear on the shortest path between other people. Higher = more influence.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Bridge Nodes</p>
                  <p className="text-gray-600">
                    Individuals who connect different groups. They have outsized influence on information flow.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Structural Isolation</p>
                  <p className="text-gray-600">
                    Being positioned far from decision-makers in the network graph, limiting access to opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
