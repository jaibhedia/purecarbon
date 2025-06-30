'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Target, 
  Calendar,
  Users,
  Gift,
  Flame,
  Award,
  Crown,
  Zap,
  Car,
  UtensilsCrossed,
  Trash2,
  TreePine,
  Leaf,
  Globe,
  Heart,
  Shield,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  Lock,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  requirements: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: string;
  points: number;
  progress: number;
  maxProgress: number;
  timeLeft: string;
  participants: number;
  difficulty: 'easy' | 'medium' | 'hard';
  active: boolean;
  completed: boolean;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  ecoPoints: number;
  streak: number;
  status: 'online' | 'offline';
  lastActivity: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'digital' | 'physical' | 'experience' | 'donation';
  available: boolean;
  claimed: boolean;
  icon: any;
  value: string;
}

export default function GamificationSystem() {
  const [userStats, setUserStats] = useState({
    ecoPoints: 1247,
    level: 8,
    streak: 12,
    totalReduction: 23.5,
    rank: 156,
    achievements: 8,
    friends: 15
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first carbon calculation',
      icon: '👶',
      category: 'Getting Started',
      points: 50,
      rarity: 'common',
      unlocked: true,
      unlockedDate: '2 weeks ago',
      progress: 1,
      maxProgress: 1,
      requirements: ['Complete carbon calculator']
    },
    {
      id: '2',
      title: 'Carbon Cutter',
      description: 'Reduce your carbon footprint by 10%',
      icon: '✂️',
      category: 'Reduction',
      points: 150,
      rarity: 'common',
      unlocked: true,
      unlockedDate: '1 week ago',
      progress: 10,
      maxProgress: 10,
      requirements: ['Achieve 10% reduction in monthly emissions']
    },
    {
      id: '3',
      title: 'Green Commuter',
      description: 'Use sustainable transport for 7 consecutive days',
      icon: '🚌',
      category: 'Transport',
      points: 200,
      rarity: 'rare',
      unlocked: true,
      unlockedDate: '3 days ago',
      progress: 7,
      maxProgress: 7,
      requirements: ['Log sustainable transport 7 days in a row']
    },
    {
      id: '4',
      title: 'Energy Guardian',
      description: 'Reduce home energy consumption by 25%',
      icon: '⚡',
      category: 'Energy',
      points: 300,
      rarity: 'rare',
      unlocked: false,
      progress: 18,
      maxProgress: 25,
      requirements: ['Achieve 25% reduction in energy usage']
    },
    {
      id: '5',
      title: 'Plant-Based Pioneer',
      description: 'Complete 30 days of plant-based meals',
      icon: '🌱',
      category: 'Food',
      points: 250,
      rarity: 'rare',
      unlocked: false,
      progress: 12,
      maxProgress: 30,
      requirements: ['Log plant-based meals for 30 days']
    },
    {
      id: '6',
      title: 'Zero Waste Warrior',
      description: 'Achieve 90% waste diversion rate',
      icon: '♻️',
      category: 'Waste',
      points: 400,
      rarity: 'epic',
      unlocked: false,
      progress: 75,
      maxProgress: 90,
      requirements: ['Maintain 90% recycling/composting rate']
    },
    {
      id: '7',
      title: 'Carbon Neutral',
      description: 'Offset 100% of your emissions for 3 months',
      icon: '🌍',
      category: 'Offsetting',
      points: 500,
      rarity: 'epic',
      unlocked: false,
      progress: 45,
      maxProgress: 100,
      requirements: ['Purchase enough credits to offset all emissions']
    },
    {
      id: '8',
      title: 'Community Leader',
      description: 'Help 10 friends reduce their carbon footprint',
      icon: '👥',
      category: 'Social',
      points: 350,
      rarity: 'epic',
      unlocked: false,
      progress: 4,
      maxProgress: 10,
      requirements: ['Invite and help 10 friends achieve reductions']
    },
    {
      id: '9',
      title: 'Streak Master',
      description: 'Maintain a 100-day sustainability streak',
      icon: '🔥',
      category: 'Consistency',
      points: 750,
      rarity: 'legendary',
      unlocked: false,
      progress: 12,
      maxProgress: 100,
      requirements: ['Log sustainable actions for 100 consecutive days']
    },
    {
      id: '10',
      title: 'Climate Champion',
      description: 'Reduce emissions by 50% and maintain for 6 months',
      icon: '🏆',
      category: 'Impact',
      points: 1000,
      rarity: 'legendary',
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      requirements: ['Achieve and maintain 50% emission reduction']
    },
    {
      id: '11',
      title: 'Market Trader',
      description: 'Complete 50 carbon credit transactions',
      icon: '💰',
      category: 'Trading',
      points: 300,
      rarity: 'rare',
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      requirements: ['Buy or sell 50 carbon credits']
    },
    {
      id: '12',
      title: 'Data Scientist',
      description: 'Log detailed emissions data for 90 days',
      icon: '📊',
      category: 'Tracking',
      points: 200,
      rarity: 'rare',
      unlocked: false,
      progress: 45,
      maxProgress: 90,
      requirements: ['Complete detailed carbon tracking for 90 days']
    },
    {
      id: '13',
      title: 'Innovation Adopter',
      description: 'Try 5 new sustainable technologies',
      icon: '🚀',
      category: 'Innovation',
      points: 400,
      rarity: 'epic',
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      requirements: ['Adopt 5 different sustainable technologies']
    },
    {
      id: '14',
      title: 'Global Impact',
      description: 'Inspire 100 people to join the platform',
      icon: '🌐',
      category: 'Influence',
      points: 1500,
      rarity: 'legendary',
      unlocked: false,
      progress: 15,
      maxProgress: 100,
      requirements: ['Successfully refer 100 new users']
    },
    {
      id: '15',
      title: 'Perfect Month',
      description: 'Meet all sustainability goals for 30 days',
      icon: '💎',
      category: 'Excellence',
      points: 800,
      rarity: 'legendary',
      unlocked: false,
      progress: 12,
      maxProgress: 30,
      requirements: ['Achieve all daily goals for 30 consecutive days']
    }
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Meatless Monday',
      description: 'Go vegetarian for all meals today',
      type: 'daily',
      category: 'Food',
      points: 25,
      progress: 0,
      maxProgress: 1,
      timeLeft: '18 hours',
      participants: 2847,
      difficulty: 'easy',
      active: true,
      completed: false
    },
    {
      id: '2',
      title: 'Bike Week Challenge',
      description: 'Use bicycle for transportation 5 days this week',
      type: 'weekly',
      category: 'Transport',
      points: 150,
      progress: 2,
      maxProgress: 5,
      timeLeft: '4 days',
      participants: 1256,
      difficulty: 'medium',
      active: true,
      completed: false
    },
    {
      id: '3',
      title: 'Zero Waste Week',
      description: 'Produce no single-use plastic waste for 7 days',
      type: 'weekly',
      category: 'Waste',
      points: 300,
      progress: 3,
      maxProgress: 7,
      timeLeft: '3 days',
      participants: 892,
      difficulty: 'hard',
      active: true,
      completed: false
    },
    {
      id: '4',
      title: 'Energy Saver',
      description: 'Reduce electricity usage by 20% this month',
      type: 'monthly',
      category: 'Energy',
      points: 400,
      progress: 12,
      maxProgress: 20,
      timeLeft: '18 days',
      participants: 3421,
      difficulty: 'medium',
      active: true,
      completed: false
    },
    {
      id: '5',
      title: 'Local Food Friday',
      description: 'Buy only locally sourced food today',
      type: 'daily',
      category: 'Food',
      points: 30,
      progress: 1,
      maxProgress: 1,
      timeLeft: 'Completed',
      participants: 1847,
      difficulty: 'easy',
      active: false,
      completed: true
    }
  ]);

  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
      level: 12,
      ecoPoints: 2847,
      streak: 28,
      status: 'online',
      lastActivity: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
      level: 10,
      ecoPoints: 2156,
      streak: 15,
      status: 'online',
      lastActivity: '1 hour ago'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=100&h=100&fit=crop&crop=face',
      level: 9,
      ecoPoints: 1923,
      streak: 21,
      status: 'offline',
      lastActivity: '3 hours ago'
    }
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: 'Premium Calculator Theme',
      description: 'Unlock exclusive dark mode theme',
      cost: 500,
      category: 'digital',
      available: true,
      claimed: false,
      icon: Sparkles,
      value: 'Digital Theme'
    },
    {
      id: '2',
      title: 'Eco-Friendly Water Bottle',
      description: 'Sustainable stainless steel water bottle',
      cost: 1200,
      category: 'physical',
      available: true,
      claimed: false,
      icon: Gift,
      value: '$25 Value'
    },
    {
      id: '3',
      title: 'Tree Planting Certificate',
      description: 'Plant 10 trees in your name',
      cost: 800,
      category: 'donation',
      available: true,
      claimed: false,
      icon: TreePine,
      value: '10 Trees'
    },
    {
      id: '4',
      title: 'Virtual Sustainability Workshop',
      description: 'Access to exclusive online workshop',
      cost: 600,
      category: 'experience',
      available: true,
      claimed: false,
      icon: Award,
      value: '2 Hour Session'
    },
    {
      id: '5',
      title: 'Carbon Offset Credits',
      description: '1 ton CO2 offset credits',
      cost: 1500,
      category: 'donation',
      available: true,
      claimed: false,
      icon: Globe,
      value: '1 Ton CO2'
    },
    {
      id: '6',
      title: 'Sustainability Starter Kit',
      description: 'Bamboo utensils, reusable bags, and more',
      cost: 2000,
      category: 'physical',
      available: true,
      claimed: false,
      icon: Leaf,
      value: '$50 Value'
    }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'transport': return Car;
      case 'energy': return Zap;
      case 'food': return UtensilsCrossed;
      case 'waste': return Trash2;
      case 'social': return Users;
      case 'trading': return Trophy;
      default: return Star;
    }
  };

  const claimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && userStats.ecoPoints >= reward.cost) {
      setUserStats(prev => ({ ...prev, ecoPoints: prev.ecoPoints - reward.cost }));
      setRewards(prev => prev.map(r => 
        r.id === rewardId ? { ...r, claimed: true } : r
      ));
      toast.success(`Successfully claimed ${reward.title}!`);
    } else {
      toast.error('Insufficient EcoPoints!');
    }
  };

  const joinChallenge = (challengeId: string) => {
    toast.success('Successfully joined the challenge!');
  };

  const shareAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      toast.success(`Shared ${achievement.title} achievement!`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gamification Hub</h1>
        <p className="text-lg text-gray-600">Earn points, unlock achievements, and compete with friends</p>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="pt-4">
            <div className="text-center">
              <Star className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.ecoPoints.toLocaleString()}</div>
              <div className="text-xs opacity-90">EcoPoints</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="pt-4">
            <div className="text-center">
              <Award className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.level}</div>
              <div className="text-xs opacity-90">Level</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="pt-4">
            <div className="text-center">
              <Flame className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.streak}</div>
              <div className="text-xs opacity-90">Day Streak</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="pt-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.totalReduction}%</div>
              <div className="text-xs opacity-90">Reduction</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
          <CardContent className="pt-4">
            <div className="text-center">
              <Crown className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">#{userStats.rank}</div>
              <div className="text-xs opacity-90">Global Rank</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
          <CardContent className="pt-4">
            <div className="text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.achievements}</div>
              <div className="text-xs opacity-90">Badges</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
          <CardContent className="pt-4">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.friends}</div>
              <div className="text-xs opacity-90">Friends</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          {/* Achievement Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
              <CardDescription>
                {achievements.filter(a => a.unlocked).length} of {achievements.length} achievements unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} 
                className="h-3"
              />
            </CardContent>
          </Card>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = getCategoryIcon(achievement.category);
              return (
                <Card 
                  key={achievement.id} 
                  className={`relative overflow-hidden transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'shadow-md hover:shadow-lg border-green-200' 
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
                          <IconComponent className="h-3 w-3 mr-1" />
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
                          onClick={() => shareAchievement(achievement.id)}
                          className="w-full"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share Achievement
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          {/* Active Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Active Challenges</CardTitle>
              <CardDescription>Complete challenges to earn EcoPoints and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenges.filter(c => c.active).map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{challenge.title}</h4>
                          <Badge className={`text-white ${getDifficultyColor(challenge.difficulty)} hover:${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {challenge.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{challenge.progress}/{challenge.maxProgress}</span>
                          </div>
                          <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                          <span>{challenge.participants.toLocaleString()} participants</span>
                          <span>{challenge.timeLeft}</span>
                        </div>
                      </div>
                      
                      <div className="ml-4 text-right">
                        <div className="text-lg font-bold text-green-600">+{challenge.points}</div>
                        <div className="text-xs text-gray-500">EcoPoints</div>
                        <Button size="sm" className="mt-2" onClick={() => joinChallenge(challenge.id)}>
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {challenges.filter(c => c.completed).map((challenge) => (
                  <div key={challenge.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium text-sm">{challenge.title}</div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-500">+{challenge.points} pts</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>Top eco-warriors this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Sarah Chen', points: 2847, reduction: 35, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face' },
                  { rank: 2, name: 'Alex Thompson', points: 2156, reduction: 28, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face' },
                  { rank: 3, name: 'Maria Garcia', points: 1923, reduction: 25, avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=100&h=100&fit=crop&crop=face' },
                  { rank: 156, name: 'You', points: 1247, reduction: 23.5, avatar: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?w=100&h=100&fit=crop&crop=face' }
                ].map((user, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                    user.name === 'You' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-gray-600">#{user.rank}</div>
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.reduction}% reduction</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">EcoPoints</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Friends</CardTitle>
              <CardDescription>Connect with other eco-warriors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div>
                        <div className="font-semibold">{friend.name}</div>
                        <div className="text-sm text-gray-600">
                          Level {friend.level} • {friend.streak} day streak
                        </div>
                        <div className="text-xs text-gray-500">{friend.lastActivity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{friend.ecoPoints.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">EcoPoints</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4">
                <Users className="h-4 w-4 mr-2" />
                Invite Friends
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reward Store</CardTitle>
              <CardDescription>Exchange your EcoPoints for real rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className={`hover:shadow-lg transition-shadow ${
                    reward.claimed ? 'opacity-50' : ''
                  }`}>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                          <reward.icon className="h-8 w-8 text-green-600" />
                        </div>
                        
                        <div>
                          <h3 className="font-bold">{reward.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                        </div>

                        <Badge variant="secondary" className="text-xs">
                          {reward.category}
                        </Badge>

                        <div className="text-lg font-bold text-green-600">{reward.value}</div>

                        <div className="flex items-center justify-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{reward.cost.toLocaleString()} EcoPoints</span>
                        </div>

                        <Button 
                          className="w-full"
                          disabled={reward.claimed || userStats.ecoPoints < reward.cost}
                          onClick={() => claimReward(reward.id)}
                        >
                          {reward.claimed ? 'Claimed' : 
                           userStats.ecoPoints < reward.cost ? 'Insufficient Points' : 'Claim Reward'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}