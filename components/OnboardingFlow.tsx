'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Car, 
  Home, 
  UtensilsCrossed, 
  Target,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Leaf,
  Award,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingData {
  personal: {
    name: string;
    email: string;
    location: string;
    householdSize: number;
  };
  lifestyle: {
    transportMode: string;
    homeType: string;
    dietType: string;
    sustainabilityLevel: string;
  };
  goals: {
    primaryGoal: string;
    targetReduction: number;
    timeframe: string;
    interests: string[];
  };
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

export default function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    personal: {
      name: '',
      email: '',
      location: '',
      householdSize: 1
    },
    lifestyle: {
      transportMode: '',
      homeType: '',
      dietType: '',
      sustainabilityLevel: ''
    },
    goals: {
      primaryGoal: '',
      targetReduction: 20,
      timeframe: '',
      interests: []
    }
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to PureCarbon! 🌱',
      description: 'Let\'s personalize your carbon journey',
      icon: Sparkles
    },
    {
      id: 'personal',
      title: 'Tell us about yourself',
      description: 'Basic information to get started',
      icon: User
    },
    {
      id: 'lifestyle',
      title: 'Your lifestyle',
      description: 'Help us understand your daily habits',
      icon: Home
    },
    {
      id: 'goals',
      title: 'Set your goals',
      description: 'What do you want to achieve?',
      icon: Target
    },
    {
      id: 'complete',
      title: 'You\'re all set! 🎉',
      description: 'Ready to start your carbon journey',
      icon: CheckCircle
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateData = (section: keyof OnboardingData, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(data);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Welcome step
      case 1: return data.personal.name && data.personal.email;
      case 2: return data.lifestyle.transportMode && data.lifestyle.homeType && data.lifestyle.dietType;
      case 3: return data.goals.primaryGoal && data.goals.timeframe;
      default: return true;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      nextStep();
    } else {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">PureCarbon</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Step Content */}
        <Card className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {currentStep === 0 && <WelcomeStep />}
              {currentStep === 1 && <PersonalStep data={data} updateData={updateData} />}
              {currentStep === 2 && <LifestyleStep data={data} updateData={updateData} />}
              {currentStep === 3 && <GoalsStep data={data} updateData={updateData} />}
              {currentStep === 4 && <CompleteStep data={data} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center p-6 border-t">
            <div className="flex space-x-2">
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <Button variant="outline" onClick={() => paginate(-1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              {currentStep === 0 && (
                <Button variant="ghost" onClick={onSkip}>
                  Skip Setup
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              {currentStep < steps.length - 1 ? (
                <Button 
                  onClick={() => paginate(1)} 
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {currentStep === 0 ? 'Get Started' : 'Continue'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={() => onComplete(data)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Start Your Journey
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Leaf className="h-12 w-12 text-white" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to PureCarbon! 🌱
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Your AI-powered companion for tracking and reducing your carbon footprint
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {[
          { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your carbon footprint' },
          { icon: Award, title: 'Earn Rewards', desc: 'Get EcoPoints for sustainable actions' },
          { icon: Users, title: 'Join Community', desc: 'Connect with eco-warriors' }
        ].map((feature, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <feature.icon className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PersonalStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  return (
    <div className="p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Tell us about yourself</span>
        </CardTitle>
        <CardDescription>
          This helps us personalize your carbon tracking experience
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.personal.name}
              onChange={(e) => updateData('personal', 'name', e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={data.personal.email}
              onChange={(e) => updateData('personal', 'email', e.target.value)}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={data.personal.location} onValueChange={(value) => updateData('personal', 'location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="household">Household Size</Label>
            <Select value={data.personal.householdSize.toString()} onValueChange={(value) => updateData('personal', 'householdSize', parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 person</SelectItem>
                <SelectItem value="2">2 people</SelectItem>
                <SelectItem value="3">3 people</SelectItem>
                <SelectItem value="4">4 people</SelectItem>
                <SelectItem value="5">5+ people</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

function LifestyleStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  return (
    <div className="p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center space-x-2">
          <Home className="h-5 w-5" />
          <span>Your lifestyle</span>
        </CardTitle>
        <CardDescription>
          Help us understand your daily habits to provide better recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label>Primary mode of transport</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'car', label: 'Car', icon: Car },
              { value: 'public', label: 'Public Transit', icon: Zap },
              { value: 'bike', label: 'Bike/Walk', icon: Leaf },
              { value: 'mixed', label: 'Mixed', icon: TrendingUp }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateData('lifestyle', 'transportMode', option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.lifestyle.transportMode === option.value
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <option.icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Home type</Label>
          <Select value={data.lifestyle.homeType} onValueChange={(value) => updateData('lifestyle', 'homeType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your home type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Diet type</Label>
          <Select value={data.lifestyle.dietType} onValueChange={(value) => updateData('lifestyle', 'dietType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">Omnivore</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
              <SelectItem value="flexitarian">Flexitarian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Current sustainability level</Label>
          <Select value={data.lifestyle.sustainabilityLevel} onValueChange={(value) => updateData('lifestyle', 'sustainabilityLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="How sustainable are you currently?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Just getting started</SelectItem>
              <SelectItem value="intermediate">Making some efforts</SelectItem>
              <SelectItem value="advanced">Very conscious</SelectItem>
              <SelectItem value="expert">Sustainability expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </div>
  );
}

function GoalsStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  const interests = [
    'Carbon tracking', 'Renewable energy', 'Sustainable transport', 
    'Waste reduction', 'Plant-based diet', 'Carbon offsetting',
    'Community challenges', 'Green technology', 'Climate education'
  ];

  const toggleInterest = (interest: string) => {
    const current = data.goals.interests;
    if (current.includes(interest)) {
      updateData('goals', 'interests', current.filter(i => i !== interest));
    } else {
      updateData('goals', 'interests', [...current, interest]);
    }
  };

  return (
    <div className="p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Set your goals</span>
        </CardTitle>
        <CardDescription>
          Define what you want to achieve with PureCarbon
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label>Primary goal</Label>
          <Select value={data.goals.primaryGoal} onValueChange={(value) => updateData('goals', 'primaryGoal', value)}>
            <SelectTrigger>
              <SelectValue placeholder="What's your main objective?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reduce">Reduce my carbon footprint</SelectItem>
              <SelectItem value="track">Track and understand my impact</SelectItem>
              <SelectItem value="offset">Offset my emissions</SelectItem>
              <SelectItem value="learn">Learn about sustainability</SelectItem>
              <SelectItem value="compete">Compete with friends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Target reduction: {data.goals.targetReduction}%</Label>
          <input
            type="range"
            min="10"
            max="50"
            value={data.goals.targetReduction}
            onChange={(e) => updateData('goals', 'targetReduction', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>10%</span>
            <span>50%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Timeframe</Label>
          <Select value={data.goals.timeframe} onValueChange={(value) => updateData('goals', 'timeframe', value)}>
            <SelectTrigger>
              <SelectValue placeholder="When do you want to achieve this?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 months</SelectItem>
              <SelectItem value="6months">6 months</SelectItem>
              <SelectItem value="1year">1 year</SelectItem>
              <SelectItem value="2years">2 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Areas of interest (select all that apply)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  data.goals.interests.includes(interest)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  );
}

function CompleteStep({ data }: { data: OnboardingData }) {
  return (
    <div className="p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>
      </motion.div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        You're all set, {data.personal.name}! 🎉
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Your personalized carbon journey is ready to begin
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Your Goal</h3>
          <p className="text-sm text-green-600 dark:text-green-400">
            {data.goals.targetReduction}% reduction in {data.goals.timeframe}
          </p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Interests</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {data.goals.interests.length} areas selected
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Badge className="bg-green-500 hover:bg-green-500 text-white">
          <Award className="h-3 w-3 mr-1" />
          Welcome Bonus: 100 EcoPoints
        </Badge>
      </div>
    </div>
  );
}