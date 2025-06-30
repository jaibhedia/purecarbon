'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Calendar,
  Lightbulb,
  BarChart3,
  Mic,
  MicOff,
  Volume2,
  Download,
  Share2,
  Sparkles,
  Zap,
  Car,
  Home,
  UtensilsCrossed,
  Trash2,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Leaf,
  Users,
  TrendingDown,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { toast } from 'sonner';

interface AIRecommendation {
  id: string;
  category: 'transport' | 'energy' | 'food' | 'waste';
  title: string;
  description: string;
  impact: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeframe: string;
  confidence: number;
  personalizedReason: string;
  actionSteps: string[];
  estimatedSavings: number;
  icon: any;
}

interface WeeklyReport {
  week: string;
  totalEmissions: number;
  reductionFromPrevious: number;
  topCategory: string;
  achievements: string[];
  recommendations: AIRecommendation[];
  goals: {
    set: number;
    achieved: number;
  };
  insights: string[];
}

interface PredictiveData {
  month: string;
  predicted: number;
  optimistic: number;
  pessimistic: number;
  actual?: number;
}

interface GoalSetting {
  id: string;
  category: string;
  currentValue: number;
  targetValue: number;
  deadline: string;
  difficulty: 'easy' | 'medium' | 'hard';
  aiSuggested: boolean;
  progress: number;
  milestones: {
    date: string;
    target: number;
    achieved: boolean;
  }[];
}

export default function AIInsights() {
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [confidenceThreshold, setConfidenceThreshold] = useState([80]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('insights');

  // Simulate AI analysis
  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const next = prev + Math.random() * 20;
        if (next >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast.success('AI analysis complete! New insights generated.');
          return 100;
        }
        return next;
      });
    }, 300);
  };

  // Generate personalized insights
  const generateInsight = () => {
    const insights = [
      "Based on your commute patterns, switching to an electric bike 3 days a week could reduce your transport emissions by 35%.",
      "Your energy usage spikes on Tuesdays and Thursdays. Consider scheduling high-energy appliances outside peak hours.",
      "You've been consistently reducing food waste! This habit has saved you 8kg CO₂ this month.",
      "Weekend travel contributes to 23% of your carbon footprint. Consider local destinations for your next trip."
    ];
    
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    toast.success(`New AI Insight: ${randomInsight}`);
  };

  // AI Insights Tab Component
  const AIInsightsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>Weekly Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Key Insight This Week
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Your carbon footprint decreased by 15% compared to last week, primarily due to 
              reduced weekend travel and more efficient meal planning.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">-15%</div>
              <div className="text-xs text-green-700 dark:text-green-300">vs Last Week</div>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-xs text-blue-700 dark:text-blue-300">AI Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Behavioral Patterns</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Monday Commute Efficiency</span>
              <Badge variant="secondary">Excellent</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weekend Activity Impact</span>
              <Badge variant="destructive">High</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Energy Usage Timing</span>
              <Badge className="bg-yellow-500">Moderate</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Food Waste Management</span>
              <Badge className="bg-green-500">Improving</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Recommendations Tab Component
  const RecommendationsTab = ({ recommendations, confidenceThreshold }: { 
    recommendations: AIRecommendation[], 
    confidenceThreshold: number 
  }) => {
    const filteredRecommendations = recommendations.filter(rec => rec.confidence >= confidenceThreshold);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Personalized Recommendations</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Confidence Threshold:</span>
            <span className="text-sm font-medium">{confidenceThreshold}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRecommendations.map((rec) => {
            const IconComponent = rec.icon;
            return (
              <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                    </div>
                    <Badge 
                      variant={rec.difficulty === 'easy' ? 'default' : rec.difficulty === 'medium' ? 'secondary' : 'destructive'}
                    >
                      {rec.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">
                      -{rec.impact}% CO₂
                    </span>
                    <span className="text-gray-500">
                      {rec.timeframe}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Why this works for you:
                    </p>
                    <p className="text-xs">{rec.personalizedReason}</p>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => toast.success(`Started tracking: ${rec.title}`)}
                  >
                    Implement Recommendation
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Predictions Tab Component  
  const PredictionsTab = ({ selectedTimeframe }: { selectedTimeframe: string }) => {
    const predictiveData = [
      { month: 'Jul', predicted: 210, optimistic: 195, pessimistic: 230, actual: 220 },
      { month: 'Aug', predicted: 205, optimistic: 185, pessimistic: 225 },
      { month: 'Sep', predicted: 195, optimistic: 175, pessimistic: 215 },
      { month: 'Oct', predicted: 200, optimistic: 180, pessimistic: 220 },
      { month: 'Nov', predicted: 215, optimistic: 195, pessimistic: 235 },
      { month: 'Dec', predicted: 225, optimistic: 205, pessimistic: 245 }
    ];

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Predictive Analytics</span>
            </CardTitle>
            <CardDescription>
              AI-powered predictions based on your patterns and seasonal trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number, name: string) => [`${value} kg CO₂`, name]} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="pessimistic" 
                    stackId="1" 
                    stroke="#EF4444" 
                    fill="#FEE2E2" 
                    name="Pessimistic Scenario"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="optimistic" 
                    stackId="1" 
                    stroke="#10B981" 
                    fill="#D1FAE5" 
                    name="Optimistic Scenario"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="AI Prediction"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Actual"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-600">Best Case Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">-25%</div>
              <p className="text-sm text-gray-600">Reduction by Dec 2025</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-600">Most Likely</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">-12%</div>
              <p className="text-sm text-gray-600">Based on current trends</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600">Without Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">+8%</div>
              <p className="text-sm text-gray-600">If no action taken</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Goals Tab Component
  const GoalsTab = () => {
    const [goals, setGoals] = useState([
      {
        id: '1',
        title: 'Reduce Transport Emissions',
        current: 95,
        target: 75,
        deadline: '2025-12-31',
        progress: 65
      },
      {
        id: '2', 
        title: 'Energy Efficiency',
        current: 85,
        target: 65,
        deadline: '2025-12-31',
        progress: 40
      }
    ]);

    const createNewGoal = () => {
      const newGoals = [
        'Switch to renewable energy',
        'Implement zero waste week',
        'Reduce meat consumption by 50%',
        'Walk/bike for trips under 2 miles'
      ];
      const randomGoal = newGoals[Math.floor(Math.random() * newGoals.length)];
      toast.success(`New AI-suggested goal: ${randomGoal}`);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI-Powered Goal Setting</h3>
          <Button onClick={createNewGoal} variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Suggest New Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="text-base">{goal.title}</CardTitle>
                <CardDescription>
                  Target: {goal.target} kg CO₂ by {new Date(goal.deadline).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Current: {goal.current} kg</span>
                  <span>Target: {goal.target} kg</span>
                </div>
                
                <Progress value={goal.progress} className="h-3" />
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{goal.progress}% complete</span>
                  <span>{goal.current - goal.target} kg to go</span>
                </div>
                
                <Button size="sm" className="w-full" variant="outline">
                  View Action Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Mock data for AI insights - Enhanced with realistic data
  const recommendations: AIRecommendation[] = [
    {
      id: '1',
      category: 'transport',
      title: 'Optimize Your Commute Route',
      description: 'AI analysis shows your current route has 23% more emissions than the optimal path.',
      impact: 15,
      difficulty: 'easy',
      timeframe: '1 week',
      confidence: 92,
      personalizedReason: 'Based on your regular Monday-Friday 9AM and 6PM travel patterns',
      actionSteps: [
        'Use the suggested route via Oak Street instead of Main Street',
        'Consider carpooling on Wednesdays when traffic is heaviest',
        'Try the bike lane option for trips under 3 miles'
      ],
      estimatedSavings: 12.5,
      icon: Car
    },
    {
      id: '2',
      category: 'energy',
      title: 'Smart Thermostat Schedule',
      description: 'Adjust your heating schedule based on your presence patterns detected by our AI.',
      impact: 22,
      difficulty: 'medium',
      timeframe: '2 weeks',
      confidence: 88,
      personalizedReason: 'Your home is empty 8AM-6PM on weekdays but heated to 72°F',
      actionSteps: [
        'Lower temperature to 65°F during work hours',
        'Increase temperature 30 minutes before your typical arrival',
        'Use weekend schedule for holidays and remote work days'
      ],
      estimatedSavings: 28.3,
      icon: Home
    },
    {
      id: '3',
      category: 'food',
      title: 'Meal Planning Optimization',
      description: 'AI suggests reducing food waste by 40% through better meal planning.',
      impact: 18,
      difficulty: 'easy',
      timeframe: '1 week',
      confidence: 85,
      personalizedReason: 'You discard an average of 2.3 lbs of food weekly, mostly vegetables',
      actionSteps: [
        'Plan meals for 3 days at a time instead of weekly',
        'Buy vegetables every 2-3 days for freshness',
        'Use the "use first" labeling system in your fridge'
      ],
      estimatedSavings: 9.7,
      icon: UtensilsCrossed
    },
    {
      id: '4',
      category: 'waste',
      title: 'Advanced Recycling Program',  
      description: 'Join local composting program to reduce waste by 65%.',
      impact: 25,
      difficulty: 'hard',
      timeframe: '1 month',
      confidence: 78,
      personalizedReason: 'Your organic waste represents 60% of total household waste',
      actionSteps: [
        'Sign up for municipal composting program',
        'Set up kitchen compost collection system',
        'Learn what materials are compostable in your area'
      ],
      estimatedSavings: 15.2,
      icon: Trash2
    }
  ];
  const weeklyReport: WeeklyReport = {
    week: 'Week of January 8-14, 2025',
    totalEmissions: 185.5,
    reductionFromPrevious: 12.3,
    topCategory: 'Transport',
    achievements: ['Bike Week Challenge Completed', 'Energy Saver Badge Earned'],
    recommendations: [],
    goals: {
      set: 5,
      achieved: 3
    },
    insights: [
      'Your transport emissions decreased by 25% this week due to increased cycling',
      'Energy consumption spiked on Tuesday - consider adjusting heating schedule',
      'Food waste reduced significantly after implementing meal planning',
      'You\'re on track to achieve your monthly 20% reduction goal'
    ]
  };

  const aiRecommendations: AIRecommendation[] = [
    {
      id: '1',
      category: 'transport',
      title: 'Optimize Your Commute Route',
      description: 'Switch to Route B on Tuesdays and Thursdays to reduce emissions by 15%',
      impact: 15,
      difficulty: 'easy',
      timeframe: '2 weeks',
      confidence: 92,
      personalizedReason: 'Based on your Tuesday/Thursday travel patterns and traffic data analysis',
      actionSteps: [
        'Use Route B via Main Street instead of Highway 101',
        'Leave 5 minutes earlier to account for slightly longer travel time',
        'Consider carpooling with colleague Sarah who lives nearby'
      ],
      estimatedSavings: 45.2,
      icon: Car
    },
    {
      id: '2',
      category: 'energy',
      title: 'Smart Thermostat Schedule',
      description: 'Adjust heating schedule based on your occupancy patterns',
      impact: 22,
      difficulty: 'medium',
      timeframe: '1 month',
      confidence: 88,
      personalizedReason: 'Your home is empty 6-8 AM and 9 AM-5 PM on weekdays',
      actionSteps: [
        'Lower temperature to 65°F when away (currently 70°F)',
        'Pre-heat 30 minutes before returning home',
        'Use smart scheduling for weekend patterns'
      ],
      estimatedSavings: 78.5,
      icon: Home
    },
    {
      id: '3',
      category: 'food',
      title: 'Meal Planning Optimization',
      description: 'Reduce food waste with AI-powered meal planning',
      impact: 18,
      difficulty: 'easy',
      timeframe: '3 weeks',
      confidence: 85,
      personalizedReason: 'You typically waste 20% of vegetables and 15% of dairy products',
      actionSteps: [
        'Plan meals for 5 days instead of 7 to reduce spoilage',
        'Buy smaller quantities of perishables',
        'Use leftovers for lunch the next day'
      ],
      estimatedSavings: 32.1,
      icon: UtensilsCrossed
    },
    {
      id: '4',
      category: 'waste',
      title: 'Composting Setup',
      description: 'Start home composting to reduce organic waste by 40%',
      impact: 25,
      difficulty: 'medium',
      timeframe: '6 weeks',
      confidence: 90,
      personalizedReason: 'Your organic waste accounts for 45% of total household waste',
      actionSteps: [
        'Purchase a small countertop composter',
        'Learn composting basics through our guided tutorial',
        'Start with fruit and vegetable scraps only'
      ],
      estimatedSavings: 28.7,
      icon: Trash2
    }
  ];

  const predictiveData: PredictiveData[] = [
    { month: 'Jan', predicted: 220, optimistic: 180, pessimistic: 260, actual: 225 },
    { month: 'Feb', predicted: 210, optimistic: 170, pessimistic: 250, actual: 205 },
    { month: 'Mar', predicted: 195, optimistic: 155, pessimistic: 235, actual: 190 },
    { month: 'Apr', predicted: 185, optimistic: 145, pessimistic: 225 },
    { month: 'May', predicted: 175, optimistic: 135, pessimistic: 215 },
    { month: 'Jun', predicted: 165, optimistic: 125, pessimistic: 205 },
    { month: 'Jul', predicted: 160, optimistic: 120, pessimistic: 200 },
    { month: 'Aug', predicted: 155, optimistic: 115, pessimistic: 195 },
    { month: 'Sep', predicted: 150, optimistic: 110, pessimistic: 190 },
    { month: 'Oct', predicted: 145, optimistic: 105, pessimistic: 185 },
    { month: 'Nov', predicted: 140, optimistic: 100, pessimistic: 180 },
    { month: 'Dec', predicted: 135, optimistic: 95, pessimistic: 175 }
  ];

  const goalSettings: GoalSetting[] = [
    {
      id: '1',
      category: 'Overall Emissions',
      currentValue: 225,
      targetValue: 180,
      deadline: '2025-06-30',
      difficulty: 'medium',
      aiSuggested: true,
      progress: 35,
      milestones: [
        { date: '2025-02-28', target: 210, achieved: true },
        { date: '2025-04-30', target: 195, achieved: false },
        { date: '2025-06-30', target: 180, achieved: false }
      ]
    },
    {
      id: '2',
      category: 'Transport',
      currentValue: 85,
      targetValue: 60,
      deadline: '2025-05-31',
      difficulty: 'easy',
      aiSuggested: true,
      progress: 45,
      milestones: [
        { date: '2025-03-31', target: 75, achieved: false },
        { date: '2025-05-31', target: 60, achieved: false }
      ]
    },
    {
      id: '3',
      category: 'Energy',
      currentValue: 95,
      targetValue: 70,
      deadline: '2025-08-31',
      difficulty: 'hard',
      aiSuggested: false,
      progress: 25,
      milestones: [
        { date: '2025-04-30', target: 85, achieved: false },
        { date: '2025-06-30', target: 78, achieved: false },
        { date: '2025-08-31', target: 70, achieved: false }
      ]
    }
  ];

  const handleVoiceCommand = () => {
    if (!voiceEnabled) {
      toast.error('Voice features require ElevenLabs integration. Please enable in settings.');
      return;
    }

    setIsListening(!isListening);
    if (!isListening) {
      toast.success('Listening... Ask me about your carbon footprint!');
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        toast.success('Voice command processed: "Show me my weekly report"');
      }, 3000);
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled) {
      toast.error('Voice synthesis requires ElevenLabs integration.');
      return;
    }
    toast.success('Speaking: ' + text.substring(0, 50) + '...');
  };

  const generateReport = () => {
    toast.success('Generating personalized weekly report...');
  };

  const acceptRecommendation = (id: string) => {
    toast.success('Recommendation accepted! Added to your action plan.');
  };

  const setAIGoal = (category: string) => {
    toast.success(`AI-suggested goal set for ${category}!`);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header with AI Analysis Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span>AI Insights</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Personalized recommendations powered by machine learning
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Run AI Analysis
              </>
            )}
          </Button>
          
          <Button
            onClick={generateInsight}
            variant="outline"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Get Insight
          </Button>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    AI Analysis in Progress
                  </span>
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    {Math.round(analysisProgress)}%
                  </span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <AIInsightsTab />
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <RecommendationsTab 
            recommendations={recommendations}
            confidenceThreshold={confidenceThreshold[0]}
          />
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <PredictionsTab selectedTimeframe={selectedTimeframe} />
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <GoalsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}