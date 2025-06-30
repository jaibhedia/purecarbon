'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  TrendingDown,
  Car,
  Zap,
  UtensilsCrossed,
  Trash2,
  Users,
  Calendar,
  Share2,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function Achievements() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Carbon Cutter',
      description: 'Reduce your carbon footprint by 10% in a month',
      icon: '✂️',
      points: 150,
      category: 'Reduction',
      unlocked: true,
      unlockedDate: '2 days ago',
      progress: 10,
      maxProgress: 10,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Green Commuter',
      description: 'Use sustainable transport for 5 consecutive days',
      icon: '🚌',
      points: 100,
      category: 'Transport',
      unlocked: true,
      unlockedDate: '1 week ago',
      progress: 5,
      maxProgress: 5,
      rarity: 'common'
    },
    {
      id: '3',
      title: 'Energy Saver',
      description: 'Reduce electricity consumption by 20%',
      icon: '💡',
      points: 75,
      category: 'Energy',
      unlocked: true,
      unlockedDate: '2 weeks ago',
      progress: 20,
      maxProgress: 20,
      rarity: 'common'
    },
    {
      id: '4',
      title: 'Eco Warrior',
      description: 'Complete 10 weekly challenges',
      icon: '⚔️',
      points: 300,
      category: 'Challenges',
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      rarity: 'rare'
    },
    {
      id: '5',
      title: 'Carbon Neutral',
      description: 'Offset all your emissions for a month',
      icon: '🌱',
      points: 500,
      category: 'Offsetting',
      unlocked: false,
      progress: 75,
      maxProgress: 100,
      rarity: 'epic'
    },
    {
      id: '6',
      title: 'Community Leader',
      description: 'Help 5 friends reduce their carbon footprint',
      icon: '👥',
      points: 250,
      category: 'Social',
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'rare'
    },
    {
      id: '7',
      title: 'Perfect Month',
      description: 'Meet all sustainability goals for 30 days',
      icon: '🏆',
      points: 1000,
      category: 'Streak',
      unlocked: false,
      progress: 12,
      maxProgress: 30,
      rarity: 'legendary'
    },
    {
      id: '8',
      title: 'Market Trader',
      description: 'Purchase 100 carbon credits',
      icon: '💰',
      points: 200,
      category: 'Trading',
      unlocked: false,
      progress: 90,
      maxProgress: 100,
      rarity: 'rare'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-200';
      case 'rare': return 'border-blue-200';
      case 'epic': return 'border-purple-200';
      case 'legendary': return 'border-yellow-200';
      default: return 'border-gray-200';
    }
  };

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const shareAchievement = (achievement: Achievement) => {
    toast.success(`Shared ${achievement.title} achievement!`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements & Badges</h1>
        <p className="text-lg text-gray-600">Track your sustainability milestones and earn EcoPoints</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalPoints}</div>
                <div className="text-sm opacity-90">Total EcoPoints</div>
              </div>
              <Star className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{unlockedCount}</div>
                <div className="text-sm opacity-90">Badges Earned</div>
              </div>
              <Trophy className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">Level 8</div>
                <div className="text-sm opacity-90">Current Level</div>
              </div>
              <Award className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
              <Target className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Recent Achievements</span>
          </CardTitle>
          <CardDescription>Your latest sustainability milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <div className="font-semibold text-green-900">{achievement.title}</div>
                    <div className="text-sm text-green-700">{achievement.description}</div>
                    <div className="text-xs text-green-600 mt-1">Unlocked {achievement.unlockedDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-500 hover:bg-green-500">+{achievement.points} pts</Badge>
                  <Button size="sm" variant="outline" onClick={() => shareAchievement(achievement)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>All Achievements</CardTitle>
          <CardDescription>Complete challenges to unlock badges and earn EcoPoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`relative overflow-hidden transition-all duration-300 ${
                  achievement.unlocked 
                    ? `${getRarityBorder(achievement.rarity)} shadow-md hover:shadow-lg` 
                    : 'opacity-75 border-gray-200'
                }`}
              >
                {!achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                )}
                
                <div className={`h-1 ${getRarityColor(achievement.rarity)}`}></div>
                
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    
                    <div>
                      <h3 className="font-bold text-lg">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {achievement.category}
                      </Badge>
                      <Badge 
                        className={`text-xs text-white ${getRarityColor(achievement.rarity)} hover:${getRarityColor(achievement.rarity)}`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>

                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">{achievement.points} EcoPoints</span>
                    </div>

                    {achievement.unlocked && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => shareAchievement(achievement)}
                        className="w-full"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Achievement
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Level */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Level Progress</span>
          </CardTitle>
          <CardDescription className="text-purple-100">
            Complete more achievements to level up and unlock exclusive rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Level 8</span>
              <span className="text-lg font-semibold">Level 9</span>
            </div>
            <Progress value={75} className="h-3 bg-white/20" />
            <div className="text-center">
              <div className="text-sm opacity-90">375 / 500 EcoPoints to next level</div>
              <div className="text-xs opacity-75 mt-1">Next reward: Exclusive Carbon Calculator theme</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}