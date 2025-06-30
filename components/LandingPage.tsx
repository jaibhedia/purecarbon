'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';
import { 
  Leaf, 
  TrendingUp, 
  Award, 
  Users, 
  Calculator, 
  ShoppingCart,
  Target,
  Globe,
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
  Play,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Brain,
  BarChart3,
  Building2,
  Briefcase,
  ChevronRight,
  Menu,
  X,
  Crown,
  Rocket,
  Lock,
  Cpu,
  Activity,
  FileCheck,
  DollarSign,
  TrendingDown,
  Eye,
  Code,
  Layers,
  Database,
  Building,
  Monitor,
  Cloud,
  Package,
  Users2,
  Quote,
  Calendar,
  CreditCard,
  Smartphone,
  Wifi,
  Gauge,
  LineChart,
  PieChart,
  BarChart,
  Mic,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Download,
  GitBranch,
  Workflow,
  Settings,
  Command,
  Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onAuth: () => void;
}

export default function LandingPage({ onAuth }: LandingPageProps) {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const testimonials = [
    {
      quote: "PureCarbon transformed our sustainability reporting from a manual nightmare to an automated success story. We've reduced our carbon footprint by 45% in just 8 months.",
      author: "Sarah Chen",
      title: "Chief Sustainability Officer",
      company: "TechCorp Global",
      avatar: "/api/placeholder/64/64"
    },
    {
      quote: "The AI insights are game-changing. We discovered optimization opportunities worth $2.3M annually that we never would have found manually.",
      author: "Marcus Rodriguez",
      title: "VP of Operations",
      company: "GreenManufacturing Inc",
      avatar: "/api/placeholder/64/64"
    },
    {
      quote: "From pilot to enterprise deployment in 3 months. The platform scales beautifully and our investors love the transparency in ESG reporting.",
      author: "Jennifer Kim",
      title: "CEO",
      company: "Sustainable Ventures",
      avatar: "/api/placeholder/64/64"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Carbon Intelligence',
      description: 'Advanced machine learning algorithms that automatically identify reduction opportunities, predict future emissions, and optimize your carbon strategy.',
      features: ['Predictive Analytics', 'Smart Recommendations', 'Automated Insights', 'Pattern Recognition'],
      highlight: 'AI-First'
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring & IoT',
      description: 'Connect thousands of sensors and data sources for live carbon tracking across all facilities, vehicles, and operations.',
      features: ['Live Data Streams', 'IoT Integration', 'Alert Systems', 'Anomaly Detection'],
      highlight: 'Real-Time'
    },
    {
      icon: Shield,
      title: 'Blockchain Verified Credits',
      description: 'Immutable carbon credit tracking with blockchain verification ensures audit-ready compliance and transparent offset management.',
      features: ['Blockchain Security', 'Verified Credits', 'Audit Trail', 'Compliance Ready'],
      highlight: 'Blockchain'
    },
    {
      icon: Building,
      title: 'Enterprise-Grade Platform',
      description: 'Built for Fortune 500 scale with SOC2 compliance, SSO/SAML, custom integrations, and dedicated success management.',
      features: ['Enterprise Security', 'Custom Integrations', 'White-Label', 'Dedicated Support'],
      highlight: 'Enterprise'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics & BI',
      description: 'Comprehensive dashboards, custom reports, and business intelligence tools designed for executives and sustainability teams.',
      features: ['Executive Dashboards', 'Custom Reports', 'Data Visualization', 'KPI Tracking'],
      highlight: 'Analytics'
    },
    {
      icon: Globe,
      title: 'Global Marketplace & Trading',
      description: 'Access verified carbon credits, renewable energy certificates, and sustainability projects through our integrated marketplace.',
      features: ['Carbon Credits', 'REC Trading', 'Project Marketplace', 'Portfolio Management'],
      highlight: 'Marketplace'
    }
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      price: 0,
      period: 'forever',
      highlight: false,
      badge: '',
      features: [
        'Up to 1 user',
        'Basic carbon tracking',
        'Standard reporting',
        '1-month data retention',
        'Community support',
        'Mobile app access',
        'Email notifications'
      ],
      cta: 'Get Started Free',
      maxUsers: '1 user',
      support: 'Community'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing businesses serious about sustainability',
      price: 49,
      period: 'month',
      highlight: true,
      badge: 'Most Popular',
      features: [
        'Up to 25 users',
        'Advanced carbon analytics',
        'AI-powered insights & recommendations',
        'Unlimited data retention',
        'Custom reporting & dashboards',
        'API access (10K calls/month)',
        'Team collaboration tools',
        'Advanced integrations (50+)',
        'Real-time monitoring',
        'Goal tracking & automation',
        'Priority email & chat support'
      ],
      cta: 'Start Free Trial',
      maxUsers: '25 users',
      support: 'Email & Chat'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with complex requirements',
      price: 199,
      period: 'month',
      highlight: false,
      badge: 'Enterprise',
      features: [
        'Up to 500 users',
        'Everything in Professional',
        'White-label platform',
        'Custom domain & SSL',
        'Advanced user management (SSO/SAML)',
        'Blockchain verification',
        'Carbon credit marketplace',
        'Compliance automation (SOX, TCFD, CDP)',
        'Custom AI model training',
        'Multi-tenant architecture',
        'Advanced security (SOC2, ISO 27001)',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      maxUsers: '500 users',
      support: 'Dedicated Manager'
    },
    {
      id: 'enterprise-plus',
      name: 'Enterprise Plus',
      description: 'Ultimate solution for global enterprises',
      price: 999,
      period: 'month',
      highlight: false,
      badge: 'Premium',
      features: [
        'Unlimited users',
        'Everything in Enterprise',
        'Global multi-region deployment',
        'Advanced AI autopilot mode',
        'Quantum carbon modeling',
        'Satellite imagery analysis',
        'Supply chain carbon tracking',
        'Predictive climate modeling',
        'ESG portfolio optimization',
        'Carbon futures trading platform',
        'Custom machine learning models',
        '24/7 white-glove support'
      ],
      cta: 'Contact Sales',
      maxUsers: 'Unlimited',
      support: 'Success Team'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">PureCarbon</span>
              <Badge variant="outline" className="ml-2 text-xs">
                Enterprise SaaS
              </Badge>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#platform" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Platform</a>
              <a href="#solutions" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Solutions</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Pricing</a>
              <a href="#customers" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Customers</a>
              <a href="#resources" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Resources</a>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden md:inline-flex"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" className="hidden md:inline-flex" onClick={onAuth}>Sign In</Button>
              <Button onClick={onAuth} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Rocket className="h-4 w-4 mr-2" />
                Start Free Trial
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#platform" className="block text-gray-600 dark:text-gray-300 font-medium">Platform</a>
              <a href="#solutions" className="block text-gray-600 dark:text-gray-300 font-medium">Solutions</a>
              <a href="#pricing" className="block text-gray-600 dark:text-gray-300 font-medium">Pricing</a>
              <a href="#customers" className="block text-gray-600 dark:text-gray-300 font-medium">Customers</a>
              <a href="#resources" className="block text-gray-600 dark:text-gray-300 font-medium">Resources</a>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button variant="ghost" className="w-full justify-start mb-2" onClick={onAuth}>Sign In</Button>
                <Button onClick={onAuth} className="w-full">Start Free Trial</Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-16"
      >
        {/* Hero Section */}
        <motion.section 
          className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 border-0 text-sm px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  Trusted by Fortune 500 Companies
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                The World's Leading
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Carbon Management Platform
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Enterprise-grade carbon intelligence powered by AI, blockchain verification, and real-time IoT monitoring. 
                Transform your sustainability strategy with the platform built for global scale.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Button 
                  onClick={onAuth}
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4 shadow-lg"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Enterprise Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-4 border-2"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Platform Demo
                </Button>
              </motion.div>

              {/* Enterprise Trust Indicators */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-600 dark:text-gray-400 mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Shield className="h-8 w-8 text-green-600" />
                  <span className="font-semibold">SOC 2 Type II</span>
                  <span>Certified</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <span className="font-semibold">4.9/5 Rating</span>
                  <span>G2 Leader</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Zap className="h-8 w-8 text-blue-600" />
                  <span className="font-semibold">99.99% Uptime</span>
                  <span>SLA Guaranteed</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Users className="h-8 w-8 text-purple-600" />
                  <span className="font-semibold">2M+ Users</span>
                  <span>Worldwide</span>
                </div>
              </motion.div>

              {/* Platform Preview */}
              <motion.div
                className="relative max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2 ring-1 ring-gray-200 dark:ring-gray-700">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="text-left">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">PureCarbon Enterprise</h3>
                          <p className="text-gray-500 dark:text-gray-400">Professional Carbon Management Platform</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">Live</Badge>
                          <Badge className="bg-blue-100 text-blue-800">AI Active</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-500">Monthly Emissions</span>
                              <TrendingDown className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">2,347 kg</div>
                            <div className="text-sm text-green-600">-23% vs last month</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-500">AI Insights</span>
                              <Brain className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">47</div>
                            <div className="text-sm text-blue-600">New recommendations</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-500">Savings</span>
                              <DollarSign className="h-4 w-4 text-purple-500" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">$47,329</div>
                            <div className="text-sm text-purple-600">This quarter</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          </div>
        </motion.section>

        {/* Enterprise Stats Section */}
        <motion.section 
          className="py-20 bg-white dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Powering the World's Carbon Transformation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Trusted by industry leaders across 45+ countries
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '$2.3T', label: 'Assets Under Management', sublabel: 'Carbon portfolio value' },
                { value: '500+', label: 'Enterprise Customers', sublabel: 'Including 47 Fortune 500' },
                { value: '50M+', label: 'Tons CO₂ Tracked', sublabel: 'Across global operations' },
                { value: '99.99%', label: 'Platform Uptime', sublabel: 'Enterprise SLA' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{stat.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Platform Features Section */}
        <motion.section 
          className="py-24 bg-gray-50 dark:bg-gray-900/30"
          variants={itemVariants}
          id="platform"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Cpu className="w-4 h-4 mr-2" />
                Advanced Platform Capabilities
              </Badge>
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Enterprise-Grade Carbon Intelligence
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Built for Fortune 500 scale with AI-first architecture, blockchain verification, 
                and real-time monitoring across global operations.
              </motion.p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardHeader className="relative">
                        <div className="absolute top-4 right-4">
                          <Badge variant="outline" className="text-xs">
                            {feature.highlight}
                          </Badge>
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                        <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {feature.features.map((item, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-6" variant="outline">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Customer Testimonials */}
        <motion.section 
          className="py-24 bg-white dark:bg-gray-950"
          variants={itemVariants}
          id="customers"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Users className="w-4 h-4 mr-2" />
                Customer Success Stories
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See how Fortune 500 companies achieve their sustainability goals with PureCarbon
              </p>
            </div>

            <div className="relative">
              <Card className="max-w-4xl mx-auto border-0 shadow-2xl">
                <CardContent className="p-12">
                  <div className="text-center">
                    <Quote className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                    <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white mb-8 leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <Avatar className="h-16 w-16 ring-4 ring-gray-200 dark:ring-gray-700">
                        <AvatarImage src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].author} />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-lg">
                          {testimonials[currentTestimonial].author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">
                          {testimonials[currentTestimonial].author}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {testimonials[currentTestimonial].title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {testimonials[currentTestimonial].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial Navigation */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentTestimonial === index 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Enterprise Solutions Section */}
        <motion.section 
          className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950"
          variants={itemVariants}
          id="solutions"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Building className="w-4 h-4 mr-2" />
                Enterprise Solutions
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Built for Global Scale
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                From Fortune 500 enterprises to rapidly scaling startups, our platform adapts to your 
                organization's unique carbon management requirements.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Startups & Scale-ups',
                  description: 'Fast deployment for growing companies establishing their carbon foundation.',
                  icon: Rocket,
                  features: [
                    'Quick 24-hour setup',
                    'Essential carbon tracking',
                    'Team collaboration (up to 25 users)',
                    'Basic compliance reporting',
                    'Email & chat support',
                    'API access (10K calls/month)'
                  ],
                  pricing: 'Starting at $49/month',
                  cta: 'Start Free Trial',
                  highlight: false
                },
                {
                  title: 'Enterprise Organizations',
                  description: 'Comprehensive platform for large organizations with complex requirements.',
                  icon: Building,
                  features: [
                    'Multi-facility global deployment',
                    'Advanced AI & predictive analytics',
                    'Custom integrations & white-label',
                    'SSO/SAML & advanced security',
                    'Blockchain verification',
                    'Dedicated success manager'
                  ],
                  pricing: 'Starting at $199/month',
                  cta: 'Schedule Demo',
                  highlight: true
                },
                {
                  title: 'Global Enterprises',
                  description: 'Ultimate solution for multinational corporations and sustainability leaders.',
                  icon: Globe,
                  features: [
                    'Global multi-region deployment',
                    'Quantum carbon modeling',
                    'Supply chain carbon tracking',
                    'ESG portfolio optimization',
                    'Custom ML model development',
                    '24/7 white-glove support'
                  ],
                  pricing: 'Custom enterprise pricing',
                  cta: 'Contact Sales',
                  highlight: false
                }
              ].map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <Card key={index} className={`relative ${solution.highlight ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : 'shadow-lg'} border-0`}>
                    {solution.highlight && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                          <Crown className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-3">{solution.title}</CardTitle>
                      <CardDescription className="text-base mb-4">
                        {solution.description}
                      </CardDescription>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {solution.pricing}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-4 mb-8">
                        {solution.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${solution.highlight ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' : ''}`}
                        variant={solution.highlight ? 'default' : 'outline'}
                        onClick={onAuth}
                      >
                        {solution.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Professional Pricing Section */}
        <motion.section 
          className="py-24 bg-white dark:bg-gray-950"
          variants={itemVariants}
          id="pricing"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CreditCard className="w-4 h-4 mr-2" />
                Professional Pricing
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Choose Your Carbon Management Plan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                Transparent pricing with no hidden fees. All plans include core carbon tracking, 
                reporting, and our award-winning customer support.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8 mb-16">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.highlight ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : 'shadow-lg'} border-0 flex flex-col h-full`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className={`${
                        plan.highlight ? 'bg-blue-500' :
                        plan.badge === 'Enterprise' ? 'bg-purple-500' :
                        plan.badge === 'Premium' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-gray-500'
                      } text-white px-4 py-1`}>
                        {plan.badge === 'Most Popular' && <Crown className="w-3 h-3 mr-1" />}
                        {plan.badge === 'Enterprise' && <Building className="w-3 h-3 mr-1" />}
                        {plan.badge === 'Premium' && <Star className="w-3 h-3 mr-1" />}
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4 flex-shrink-0">
                    <CardTitle className="text-2xl font-bold mb-2">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm mb-4">
                      {plan.description}
                    </CardDescription>
                    <div className="mb-4">
                      <span className="text-4xl lg:text-5xl font-bold">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 text-lg">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex justify-between">
                        <span>Users:</span>
                        <span className="font-medium">{plan.maxUsers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support:</span>
                        <span className="font-medium">{plan.support}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col flex-1 justify-between">
                    <div>
                      <ul className="space-y-3 mb-6 min-h-[300px]">
                        {plan.features.slice(0, 8).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 8 && (
                          <li className="text-sm text-gray-500 italic font-medium">
                            <div className="flex items-center">
                              <Plus className="h-3 w-3 mr-1" />
                              {plan.features.length - 8} more features included
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <Button
                        onClick={onAuth}
                        className={`w-full ${
                          plan.highlight
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : plan.badge === 'Enterprise' || plan.badge === 'Premium'
                            ? 'bg-purple-500 hover:bg-purple-600'
                            : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                        } text-white`}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enterprise Contact */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-12 text-center">
              <Building className="h-16 w-16 text-purple-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Need a Custom Enterprise Solution?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                Our enterprise team specializes in creating tailored carbon management solutions 
                for Fortune 500 companies, government agencies, and large-scale organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Contact Enterprise Sales
                </Button>
                <Button variant="outline" className="px-8 py-3 text-lg border-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Platform Demo
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section 
          className="py-24 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600"
          variants={itemVariants}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Badge className="bg-white/20 text-white border-white/20 mb-6 px-4 py-2">
                  <Rocket className="w-4 h-4 mr-2" />
                  Join 500+ Enterprise Customers
                </Badge>
              </motion.div>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Ready to Transform Your
                <br />
                Carbon Strategy?
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Start your enterprise carbon management journey today. Join industry leaders 
                who trust PureCarbon to achieve their net-zero goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button 
                  onClick={onAuth}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-10 py-4 shadow-2xl"
                >
                  <Rocket className="mr-3 h-6 w-6" />
                  Start Enterprise Trial
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-xl px-10 py-4"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Watch Platform Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-80">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Enterprise Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50M+</div>
                  <div className="text-sm">Tons CO₂ Tracked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">99.99%</div>
                  <div className="text-sm">Platform Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Professional Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="py-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Company Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold">PureCarbon</span>
                      <Badge variant="outline" className="ml-2 text-xs border-gray-600 text-gray-400">
                        Enterprise SaaS
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 text-lg max-w-md">
                    The world's leading carbon management platform, trusted by Fortune 500 
                    companies to achieve their sustainability goals.
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download Brochure
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Demo
                    </Button>
                  </div>
                </div>
                
                {/* Product Links */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-white">Platform</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Brain className="h-4 w-4 mr-2" />AI Analytics
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Shield className="h-4 w-4 mr-2" />Blockchain Verification
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Activity className="h-4 w-4 mr-2" />Real-time Monitoring
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />Carbon Marketplace
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Code className="h-4 w-4 mr-2" />API & Integrations
                    </a></li>
                  </ul>
                </div>
                
                {/* Solutions Links */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-white">Solutions</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Building className="h-4 w-4 mr-2" />Enterprise
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Rocket className="h-4 w-4 mr-2" />Startups
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Globe className="h-4 w-4 mr-2" />Government
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Users className="h-4 w-4 mr-2" />Consultants
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Package className="h-4 w-4 mr-2" />White-label
                    </a></li>
                  </ul>
                </div>
                
                {/* Support Links */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-white">Support</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <FileCheck className="h-4 w-4 mr-2" />Documentation
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Users className="h-4 w-4 mr-2" />Community
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Activity className="h-4 w-4 mr-2" />Status Page
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Mail className="h-4 w-4 mr-2" />Contact Support
                    </a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center">
                      <Phone className="h-4 w-4 mr-2" />Sales: +1-800-CARBON
                    </a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Footer Bottom */}
            <div className="border-t border-gray-800 py-8">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400">
                  <p>&copy; 2025 PureCarbon Enterprise SaaS. All rights reserved.</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    <a href="#" className="hover:text-white transition-colors">GDPR</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="border-green-600 text-green-400">
                    <Zap className="h-3 w-3 mr-1" />
                    Carbon Neutral Hosting
                  </Badge>
                  <Badge variant="outline" className="border-blue-600 text-blue-400">
                    <Shield className="h-3 w-3 mr-1" />
                    SOC 2 Certified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}