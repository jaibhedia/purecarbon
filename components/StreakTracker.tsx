'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  Calendar, 
  Target, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

interface DailyActivity {
  date: string;
  completed: boolean;
  activities: {
    carbonLogged: boolean;
    sustainableTransport: boolean;
    energySaving: boolean;
    wasteReduction: boolean;
    challengeCompleted: boolean;
  };
  points: number;
}

interface StreakMilestone {
  days: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  unlocked: boolean;
}

export default function StreakTracker() {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [longestStreak, setLongestStreak] = useState(28);
  const [todayCompleted, setTodayCompleted] = useState(false);
  
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([
    {
      date: '2024-01-15',
      completed: true,
      activities: {
        carbonLogged: true,
        sustainableTransport: true,
        energySaving: true,
        wasteReduction: true,
        challengeCompleted: true
      },
      points: 50
    },
    {
      date: '2024-01-14',
      completed: true,
      activities: {
        carbonLogged: true,
        sustainableTransport: false,
        energySaving: true,
        wasteReduction: true,
        challengeCompleted: true
      },
      points: 40
    },
    {
      date: '2024-01-13',
      completed: true,
      activities: {
        carbonLogged: true,
        sustainableTransport: true,
        energySaving: false,
        wasteReduction: true,
        challengeCompleted: false
      },
      points: 30
    }
  ]);

  const [todayActivities, setTodayActivities] = useState({
    carbonLogged: true,
    sustainableTransport: false,
    energySaving: false,
    wasteReduction: false,
    challengeCompleted: false
  });

  const streakMilestones: StreakMilestone[] = [
    {
      days: 7,
      title: 'Week Warrior',
      description: 'Complete 7 consecutive days',
      points: 100,
      icon: '🔥',
      unlocked: true
    },
    {
      days: 14,
      title: 'Fortnight Fighter',
      description: 'Complete 14 consecutive days',
      points: 250,
      icon: '⚡',
      unlocked: false
    },
    {
      days: 30,
      title: 'Monthly Master',
      description: 'Complete 30 consecutive days',
      points: 500,
      icon: '🏆',
      unlocked: false
    },
    {
      days: 50,
      title: 'Streak Specialist',
      description: 'Complete 50 consecutive days',
      points: 750,
      icon: '💎',
      unlocked: false
    },
    {
      days: 100,
      title: 'Century Champion',
      description: 'Complete 100 consecutive days',
      points: 1500,
      icon: '👑',
      unlocked: false
    }
  ];

  const activityLabels = {
    carbonLogged: 'Log Carbon Footprint',
    sustainableTransport: 'Use Sustainable Transport',
    energySaving: 'Practice Energy Saving',
    wasteReduction: 'Reduce Waste',
    challengeCompleted: 'Complete Daily Challenge'
  };

  const completedActivities = Object.values(todayActivities).filter(Boolean).length;
  const totalActivities = Object.keys(todayActivities).length;
  const todayProgress = (completedActivities / totalActivities) * 100;

  const toggleActivity = (activity: keyof typeof todayActivities) => {
    setTodayActivities(prev => ({
      ...prev,
      [activity]: !prev[activity]
    }));
    
    if (!todayActivities[activity]) {
      toast.success(`Great job! You've completed: ${activityLabels[activity]}`);
    }
  };

  const completeDay = () => {
    if (completedActivities >= 3) { // Minimum 3 activities to maintain streak
      setTodayCompleted(true);
      setCurrentStreak(prev => prev + 1);
      toast.success(`Day completed! Your streak is now ${currentStreak + 1} days! 🔥`);
    } else {
      toast.error('Complete at least 3 activities to maintain your streak!');
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 50) return 'from-purple-500 to-pink-500';
    if (streak >= 30) return 'from-blue-500 to-purple-500';
    if (streak >= 14) return 'from-green-500 to-blue-500';
    if (streak >= 7) return 'from-yellow-500 to-green-500';
    return 'from-orange-500 to-yellow-500';
  };

  const getNextMilestone = () => {
    return streakMilestones.find(m => m.days > currentStreak);
  };

  const nextMilestone = getNextMilestone();

  return (
    <div className="space-y-6">
      {/* Current Streak Display */}
      <Card className={`bg-gradient-to-r ${getStreakColor(currentStreak)} text-white border-0`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Flame className="h-6 w-6" />
            <span>Current Streak</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{currentStreak}</div>
            <div className="text-xl opacity-90 mb-4">Days in a row</div>
            <div className="text-sm opacity-75">
              Longest streak: {longestStreak} days
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Today's Activities</span>
            </CardTitle>
            <CardDescription>
              Complete activities to maintain your streak
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{completedActivities}/{totalActivities}</span>
              </div>
              <Progress value={todayProgress} className="h-3" />
            </div>

            <div className="space-y-3">
              {Object.entries(todayActivities).map(([key, completed]) => (
                <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {completed && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-sm ${completed ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                      {activityLabels[key as keyof typeof activityLabels]}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant={completed ? "secondary" : "outline"}
                    onClick={() => toggleActivity(key as keyof typeof todayActivities)}
                  >
                    {completed ? 'Done' : 'Mark Complete'}
                  </Button>
                </div>
              ))}
            </div>

            {!todayCompleted && (
              <Button 
                className="w-full" 
                onClick={completeDay}
                disabled={completedActivities < 3}
              >
                Complete Day ({completedActivities}/3 minimum)
              </Button>
            )}

            {todayCompleted && (
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-green-800">Day Completed!</div>
                <div className="text-sm text-green-600">Your streak continues! 🔥</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Streak Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Streak Milestones</span>
            </CardTitle>
            <CardDescription>
              Unlock rewards as your streak grows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {streakMilestones.map((milestone, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  currentStreak >= milestone.days 
                    ? 'bg-green-50 border-green-200' 
                    : milestone.days === nextMilestone?.days
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{milestone.icon}</div>
                      <div>
                        <div className="font-semibold">{milestone.title}</div>
                        <div className="text-sm text-gray-600">{milestone.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+{milestone.points}</div>
                      <div className="text-xs text-gray-500">EcoPoints</div>
                    </div>
                  </div>
                  
                  {currentStreak >= milestone.days ? (
                    <Badge className="mt-2 bg-green-500 hover:bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Unlocked
                    </Badge>
                  ) : milestone.days === nextMilestone?.days ? (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{currentStreak}/{milestone.days} days</span>
                      </div>
                      <Progress value={(currentStreak / milestone.days) * 100} className="h-2" />
                    </div>
                  ) : (
                    <Badge variant="secondary" className="mt-2">
                      {milestone.days} days required
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Activity Calendar</span>
          </CardTitle>
          <CardDescription>
            Your recent sustainability activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Calendar headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {Array.from({ length: 35 }, (_, i) => {
              const dayNumber = i - 6; // Start from a week ago
              const isToday = dayNumber === 0;
              const hasActivity = dayNumber < 0 && dayNumber > -13; // Last 12 days had activity
              const isFuture = dayNumber > 0;
              
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg border ${
                    isToday 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : hasActivity 
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : isFuture
                      ? 'bg-gray-50 border-gray-200 text-gray-400'
                      : 'bg-red-50 border-red-200 text-red-600'
                  }`}
                >
                  {Math.abs(dayNumber) <= 15 ? Math.abs(dayNumber) : ''}
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Activity completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div>
              <span>No activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}