'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import {
  Leaf, Calculator, Award, ShoppingCart, Users, TrendingUp, TrendingDown,
  Car, Zap, UtensilsCrossed, Trash2, Target, Trophy, Star, User, Bell,
  Settings, Flame, Sparkles, Brain, Mic, Moon, Sun, BarChart3, Activity,
  Plus, Download, Search, Menu, X, LogOut, User as UserIcon, ChevronDown,
  CreditCard, Crown, Check, Loader2, Shield, Building, Cpu, FileCheck,
  Globe, Layers, Database, Cloud, Lock, Wifi, Eye, CheckCircle, Briefcase,
  Calendar, Code, Package, Monitor, DollarSign, Rocket
} from 'lucide-react';

// Import components
import CarbonCalculator from '@/components/CarbonCalculator';
import Marketplace from '@/components/Marketplace';
import Achievements from '@/components/Achievements';
import Community from '@/components/Community';
import GamificationSystem from '@/components/GamificationSystem';
import StreakTracker from '@/components/StreakTracker';
import AIInsights from '@/components/AIInsights';
import VoiceIntegration from '@/components/VoiceIntegration';
import RealTimeMonitor from '@/components/RealTimeMonitor';
import AIAutopilot from '@/components/AIAutopilot';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';

// Professional Plan interface
interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  color: string;
  popular?: boolean;
  premium?: boolean;
  enterprise?: boolean;
  description?: string;
  maxUsers?: number;
  apiCalls?: number;
  support?: string;
  sla?: string;
}

// Payment data interface
interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export default function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // 🚀 PROFESSIONAL SAAS FEATURES
  const [realTimeData, setRealTimeData] = useState<any>({ status: 'active' });
  const [aiAutopilot, setAiAutopilot] = useState(true);
  const [blockchainVerified, setBlockchainVerified] = useState(true);
  const [enterpriseMode, setEnterpriseMode] = useState(false);
  const [carbonCredits, setCarbonCredits] = useState(125);
  const [smartNotifications, setSmartNotifications] = useState(true);
  
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  // Sample user data
  const userData = {
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex@purecarbon.com",
    avatar: "/api/placeholder/32/32",
    plan: "Professional",
    ecoPoints: 12470,
    carbonReduction: 23.8,
    currentEmissions: 185,
    streak: 14,
    company: "EcoTech Solutions",
    role: "Sustainability Director",
    teamSize: 25
  };

  // 🏢 PROFESSIONAL SAAS PRICING PLANS
  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      period: 'forever',
      description: 'Perfect for individuals getting started',
      maxUsers: 1,
      apiCalls: 100,
      support: 'Community',
      features: [
        'Basic carbon tracking',
        'Standard reporting',
        '1 month data retention',
        'Community support',
        'Mobile app access',
        'Basic integrations (5)',
        'Email notifications'
      ],
      color: 'gray'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 49,
      period: 'month',
      description: 'For growing businesses serious about sustainability',
      maxUsers: 25,
      apiCalls: 10000,
      support: 'Email & Chat',
      sla: '99.5% uptime',
      features: [
        'Advanced carbon analytics',
        'AI-powered insights',
        'Unlimited data retention',
        'Custom reporting',
        'API access (10K calls/month)',
        'Team collaboration',
        'Advanced integrations (50+)',
        'Real-time monitoring',
        'Goal automation',
        'Priority support',
        'Custom branding'
      ],
      color: 'blue',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      period: 'month',
      description: 'For large organizations',
      maxUsers: 500,
      apiCalls: 100000,
      support: 'Dedicated Manager',
      sla: '99.9% uptime',
      enterprise: true,
      features: [
        'Everything in Professional',
        'White-label platform',
        'Custom domain & SSL',
        'Advanced user management',
        'Blockchain verification',
        'Carbon marketplace',
        'Compliance automation',
        'Custom AI models',
        'Multi-tenant architecture',
        'Advanced security',
        'On-premise deployment',
        'SLA guarantee'
      ],
      color: 'purple'
    },
    {
      id: 'enterprise-plus',
      name: 'Enterprise Plus',
      price: 999,
      period: 'month',
      description: 'Ultimate solution for global enterprises',
      maxUsers: -1,
      apiCalls: -1,
      support: 'Dedicated Success Team',
      sla: '99.95% uptime',
      enterprise: true,
      premium: true,
      features: [
        'Everything in Enterprise',
        'Global deployment',
        'AI autopilot mode',
        'Quantum modeling',
        'Satellite analysis',
        'Supply chain tracking',
        'Climate modeling',
        'ESG optimization',
        'Carbon trading',
        'Regulatory AI',
        'Custom ML models',
        '24/7 support'
      ],
      color: 'gradient'
    }
  ];

  // Professional Navigation
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3, category: 'core' },
    { id: 'analytics', label: 'Advanced Analytics', icon: TrendingUp, category: 'core' },
    { id: 'realtime', label: 'Real-Time Monitor', icon: Activity, category: 'professional' },
    { id: 'ai-autopilot', label: 'AI Autopilot', icon: Brain, category: 'professional' },
    { id: 'calculator', label: 'Carbon Calculator', icon: Calculator, category: 'core' },
    { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, category: 'professional' },
    { id: 'blockchain', label: 'Blockchain Hub', icon: Shield, category: 'enterprise' },
    { id: 'marketplace', label: 'Carbon Marketplace', icon: ShoppingCart, category: 'professional' },
    { id: 'enterprise', label: 'Enterprise Suite', icon: Building, category: 'enterprise' },
    { id: 'compliance', label: 'Compliance Center', icon: FileCheck, category: 'enterprise' },
    { id: 'team', label: 'Team Management', icon: Users, category: 'professional' },
    { id: 'integrations', label: 'Integrations', icon: Package, category: 'professional' },
    { id: 'achievements', label: 'Achievements', icon: Award, category: 'core' },
    { id: 'voice', label: 'Voice Assistant', icon: Mic, category: 'professional' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'core' },
    { id: 'plans', label: 'Plans & Billing', icon: CreditCard, category: 'core' }
  ];

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      try {
        await logout();
      } catch (error) {
        console.error('Sign out error:', error);
      }
    }
  };

  useEffect(() => {
    const handleSwitchToPlans = () => {
      setActiveTab('plans');
    };
    document.addEventListener('switchToPlans', handleSwitchToPlans);
    return () => {
      document.removeEventListener('switchToPlans', handleSwitchToPlans);
    };
  }, []);

  const handlePlanUpgrade = async (plan: Plan) => {
    if (plan.enterprise) {
      // Redirect to contact sales
      window.open('mailto:sales@purecarbon.com?subject=Enterprise Plan Inquiry');
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const processPayment = async (paymentData: PaymentData) => {
    setIsProcessingPayment(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const success = Math.random() > 0.1;
      if (success) {
        alert(`Payment successful! Welcome to ${selectedPlan?.name} plan! 🎉`);
        setShowPaymentModal(false);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview userData={userData} />;
      case 'analytics':
        return <AdvancedAnalytics userData={userData} />;
      case 'realtime':
        return <RealTimeMonitor userData={userData} />;
      case 'ai-autopilot':
        return <AIAutopilot userData={userData} />;
      case 'calculator':
        return <CarbonCalculator />;
      case 'ai-insights':
        return <AIInsights />;
      case 'blockchain':
        return <BlockchainHub userData={userData} />;
      case 'marketplace':
        return <Marketplace />;
      case 'enterprise':
        return <EnterpriseSuite userData={userData} />;
      case 'compliance':
        return <ComplianceCenter userData={userData} />;
      case 'team':
        return <TeamManagement userData={userData} />;
      case 'integrations':
        return <IntegrationsHub userData={userData} />;
      case 'achievements':
        return <Achievements />;
      case 'voice':
        return <VoiceIntegration />;
      case 'settings':
        return <SettingsPanel userData={userData} />;
      case 'plans':
        return <PlansAndBilling plans={plans} userData={userData} handlePlanUpgrade={handlePlanUpgrade} />;
      default:
        return <DashboardOverview userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:dark:bg-gray-800 lg:border-r lg:border-gray-200 lg:dark:border-gray-700 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">PureCarbon</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {/* Core Features */}
            <div className="mb-4">
              <h3 className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Core Features
              </h3>
              {navItems.filter(item => item.category === 'core').map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-l-4 border-green-500'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Professional Features */}
            <div className="mb-4">
              <h3 className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                Professional Features
                <Badge variant="outline" className="ml-2 text-xs text-blue-600 border-blue-200">
                  Pro+
                </Badge>
              </h3>
              {navItems.filter(item => item.category === 'professional').map((item) => {
                const IconComponent = item.icon;
                const hasAccess = userData.plan !== 'Starter';
                return (
                  <button
                    key={item.id}
                    onClick={() => hasAccess && setActiveTab(item.id)}
                    disabled={!hasAccess}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                      !hasAccess
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                        : activeTab === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {!hasAccess && (
                      <Lock className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Enterprise Features */}
            <div className="mb-4">
              <h3 className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                Enterprise Features
                <Badge variant="outline" className="ml-2 text-xs text-purple-600 border-purple-200">
                  Enterprise
                </Badge>
              </h3>
              {navItems.filter(item => item.category === 'enterprise').map((item) => {
                const IconComponent = item.icon;
                const hasAccess = userData.plan.includes('Enterprise');
                return (
                  <button
                    key={item.id}
                    onClick={() => hasAccess && setActiveTab(item.id)}
                    disabled={!hasAccess}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                      !hasAccess
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                        : activeTab === item.id
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-l-4 border-purple-500'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {!hasAccess && (
                      <Lock className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-green-500 text-white">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {userData.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {userData.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant="secondary" className="text-xs">
                      {userData.plan}
                    </Badge>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 w-full">
        {/* Professional Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h1>
                    {realTimeData?.status === 'active' && (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                        Live
                      </Badge>
                    )}
                    {aiAutopilot && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                        <Brain className="w-3 h-3 mr-1" />
                        AI Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                    Professional carbon management platform
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 lg:space-x-4">
                {/* Enhanced Stats */}
                <div className="hidden xl:flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{userData.ecoPoints.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">EcoPoints</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{userData.carbonReduction}%</div>
                    <div className="text-xs text-gray-500">Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{carbonCredits}</div>
                    <div className="text-xs text-gray-500">Credits</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    {smartNotifications && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {renderTabContent()}
          </motion.div>
        </main>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Upgrade to {selectedPlan?.name}</span>
            </DialogTitle>
            <DialogDescription>
              Complete your payment to unlock premium features
            </DialogDescription>
          </DialogHeader>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const paymentData: PaymentData = {
                cardNumber: formData.get('cardNumber') as string,
                expiryDate: formData.get('expiryDate') as string,
                cvv: formData.get('cvv') as string,
                cardholderName: formData.get('cardholderName') as string,
              };
              processPayment(paymentData);
            }}
            className="space-y-4"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">{selectedPlan?.name} Plan</span>
                <span className="text-lg font-bold">
                  ${selectedPlan?.price}/{selectedPlan?.period}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessingPayment}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessingPayment}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pay ${selectedPlan?.price}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Professional Tab Components
function DashboardOverview({ userData }: { userData: any }) {
  const monthlyData = [
    { month: 'Jul', emissions: 245, target: 240, reduction: 15.2 },
    { month: 'Aug', emissions: 220, target: 230, reduction: 18.8 },
    { month: 'Sep', emissions: 205, target: 220, reduction: 21.5 },
    { month: 'Oct', emissions: 195, target: 210, reduction: 24.1 },
    { month: 'Nov', emissions: 185, target: 200, reduction: 26.7 },
    { month: 'Dec', emissions: 175, target: 190, reduction: 29.2 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {userData.name.split(' ')[0]}! 🌱
            </h2>
            <p className="text-lg opacity-90 mb-4">
              You're leading the sustainability revolution with {userData.carbonReduction}% carbon reduction
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Goal: Net Zero by 2030</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Rank: Top 5% globally</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <Leaf className="h-16 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Carbon Footprint
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {userData.currentEmissions} kg
            </div>
            <p className="text-sm text-green-600 font-medium">
              -{userData.carbonReduction}% this year
            </p>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                EcoPoints
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {userData.ecoPoints.toLocaleString()}
            </div>
            <p className="text-sm text-green-600 font-medium">
              +2,340 this month
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-xs">
                Platinum Tier
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Streak
              </CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {userData.streak} days
            </div>
            <p className="text-sm text-orange-600 font-medium">
              Personal best! 🔥
            </p>
            <Progress value={85} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Carbon Credits
              </CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              125
            </div>
            <p className="text-sm text-purple-600 font-medium">
              $3,750 value
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-xs text-green-600">
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Emissions Trend</CardTitle>
            <CardDescription>Monthly progress towards your goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Actual"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10B981" 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Current month emissions by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Transport', value: 85, color: 'bg-blue-500', icon: Car },
                { category: 'Energy', value: 65, color: 'bg-yellow-500', icon: Zap },
                { category: 'Food', value: 25, color: 'bg-green-500', icon: UtensilsCrossed },
                { category: 'Waste', value: 10, color: 'bg-red-500', icon: Trash2 }
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{item.value} kg</div>
                      <Progress value={(item.value / 185) * 100} className="w-20 h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">AI Insights</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get personalized recommendations to reduce your carbon footprint
            </p>
            <Button className="w-full">
              View Insights
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <ShoppingCart className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Carbon Marketplace</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Trade carbon credits and offset your emissions
            </p>
            <Button className="w-full">
              Visit Marketplace
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Team Collaboration</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Work together with your team on sustainability goals
            </p>
            <Button className="w-full">
              Manage Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Placeholder components for professional features
function AdvancedAnalytics({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Advanced Analytics Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Deep insights into your carbon performance and sustainability metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics Coming Soon</CardTitle>
            <CardDescription>
              Professional-grade analytics and reporting tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                Advanced analytics features are being developed
              </p>
              <Button>
                Request Early Access
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Predictive Modeling</CardTitle>
            <CardDescription>
              AI-powered carbon forecasting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                Predictive analytics coming in the next release
              </p>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Placeholder components for features not yet implemented
function BlockchainHub({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Blockchain Hub
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Blockchain-verified carbon credits and transparent reporting
        </p>
      </div>
      
      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Blockchain Verification</h3>
          <p className="text-gray-500 mb-4">Enterprise feature coming soon</p>
          <Button>Upgrade to Enterprise</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function EnterpriseSuite({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Enterprise Suite
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete enterprise carbon management solution
        </p>
      </div>
      
      <Card>
        <CardContent className="p-12 text-center">
          <Building className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Enterprise Features</h3>
          <p className="text-gray-500 mb-4">Contact sales for enterprise solutions</p>
          <Button>Contact Sales</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ComplianceCenter({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Compliance Center
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Automated compliance reporting and regulatory management
        </p>
      </div>
      
      <Card>
        <CardContent className="p-12 text-center">
          <FileCheck className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Compliance Automation</h3>
          <p className="text-gray-500 mb-4">Enterprise feature coming soon</p>
          <Button>Upgrade to Enterprise</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function TeamManagement({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Team Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Collaborate with your team on sustainability goals
        </p>
      </div>
      
      <Card>
        <CardContent className="p-12 text-center">
          <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
          <p className="text-gray-500 mb-4">Professional feature coming soon</p>
          <Button>Upgrade to Professional</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function IntegrationsHub({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Integrations Hub
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with your favorite tools and platforms
        </p>
      </div>
      
      <Card>
        <CardContent className="p-12 text-center">
          <Package className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">50+ Integrations</h3>
          <p className="text-gray-500 mb-4">Professional feature coming soon</p>
          <Button>Upgrade to Professional</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsPanel({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and preferences
        </p>
      </div>
      
      <Card>
        <CardContent className="p-12 text-center">
          <Settings className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Settings Panel</h3>
          <p className="text-gray-500 mb-4">Settings interface coming soon</p>
          <Button variant="outline">Coming Soon</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function PlansAndBilling({ plans, userData, handlePlanUpgrade }: { plans: Plan[], userData: any, handlePlanUpgrade: (plan: Plan) => void }) {
  return (
    <div className="space-y-8">
      {/* Professional Plans Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
          <Crown className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Professional Carbon Management
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Choose the perfect plan to accelerate your sustainability journey
        </p>
      </div>
      
      {/* Professional Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' :
              plan.enterprise ? 'ring-2 ring-purple-500 shadow-lg' :
              plan.premium ? 'ring-2 ring-purple-500 shadow-xl' : ''
            }`}
          >
            {/* Plan Badge */}
            {(plan.popular || plan.enterprise || plan.premium) && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className={`${
                  plan.popular ? 'bg-blue-500 text-white' :
                  plan.enterprise ? 'bg-purple-500 text-white' :
                  plan.premium ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''
                }`}>
                  {plan.popular && <><Crown className="h-3 w-3 mr-1" />Most Popular</>}
                  {plan.enterprise && <><Building className="h-3 w-3 mr-1" />Enterprise</>}
                  {plan.premium && <><Star className="h-3 w-3 mr-1" />Premium</>}
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold mb-2">
                {plan.name}
              </CardTitle>
              {plan.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
              )}
              <div className="mb-4">
                <span className="text-5xl font-bold">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-500 text-lg">
                    /{plan.period}
                  </span>
                )}
              </div>
              
              {/* Plan Specs */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {plan.maxUsers && (
                  <div className="flex justify-between">
                    <span>Users:</span>
                    <span className="font-medium">
                      {plan.maxUsers === -1 ? 'Unlimited' : plan.maxUsers.toLocaleString()}
                    </span>
                  </div>
                )}
                {plan.support && (
                  <div className="flex justify-between">
                    <span>Support:</span>
                    <span className="font-medium">{plan.support}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <ul className="space-y-3 mb-6">
                {plan.features.slice(0, 8).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.features.length > 8 && (
                  <li className="text-sm text-gray-500 italic">
                    + {plan.features.length - 8} more features
                  </li>
                )}
              </ul>
              
              <Button
                onClick={() => handlePlanUpgrade(plan)}
                className={`w-full ${
                  plan.premium
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : plan.enterprise
                    ? 'bg-purple-500 hover:bg-purple-600'
                    : plan.popular 
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                } text-white`}
                disabled={userData.plan === plan.name}
              >
                {userData.plan === plan.name ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Current Plan
                  </>
                ) : plan.enterprise ? (
                  <>
                    <Building className="h-4 w-4 mr-2" />
                    Contact Sales
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    {plan.price === 0 ? 'Get Started Free' : 'Upgrade Now'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise Contact */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
        <Building className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Need a Custom Solution?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Our enterprise team can create a tailored solution for your organization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Briefcase className="h-4 w-4 mr-2" />
            Contact Enterprise Sales
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
