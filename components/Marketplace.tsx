'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ShoppingCart, 
  Leaf, 
  TreePine, 
  Sun, 
  Wind, 
  Globe, 
  CheckCircle,
  Star,
  TrendingUp,
  Filter,
  Search,
  MapPin,
  Calendar,
  Users,
  Award,
  Download,
  Eye,
  CreditCard,
  Shield,
  BarChart3,
  FileText,
  ExternalLink,
  Zap,
  Droplets,
  Factory,
  Home
} from 'lucide-react';
import { toast } from 'sonner';

interface CarbonProject {
  id: string;
  name: string;
  type: string;
  location: string;
  country: string;
  price: number;
  available: number;
  total: number;
  verification: string;
  rating: number;
  description: string;
  longDescription: string;
  icon: any;
  image: string;
  features: string[];
  impactMetrics: {
    co2Reduced: number;
    beneficiaries: number;
    jobsCreated: number;
    biodiversityScore: number;
  };
  projectDetails: {
    startDate: string;
    duration: string;
    methodology: string;
    developer: string;
    status: 'Active' | 'Completed' | 'Planned';
  };
  documents: {
    name: string;
    type: string;
    url: string;
  }[];
  vintageYear: number;
  sdgGoals: number[];
}

interface Purchase {
  id: string;
  projectId: string;
  projectName: string;
  credits: number;
  pricePerCredit: number;
  totalAmount: number;
  purchaseDate: string;
  certificateId: string;
  status: 'completed' | 'pending' | 'retired';
}

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  const projects: CarbonProject[] = [
    {
      id: '1',
      name: 'Amazon Rainforest Protection Initiative',
      type: 'Forest Conservation',
      location: 'Acre State',
      country: 'Brazil',
      price: 12.50,
      available: 10000,
      total: 50000,
      verification: 'Verra VCS',
      rating: 4.8,
      description: 'Protecting 10,000 hectares of Amazon rainforest from deforestation',
      longDescription: 'This REDD+ project protects critical Amazon rainforest habitat in Acre State, Brazil. The project prevents deforestation of 10,000 hectares of primary forest, protecting biodiversity hotspots and indigenous communities while generating verified carbon credits.',
      icon: TreePine,
      image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg',
      features: ['REDD+ Certified', 'Biodiversity Impact', 'Community Benefits', 'Indigenous Rights'],
      impactMetrics: {
        co2Reduced: 2500000,
        beneficiaries: 1200,
        jobsCreated: 85,
        biodiversityScore: 9.2
      },
      projectDetails: {
        startDate: '2020-01-15',
        duration: '30 years',
        methodology: 'VM0015 - REDD+',
        developer: 'Amazon Conservation Alliance',
        status: 'Active'
      },
      documents: [
        { name: 'Project Design Document', type: 'PDF', url: '#' },
        { name: 'Verification Report', type: 'PDF', url: '#' },
        { name: 'Monitoring Report 2024', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [13, 15, 1, 8]
    },
    {
      id: '2',
      name: 'Rajasthan Solar Farm Complex',
      type: 'Renewable Energy',
      location: 'Rajasthan',
      country: 'India',
      price: 8.75,
      available: 25000,
      total: 100000,
      verification: 'Gold Standard',
      rating: 4.9,
      description: '50MW solar installation providing clean energy to rural communities',
      longDescription: 'A large-scale solar photovoltaic project generating 50MW of clean electricity for the Indian grid. The project displaces coal-fired electricity and provides sustainable energy access to rural communities in Rajasthan.',
      icon: Sun,
      image: 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg',
      features: ['Clean Energy', 'Job Creation', 'Grid Connected', 'Rural Development'],
      impactMetrics: {
        co2Reduced: 1800000,
        beneficiaries: 25000,
        jobsCreated: 150,
        biodiversityScore: 6.5
      },
      projectDetails: {
        startDate: '2021-03-01',
        duration: '25 years',
        methodology: 'AMS-I.D - Solar PV',
        developer: 'SolarTech India Pvt Ltd',
        status: 'Active'
      },
      documents: [
        { name: 'Project Design Document', type: 'PDF', url: '#' },
        { name: 'Gold Standard Certification', type: 'PDF', url: '#' },
        { name: 'Environmental Impact Assessment', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [7, 13, 8, 9]
    },
    {
      id: '3',
      name: 'Lake Turkana Wind Power',
      type: 'Renewable Energy',
      location: 'Turkana County',
      country: 'Kenya',
      price: 15.25,
      available: 8000,
      total: 30000,
      verification: 'CDM',
      rating: 4.7,
      description: 'Africa\'s largest wind farm providing clean electricity',
      longDescription: 'The largest wind power project in Africa, featuring 365 wind turbines generating 310MW of clean electricity. The project provides 20% of Kenya\'s electricity needs and supports local community development.',
      icon: Wind,
      image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
      features: ['Wind Energy', 'Rural Development', 'Sustainable Infrastructure', 'Community Investment'],
      impactMetrics: {
        co2Reduced: 1200000,
        beneficiaries: 50000,
        jobsCreated: 200,
        biodiversityScore: 7.8
      },
      projectDetails: {
        startDate: '2019-07-01',
        duration: '20 years',
        methodology: 'ACM0002 - Wind Power',
        developer: 'Lake Turkana Wind Power Ltd',
        status: 'Active'
      },
      documents: [
        { name: 'CDM Registration', type: 'PDF', url: '#' },
        { name: 'Environmental Assessment', type: 'PDF', url: '#' },
        { name: 'Community Development Plan', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [7, 13, 8, 11]
    },
    {
      id: '4',
      name: 'Guatemala Clean Cookstoves Program',
      type: 'Household Energy',
      location: 'Quetzaltenango',
      country: 'Guatemala',
      price: 18.60,
      available: 5000,
      total: 15000,
      verification: 'Gold Standard',
      rating: 4.6,
      description: 'Distributing efficient cookstoves to reduce indoor air pollution',
      longDescription: 'A community-based program distributing 15,000 improved cookstoves to rural households in Guatemala. The project reduces wood consumption, improves indoor air quality, and empowers women through reduced cooking time.',
      icon: Home,
      image: 'https://images.pexels.com/photos/6995245/pexels-photo-6995245.jpeg',
      features: ['Health Benefits', 'Women Empowerment', 'Deforestation Reduction', 'Community Training'],
      impactMetrics: {
        co2Reduced: 450000,
        beneficiaries: 75000,
        jobsCreated: 45,
        biodiversityScore: 8.1
      },
      projectDetails: {
        startDate: '2020-09-01',
        duration: '10 years',
        methodology: 'AMS-II.G - Cookstoves',
        developer: 'Guatemala Sustainable Energy Foundation',
        status: 'Active'
      },
      documents: [
        { name: 'Gold Standard Registry', type: 'PDF', url: '#' },
        { name: 'Health Impact Study', type: 'PDF', url: '#' },
        { name: 'Women Empowerment Report', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [3, 5, 7, 13]
    },
    {
      id: '5',
      name: 'Palawan Mangrove Restoration',
      type: 'Blue Carbon',
      location: 'Palawan Island',
      country: 'Philippines',
      price: 22.90,
      available: 3000,
      total: 12000,
      verification: 'Verra VCS',
      rating: 4.9,
      description: 'Restoring coastal mangrove ecosystems for carbon sequestration',
      longDescription: 'A comprehensive mangrove restoration project covering 500 hectares of degraded coastal areas in Palawan. The project restores critical marine ecosystems, protects coastal communities from storms, and sequesters significant amounts of blue carbon.',
      icon: Droplets,
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg',
      features: ['Coastal Protection', 'Marine Biodiversity', 'Climate Adaptation', 'Fisheries Enhancement'],
      impactMetrics: {
        co2Reduced: 800000,
        beneficiaries: 5000,
        jobsCreated: 120,
        biodiversityScore: 9.5
      },
      projectDetails: {
        startDate: '2021-01-01',
        duration: '40 years',
        methodology: 'VM0033 - Blue Carbon',
        developer: 'Philippine Marine Conservation Society',
        status: 'Active'
      },
      documents: [
        { name: 'VCS Project Description', type: 'PDF', url: '#' },
        { name: 'Biodiversity Assessment', type: 'PDF', url: '#' },
        { name: 'Community Engagement Plan', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [13, 14, 15, 1]
    },
    {
      id: '6',
      name: 'Colombian Hydroelectric Project',
      type: 'Renewable Energy',
      location: 'Antioquia',
      country: 'Colombia',
      price: 11.30,
      available: 15000,
      total: 40000,
      verification: 'Verra VCS',
      rating: 4.5,
      description: 'Small-scale run-of-river hydroelectric facility',
      longDescription: 'A 25MW run-of-river hydroelectric project that generates clean electricity without large dams. The project provides renewable energy to the Colombian grid while maintaining river ecosystem integrity.',
      icon: Zap,
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
      features: ['Run-of-River', 'Ecosystem Friendly', 'Local Employment', 'Grid Stability'],
      impactMetrics: {
        co2Reduced: 950000,
        beneficiaries: 15000,
        jobsCreated: 80,
        biodiversityScore: 7.2
      },
      projectDetails: {
        startDate: '2022-05-01',
        duration: '30 years',
        methodology: 'ACM0002 - Hydro Power',
        developer: 'Colombian Renewable Energy Corp',
        status: 'Active'
      },
      documents: [
        { name: 'VCS Registration', type: 'PDF', url: '#' },
        { name: 'Environmental Flow Study', type: 'PDF', url: '#' },
        { name: 'Social Impact Assessment', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [7, 13, 6, 8]
    },
    {
      id: '7',
      name: 'Indonesian Peatland Conservation',
      type: 'Wetland Protection',
      location: 'Central Kalimantan',
      country: 'Indonesia',
      price: 19.75,
      available: 7500,
      total: 25000,
      verification: 'Verra VCS',
      rating: 4.8,
      description: 'Protecting tropical peatlands from conversion and fires',
      longDescription: 'A critical peatland conservation project protecting 50,000 hectares of tropical peat swamp forest. The project prevents massive CO2 emissions from peat fires and deforestation while protecting orangutan habitat.',
      icon: TreePine,
      image: 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg',
      features: ['Peat Protection', 'Fire Prevention', 'Orangutan Habitat', 'Community Livelihoods'],
      impactMetrics: {
        co2Reduced: 3200000,
        beneficiaries: 8000,
        jobsCreated: 95,
        biodiversityScore: 9.8
      },
      projectDetails: {
        startDate: '2020-11-01',
        duration: '30 years',
        methodology: 'VM0012 - Peatland Conservation',
        developer: 'Indonesian Peatland Foundation',
        status: 'Active'
      },
      documents: [
        { name: 'Project Design Document', type: 'PDF', url: '#' },
        { name: 'Biodiversity Survey', type: 'PDF', url: '#' },
        { name: 'Fire Management Plan', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [13, 15, 1, 8]
    },
    {
      id: '8',
      name: 'Morocco Concentrated Solar Power',
      type: 'Renewable Energy',
      location: 'Ouarzazate',
      country: 'Morocco',
      price: 13.80,
      available: 20000,
      total: 60000,
      verification: 'Gold Standard',
      rating: 4.7,
      description: 'Large-scale concentrated solar power with thermal storage',
      longDescription: 'A 200MW concentrated solar power plant with molten salt thermal storage, providing clean electricity even after sunset. The project is part of Morocco\'s ambitious renewable energy strategy.',
      icon: Sun,
      image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
      features: ['Thermal Storage', 'Grid Stability', 'Technology Innovation', 'Energy Security'],
      impactMetrics: {
        co2Reduced: 1600000,
        beneficiaries: 30000,
        jobsCreated: 180,
        biodiversityScore: 6.8
      },
      projectDetails: {
        startDate: '2021-08-01',
        duration: '25 years',
        methodology: 'AMS-I.C - Solar Thermal',
        developer: 'Morocco Solar Energy Agency',
        status: 'Active'
      },
      documents: [
        { name: 'Gold Standard Certificate', type: 'PDF', url: '#' },
        { name: 'Technology Assessment', type: 'PDF', url: '#' },
        { name: 'Grid Integration Study', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [7, 13, 9, 11]
    },
    {
      id: '9',
      name: 'Vietnam Biogas Digesters Program',
      type: 'Waste Management',
      location: 'Mekong Delta',
      country: 'Vietnam',
      price: 16.40,
      available: 6000,
      total: 18000,
      verification: 'Gold Standard',
      rating: 4.4,
      description: 'Installing biogas digesters for rural households and farms',
      longDescription: 'A program installing 18,000 biogas digesters for rural households and pig farms in the Mekong Delta. The project reduces methane emissions while providing clean cooking fuel and organic fertilizer.',
      icon: Factory,
      image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg',
      features: ['Methane Reduction', 'Clean Cooking', 'Organic Fertilizer', 'Rural Development'],
      impactMetrics: {
        co2Reduced: 720000,
        beneficiaries: 90000,
        jobsCreated: 60,
        biodiversityScore: 7.5
      },
      projectDetails: {
        startDate: '2020-06-01',
        duration: '15 years',
        methodology: 'AMS-III.R - Biogas',
        developer: 'Vietnam Sustainable Agriculture Foundation',
        status: 'Active'
      },
      documents: [
        { name: 'Gold Standard Registry', type: 'PDF', url: '#' },
        { name: 'Technical Manual', type: 'PDF', url: '#' },
        { name: 'Impact Assessment', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [7, 13, 2, 6]
    },
    {
      id: '10',
      name: 'Chilean Afforestation Initiative',
      type: 'Afforestation',
      location: 'Araucanía Region',
      country: 'Chile',
      price: 14.20,
      available: 12000,
      total: 35000,
      verification: 'Verra VCS',
      rating: 4.6,
      description: 'Large-scale native forest restoration and afforestation',
      longDescription: 'A comprehensive afforestation project planting 2 million native trees across 15,000 hectares of degraded land in southern Chile. The project restores ecosystem services and creates carbon sinks.',
      icon: TreePine,
      image: 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg',
      features: ['Native Species', 'Ecosystem Restoration', 'Soil Conservation', 'Water Protection'],
      impactMetrics: {
        co2Reduced: 1100000,
        beneficiaries: 12000,
        jobsCreated: 110,
        biodiversityScore: 8.7
      },
      projectDetails: {
        startDate: '2019-10-01',
        duration: '40 years',
        methodology: 'AR-ACM0003 - Afforestation',
        developer: 'Chilean Forest Restoration Alliance',
        status: 'Active'
      },
      documents: [
        { name: 'VCS Project Document', type: 'PDF', url: '#' },
        { name: 'Species Selection Study', type: 'PDF', url: '#' },
        { name: 'Monitoring Protocol', type: 'PDF', url: '#' }
      ],
      vintageYear: 2024,
      sdgGoals: [13, 15, 6, 8]
    }
  ];

  const [userPortfolio, setUserPortfolio] = useState<Purchase[]>([
    {
      id: 'P001',
      projectId: '1',
      projectName: 'Amazon Rainforest Protection Initiative',
      credits: 50,
      pricePerCredit: 12.50,
      totalAmount: 625.00,
      purchaseDate: '2024-01-10',
      certificateId: 'CERT-AMZ-001-2024',
      status: 'completed'
    },
    {
      id: 'P002',
      projectId: '2',
      projectName: 'Rajasthan Solar Farm Complex',
      credits: 25,
      pricePerCredit: 8.75,
      totalAmount: 218.75,
      purchaseDate: '2024-01-05',
      certificateId: 'CERT-SOL-002-2024',
      status: 'completed'
    },
    {
      id: 'P003',
      projectId: '3',
      projectName: 'Lake Turkana Wind Power',
      credits: 15,
      pricePerCredit: 15.25,
      totalAmount: 228.75,
      purchaseDate: '2023-12-28',
      certificateId: 'CERT-WND-003-2024',
      status: 'retired'
    }
  ]);

  const countries = Array.from(new Set(projects.map(p => p.country))).sort();
  const projectTypes = Array.from(new Set(projects.map(p => p.type))).sort();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || project.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesCountry = filterCountry === 'all' || project.country === filterCountry;
    return matchesSearch && matchesType && matchesCountry;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'available':
        return b.available - a.available;
      case 'impact':
        return b.impactMetrics.co2Reduced - a.impactMetrics.co2Reduced;
      default:
        return 0;
    }
  });

  const handlePurchase = async (project: CarbonProject, amount: number) => {
    // In a real implementation, this would integrate with Stripe
    toast.success('Redirecting to secure payment...');
    
    // Simulate Stripe payment flow
    setTimeout(() => {
      const newPurchase: Purchase = {
        id: `P${String(userPortfolio.length + 1).padStart(3, '0')}`,
        projectId: project.id,
        projectName: project.name,
        credits: amount,
        pricePerCredit: project.price,
        totalAmount: amount * project.price,
        purchaseDate: new Date().toISOString().split('T')[0],
        certificateId: `CERT-${project.id.toUpperCase()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-2024`,
        status: 'completed'
      };
      
      setUserPortfolio(prev => [...prev, newPurchase]);
      toast.success(`Successfully purchased ${amount} carbon credits from ${project.name}!`);
    }, 2000);
  };

  const handleStripePayment = (project: CarbonProject, amount: number) => {
    // This would integrate with Stripe in a real implementation
    toast.info('Stripe integration would be implemented here. For demo purposes, simulating purchase...');
    handlePurchase(project, amount);
  };

  const generateCertificate = (purchase: Purchase) => {
    toast.success(`Certificate ${purchase.certificateId} downloaded successfully!`);
  };

  const retireCredits = (purchaseId: string) => {
    setUserPortfolio(prev => 
      prev.map(p => p.id === purchaseId ? { ...p, status: 'retired' as const } : p)
    );
    toast.success('Carbon credits retired successfully!');
  };

  const totalCreditsOwned = userPortfolio.reduce((sum, p) => sum + p.credits, 0);
  const totalInvestment = userPortfolio.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalCO2Offset = userPortfolio.reduce((sum, p) => {
    const project = projects.find(proj => proj.id === p.projectId);
    return sum + (project ? p.credits : 0);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Credit Marketplace</h1>
        <p className="text-lg text-gray-600">Trade verified carbon credits from global sustainability projects</p>
      </div>

      <Tabs defaultValue="buy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="buy">Buy Credits</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-6">
          {/* Enhanced Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filter & Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Projects</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Type</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {projectTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Select value={filterCountry} onValueChange={setFilterCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price (Low to High)</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                      <SelectItem value="available">Availability</SelectItem>
                      <SelectItem value="impact">CO₂ Impact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Verified Only
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onPurchase={handleStripePayment}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portfolio Summary */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Portfolio Summary</CardTitle>
                <CardDescription>Your carbon credit investments and impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{totalCreditsOwned}</div>
                    <div className="text-sm text-gray-600">Total Credits Owned</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">${totalInvestment.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Total Investment</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{totalCO2Offset}</div>
                    <div className="text-sm text-gray-600">Tons CO₂ Offset</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">+4.2%</div>
                    <div className="text-sm text-gray-600">Portfolio Return</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Holdings List */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>My Holdings</CardTitle>
                <CardDescription>Track your carbon credit investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userPortfolio.map((purchase) => {
                    const project = projects.find(p => p.id === purchase.projectId);
                    const currentPrice = project?.price || purchase.pricePerCredit;
                    const currentValue = purchase.credits * currentPrice;
                    const returnPercent = ((currentValue - purchase.totalAmount) / purchase.totalAmount * 100);
                    
                    return (
                      <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            {project?.icon && <project.icon className="h-6 w-6 text-green-600" />}
                          </div>
                          <div>
                            <div className="font-medium">{purchase.projectName}</div>
                            <div className="text-sm text-gray-600">
                              {purchase.credits} credits • Purchased {purchase.purchaseDate}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={purchase.status === 'retired' ? 'secondary' : 'default'}>
                                {purchase.status}
                              </Badge>
                              <span className="text-xs text-gray-500">ID: {purchase.certificateId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${currentValue.toFixed(2)}</div>
                          <div className={`text-sm ${returnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(1)}%
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline" onClick={() => generateCertificate(purchase)}>
                              <Download className="h-3 w-3" />
                            </Button>
                            {purchase.status === 'completed' && (
                              <Button size="sm" variant="outline" onClick={() => retireCredits(purchase.id)}>
                                Retire
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Offset Certificates</CardTitle>
              <CardDescription>Download and manage your offset certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPortfolio.map((purchase) => (
                  <Card key={purchase.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{purchase.status}</Badge>
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="font-semibold text-sm">{purchase.projectName}</div>
                          <div className="text-xs text-gray-600">Certificate ID: {purchase.certificateId}</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{purchase.credits}</div>
                          <div className="text-sm text-gray-600">Tons CO₂ Offset</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Issued: {purchase.purchaseDate}
                        </div>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => generateCertificate(purchase)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Certificate
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

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onPurchase={handleStripePayment}
        />
      )}
    </div>
  );
}

function ProjectCard({ 
  project, 
  onPurchase, 
  onViewDetails 
}: { 
  project: CarbonProject; 
  onPurchase: (project: CarbonProject, amount: number) => void;
  onViewDetails: (project: CarbonProject) => void;
}) {
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-900 hover:bg-white/90">
            <project.icon className="w-3 h-3 mr-1" />
            {project.type}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-500 text-white hover:bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            {project.verification}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-blue-500 text-white hover:bg-blue-500">
            <MapPin className="w-3 h-3 mr-1" />
            {project.country}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="flex items-center space-x-2 mt-1">
              <Globe className="h-4 w-4" />
              <span>{project.location}</span>
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{project.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{project.description}</p>
        
        {/* Impact Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-bold text-green-600">{(project.impactMetrics.co2Reduced / 1000).toFixed(0)}k</div>
            <div className="text-gray-600">Tons CO₂</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-bold text-blue-600">{project.impactMetrics.beneficiaries.toLocaleString()}</div>
            <div className="text-gray-600">Beneficiaries</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Available Credits</span>
            <span>{project.available.toLocaleString()} / {project.total.toLocaleString()}</span>
          </div>
          <Progress value={(project.available / project.total) * 100} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-1">
          {project.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">${project.price}</span>
            <span className="text-sm text-gray-600">per credit</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="1"
                max={Math.min(project.available, 100)}
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(parseInt(e.target.value) || 1)}
                className="flex-1"
              />
              <Button 
                onClick={() => onPurchase(project, purchaseAmount)}
                className="bg-green-500 hover:bg-green-600"
              >
                <CreditCard className="h-4 w-4 mr-1" />
                ${(project.price * purchaseAmount).toFixed(2)}
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onViewDetails(project)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectDetailModal({ 
  project, 
  onClose, 
  onPurchase 
}: { 
  project: CarbonProject; 
  onClose: () => void;
  onPurchase: (project: CarbonProject, amount: number) => void;
}) {
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  const sdgGoalNames: { [key: number]: string } = {
    1: 'No Poverty',
    2: 'Zero Hunger',
    3: 'Good Health',
    5: 'Gender Equality',
    6: 'Clean Water',
    7: 'Clean Energy',
    8: 'Decent Work',
    9: 'Innovation',
    11: 'Sustainable Cities',
    13: 'Climate Action',
    14: 'Life Below Water',
    15: 'Life on Land'
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <project.icon className="h-6 w-6" />
            <span>{project.name}</span>
          </DialogTitle>
          <DialogDescription>
            {project.location}, {project.country} • {project.verification} Verified
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Project Description</h3>
                <p className="text-sm text-gray-600">{project.longDescription}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">UN SDG Goals</h3>
                <div className="flex flex-wrap gap-2">
                  {project.sdgGoals.map((goal) => (
                    <Badge key={goal} className="bg-blue-500 hover:bg-blue-500">
                      SDG {goal}: {sdgGoalNames[goal]}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Impact Metrics */}
              <div>
                <h3 className="font-semibold mb-3">Impact Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {(project.impactMetrics.co2Reduced / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-gray-600">Tons CO₂ Reduced</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {project.impactMetrics.beneficiaries.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Beneficiaries</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {project.impactMetrics.jobsCreated}
                    </div>
                    <div className="text-sm text-gray-600">Jobs Created</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {project.impactMetrics.biodiversityScore}/10
                    </div>
                    <div className="text-sm text-gray-600">Biodiversity Score</div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="font-semibold mb-3">Project Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span>{new Date(project.projectDetails.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{project.projectDetails.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Methodology:</span>
                    <span>{project.projectDetails.methodology}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Developer:</span>
                    <span>{project.projectDetails.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant={project.projectDetails.status === 'Active' ? 'default' : 'secondary'}>
                      {project.projectDetails.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-semibold mb-3">Project Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {project.documents.map((doc, index) => (
                <Button key={index} variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  {doc.name}
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </Button>
              ))}
            </div>
          </div>

          {/* Purchase Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">${project.price}</div>
                <div className="text-sm text-gray-600">per carbon credit</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Available</div>
                <div className="font-semibold">{project.available.toLocaleString()} credits</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  max={Math.min(project.available, 1000)}
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium">Total Cost</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-lg font-bold">
                  ${(project.price * purchaseAmount).toFixed(2)}
                </div>
              </div>
              <Button 
                onClick={() => {
                  onPurchase(project, purchaseAmount);
                  onClose();
                }}
                className="bg-green-500 hover:bg-green-600 px-8"
                size="lg"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Purchase with Stripe
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}