'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Trophy, 
  Target, 
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  TrendingUp,
  Award,
  Star,
  Crown,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  ecoPoints: number;
  reduction: number;
  streak: number;
  level: number;
  badges: number;
  rank: number;
  change: 'up' | 'down' | 'same';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  timeLeft: string;
  progress: number;
  maxProgress: number;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface Post {
  id: string;
  user: string;
  avatar: string;
  time: string;
  content: string;
  achievement?: string;
  likes: number;
  comments: number;
  liked: boolean;
}

export default function Community() {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const leaderboardUsers: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
      ecoPoints: 2847,
      reduction: 35,
      streak: 28,
      level: 12,
      badges: 15,
      rank: 1,
      change: 'same'
    },
    {
      id: '2',
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
      ecoPoints: 2156,
      reduction: 28,
      streak: 15,
      level: 10,
      badges: 12,
      rank: 2,
      change: 'up'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=100&h=100&fit=crop&crop=face',
      ecoPoints: 1923,
      reduction: 25,
      streak: 21,
      level: 9,
      badges: 11,
      rank: 3,
      change: 'down'
    },
    {
      id: '4',
      name: 'You',
      avatar: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?w=100&h=100&fit=crop&crop=face',
      ecoPoints: 1247,
      reduction: 20,
      streak: 12,
      level: 8,
      badges: 8,
      rank: 8,
      change: 'up'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Zero Waste Week',
      description: 'Produce no single-use plastic waste for 7 days',
      participants: 1247,
      timeLeft: '3 days left',
      progress: 4,
      maxProgress: 7,
      reward: 300,
      difficulty: 'hard',
      category: 'Waste'
    },
    {
      id: '2',
      title: 'Bike to Work',
      description: 'Cycle to work for 5 consecutive days',
      participants: 856,
      timeLeft: '5 days left',
      progress: 2,
      maxProgress: 5,
      reward: 150,
      difficulty: 'medium',
      category: 'Transport'
    },
    {
      id: '3',
      title: 'Meatless Monday',
      description: 'Go vegetarian for all meals on Mondays this month',
      participants: 2103,
      timeLeft: '2 weeks left',
      progress: 3,
      maxProgress: 4,
      reward: 100,
      difficulty: 'easy',
      category: 'Food'
    }
  ];

  const posts: Post[] = [
    {
      id: '1',
      user: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
      time: '2 hours ago',
      content: 'Just completed my 30-day sustainable commute streak! 🚲 Saved 45kg of CO₂ this month.',
      achievement: 'Green Commuter Master',
      likes: 23,
      comments: 8,
      liked: false
    },
    {
      id: '2',
      user: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
      time: '5 hours ago',
      content: 'Switched to renewable energy at home and my carbon footprint dropped by 40%! The initial investment was worth it.',
      likes: 31,
      comments: 12,
      liked: true
    },
    {
      id: '3',
      user: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=100&h=100&fit=crop&crop=face',
      time: '1 day ago',
      content: 'Started a community garden in our neighborhood. Already have 15 families participating! 🌱',
      likes: 47,
      comments: 18,
      liked: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Award className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-600" />;
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const handleLike = (postId: string) => {
    toast.success('Post liked!');
  };

  const handleShare = (postId: string) => {
    toast.success('Post shared!');
  };

  const joinChallenge = (challengeId: string) => {
    toast.success('Successfully joined the challenge!');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Hub</h1>
        <p className="text-lg text-gray-600">Connect with eco-warriors and participate in sustainability challenges</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="feed" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Community Feed</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-6">
          {/* Top 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span>Top Eco-Warriors</span>
              </CardTitle>
              <CardDescription>This month's sustainability champions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leaderboardUsers.slice(0, 3).map((user, index) => (
                  <div key={user.id} className={`text-center p-6 rounded-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300' :
                    index === 1 ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300' :
                    'bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300'
                  }`}>
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center mb-2">
                      {getRankIcon(user.rank)}
                    </div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <div className="text-2xl font-bold text-green-600 mt-2">{user.ecoPoints.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">EcoPoints</div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <div className="font-semibold">{user.reduction}%</div>
                        <div className="text-gray-600">Reduction</div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.streak}</div>
                        <div className="text-gray-600">Day Streak</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>See how you rank against other eco-warriors worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardUsers.map((user) => (
                  <div key={user.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                    user.name === 'You' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                        {user.change === 'up' && <ChevronUp className="h-4 w-4 text-green-500" />}
                        {user.change === 'down' && <ChevronDown className="h-4 w-4 text-red-500" />}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-600 flex items-center space-x-4">
                          <span>Level {user.level}</span>
                          <span>{user.badges} badges</span>
                          <span>{user.streak} day streak</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{user.ecoPoints.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">EcoPoints</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <CardDescription className="mt-1">{challenge.description}</CardDescription>
                    </div>
                    <Badge className={`text-white ${getDifficultyColor(challenge.difficulty)} hover:${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants.toLocaleString()} joined</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{challenge.timeLeft}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Progress</span>
                      <span>{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">+{challenge.reward} EcoPoints</span>
                    </div>
                    <Button size="sm" onClick={() => joinChallenge(challenge.id)}>
                      Join Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">{post.user}</span>
                          <span className="text-sm text-gray-500">{post.time}</span>
                        </div>
                        
                        {post.achievement && (
                          <Badge className="mb-3 bg-green-100 text-green-800 hover:bg-green-100">
                            <Award className="w-3 h-3 mr-1" />
                            {post.achievement}
                          </Badge>
                        )}
                        
                        <p className="text-gray-900 mb-4">{post.content}</p>
                        
                        <div className="flex items-center space-x-6">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.liked ? 'text-red-500' : ''}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${post.liked ? 'fill-current' : ''}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleShare(post.id)}>
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">12,547</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.3M</div>
                    <div className="text-sm text-gray-600">kg CO₂ Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-gray-600">Active Challenges</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      '#ZeroWasteChallenge',
                      '#BikeToWork',
                      '#RenewableEnergy',
                      '#PlantBased',
                      '#CarbonOffset'
                    ].map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">{topic}</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}