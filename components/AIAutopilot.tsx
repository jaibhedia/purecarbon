'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Sparkles, 
  Zap,
  TrendingDown,
  Target,
  Settings,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Cpu,
  Activity,
  Bot,
  Rocket,
  Shield
} from 'lucide-react';

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: number;
  confidence: number;
  category: 'energy' | 'transport' | 'waste' | 'food';
  status: 'pending' | 'applied' | 'rejected';
  automatedAction?: boolean;
}

interface AutopilotMetrics {
  totalRecommendations: number;
  appliedRecommendations: number;
  carbonSaved: number;
  efficiency: number;
  uptime: number;
}

export default function AIAutopilot({ userData }: { userData: any }) {
  const [isAutopilotActive, setIsAutopilotActive] = useState(true);
  const [autopilotMode, setAutopilotMode] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [realTimeOptimization, setRealTimeOptimization] = useState(true);
  const [smartScheduling, setSmartScheduling] = useState(true);
  const [predictiveAnalysis, setPredictiveAnalysis] = useState(true);

  const [metrics, setMetrics] = useState<AutopilotMetrics>({
    totalRecommendations: 47,
    appliedRecommendations: 32,
    carbonSaved: 156.7,
    efficiency: 89.2,
    uptime: 99.8
  });

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: '1',
      title: 'Optimize HVAC Schedule',
      description: 'Reduce heating during low-occupancy hours (2-6 AM) to save 12% energy',
      impact: 12.5,
      confidence: 94,
      category: 'energy',
      status: 'applied',
      automatedAction: true
    },
    {
      id: '2',
      title: 'Route Optimization',
      description: 'AI-suggested route changes can reduce transport emissions by 18%',
      impact: 8.3,
      confidence: 87,
      category: 'transport',
      status: 'pending',
      automatedAction: false
    },
    {
      id: '3',
      title: 'Smart Lighting Control',
      description: 'Implement motion-based lighting in low-traffic areas',
      impact: 6.2,
      confidence: 91,
      category: 'energy',
      status: 'applied',
      automatedAction: true
    },
    {
      id: '4',
      title: 'Waste Reduction Strategy',
      description: 'AI-detected patterns suggest 23% reduction in food waste is achievable',
      impact: 4.7,
      confidence: 82,
      category: 'waste',
      status: 'pending',
      automatedAction: false
    }
  ]);

  const [recentActions, setRecentActions] = useState([
    { time: '2 min ago', action: 'Optimized HVAC system', impact: '+2.3% efficiency', type: 'success' },
    { time: '15 min ago', action: 'Route suggestion applied', impact: '-1.2 kg CO2', type: 'success' },
    { time: '32 min ago', action: 'Smart lighting activated', impact: '+8% energy savings', type: 'success' },
    { time: '1 hour ago', action: 'Predictive maintenance alert', impact: 'Prevented 15% efficiency loss', type: 'warning' }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        carbonSaved: prev.carbonSaved + (Math.random() * 0.5),
        efficiency: Math.min(100, prev.efficiency + (Math.random() - 0.5) * 0.2),
        uptime: Math.max(95, prev.uptime + (Math.random() - 0.5) * 0.1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRecommendationAction = (id: string, action: 'apply' | 'reject') => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id 
          ? { ...rec, status: action === 'apply' ? 'applied' : 'rejected' }
          : rec
      )
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy': return Zap;
      case 'transport': return Target;
      case 'waste': return RotateCcw;
      case 'food': return Lightbulb;
      default: return Sparkles;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'energy': return 'text-yellow-500 bg-yellow-500';
      case 'transport': return 'text-blue-500 bg-blue-500';
      case 'waste': return 'text-red-500 bg-red-500';
      case 'food': return 'text-green-500 bg-green-500';
      default: return 'text-gray-500 bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Autopilot Mode
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Let AI automatically optimize your carbon footprint in real-time
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge 
            variant="outline" 
            className={`${isAutopilotActive ? 'text-green-600 border-green-200 bg-green-50' : 'text-gray-600 border-gray-200 bg-gray-50'}`}
          >
            <div className={`w-2 h-2 ${isAutopilotActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'} rounded-full mr-2`}></div>
            {isAutopilotActive ? 'Active' : 'Paused'}
          </Badge>
          <Button 
            variant={isAutopilotActive ? "outline" : "default"}
            onClick={() => setIsAutopilotActive(!isAutopilotActive)}
            className="flex items-center space-x-2"
          >
            {isAutopilotActive ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Activate</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Autopilot Status */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Carbon Saved
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {metrics.carbonSaved.toFixed(1)} kg
            </div>
            <p className="text-sm text-green-600 font-medium">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                AI Efficiency
              </CardTitle>
              <Brain className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {metrics.efficiency.toFixed(1)}%
            </div>
            <p className="text-sm text-blue-600 font-medium">
              Optimization rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Recommendations
              </CardTitle>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {metrics.appliedRecommendations}/{metrics.totalRecommendations}
            </div>
            <p className="text-sm text-purple-600 font-medium">
              Applied/Total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Uptime
              </CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {metrics.uptime.toFixed(1)}%
            </div>
            <p className="text-sm text-green-600 font-medium">
              System uptime
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Mode
              </CardTitle>
              <Settings className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {autopilotMode}
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Current mode
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Autopilot Configuration</CardTitle>
            <CardDescription>Customize AI behavior and automation settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Optimization Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['conservative', 'balanced', 'aggressive'].map((mode) => (
                  <Button
                    key={mode}
                    variant={autopilotMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutopilotMode(mode as any)}
                    className="capitalize"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {autopilotMode === 'conservative' && 'Safe, minimal changes with high confidence'}
                {autopilotMode === 'balanced' && 'Optimal balance of impact and risk'}
                {autopilotMode === 'aggressive' && 'Maximum optimization with calculated risks'}
              </p>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Real-time Optimization</div>
                  <div className="text-sm text-gray-500">Continuously adjust systems based on live data</div>
                </div>
                <Switch
                  checked={realTimeOptimization}
                  onCheckedChange={setRealTimeOptimization}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Smart Scheduling</div>
                  <div className="text-sm text-gray-500">AI-powered scheduling for optimal efficiency</div>
                </div>
                <Switch
                  checked={smartScheduling}
                  onCheckedChange={setSmartScheduling}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Predictive Analysis</div>
                  <div className="text-sm text-gray-500">Forecast and prevent inefficiencies</div>
                </div>
                <Switch
                  checked={predictiveAnalysis}
                  onCheckedChange={setPredictiveAnalysis}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent AI Actions</CardTitle>
            <CardDescription>Automated optimizations performed by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActions.map((action, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${action.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{action.action}</div>
                    <div className="text-xs text-gray-500">{action.time}</div>
                  </div>
                  <div className="text-xs font-medium text-green-600">
                    {action.impact}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>Smart suggestions for carbon reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const IconComponent = getCategoryIcon(rec.category);
              const colors = getCategoryColor(rec.category);
              
              return (
                <div key={rec.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className={`w-10 h-10 ${colors.split(' ')[1]} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {rec.category}
                      </Badge>
                      {rec.automatedAction && (
                        <Badge variant="outline" className="text-xs text-blue-600">
                          <Bot className="h-3 w-3 mr-1" />
                          Auto
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {rec.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Impact: {rec.impact}% reduction</span>
                      <span>Confidence: {rec.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {rec.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRecommendationAction(rec.id, 'reject')}
                        >
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleRecommendationAction(rec.id, 'apply')}
                        >
                          Apply
                        </Button>
                      </>
                    )}
                    {rec.status === 'applied' && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Applied</span>
                      </div>
                    )}
                    {rec.status === 'rejected' && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Rejected</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Predictions</CardTitle>
          <CardDescription>Machine learning analysis of your carbon patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Projected Impact</h3>
              <p className="text-2xl font-bold text-blue-600">-34.2%</p>
              <p className="text-sm text-gray-500">emissions by year-end</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Risk Assessment</h3>
              <p className="text-2xl font-bold text-green-600">Low</p>
              <p className="text-sm text-gray-500">automation risk</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Learning Rate</h3>
              <p className="text-2xl font-bold text-yellow-600">97.3%</p>
              <p className="text-sm text-gray-500">model accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
