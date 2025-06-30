'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Car, 
  Plane, 
  Zap, 
  UtensilsCrossed, 
  Trash2, 
  Calculator, 
  Sparkles,
  Home,
  Train,
  Bus,
  Bike,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  Globe
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner';

interface EmissionData {
  transport: number;
  energy: number;
  food: number;
  waste: number;
}

interface TransportData {
  car: number;
  publicTransport: number;
  flights: number;
  motorcycle: number;
}

interface EnergyData {
  electricity: number;
  heating: number;
  cooling: number;
  appliances: number;
}

interface FoodData {
  meat: number;
  dairy: number;
  vegetables: number;
  processed: number;
}

export default function CarbonCalculator() {
  const [emissions, setEmissions] = useState<EmissionData>({
    transport: 0,
    energy: 0,
    food: 0,
    waste: 0
  });

  const [detailedEmissions, setDetailedEmissions] = useState({
    transport: { car: 0, publicTransport: 0, flights: 0, motorcycle: 0 },
    energy: { electricity: 0, heating: 0, cooling: 0, appliances: 0 },
    food: { meat: 0, dairy: 0, vegetables: 0, processed: 0 },
    waste: { general: 0, recycling: 0, compost: 0 }
  });

  // Form data with sliders
  const [formData, setFormData] = useState({
    // Transportation
    carDistance: [500],
    carType: 'gasoline',
    carEfficiency: [8], // L/100km
    publicTransportHours: [10],
    flightHours: [5],
    flightType: 'domestic',
    motorcycleDistance: [100],
    
    // Energy
    homeSize: [150], // m²
    electricityUsage: [300], // kWh/month
    heatingType: 'natural_gas',
    heatingUsage: [50], // m³/month or kWh
    coolingUsage: [100], // kWh/month
    applianceEfficiency: [3], // 1-5 scale
    renewableEnergy: false,
    
    // Food
    dietType: 'mixed',
    meatServings: [7], // per week
    dairyServings: [14], // per week
    localFood: [50], // percentage
    organicFood: [20], // percentage
    foodWaste: [15], // percentage
    
    // Waste
    wasteGeneration: [20], // kg/month
    recyclingRate: [60], // percentage
    compostRate: [30], // percentage
  });

  // Emission factors
  const emissionFactors = {
    transport: {
      car: {
        gasoline: 2.31, // kg CO2/L
        diesel: 2.68,
        hybrid: 1.85,
        electric: 0.05 // kg CO2/km (considering electricity mix)
      },
      publicTransport: 0.089, // kg CO2/passenger-km
      flight: {
        domestic: 0.255,
        shortHaul: 0.255,
        longHaul: 0.195
      },
      motorcycle: 0.113 // kg CO2/km
    },
    energy: {
      electricity: 0.45, // kg CO2/kWh (grid average)
      electricityRenewable: 0.05, // kg CO2/kWh (renewable)
      naturalGas: 2.04, // kg CO2/m³
      heating: {
        natural_gas: 2.04,
        electricity: 0.45,
        oil: 2.52,
        propane: 1.51
      }
    },
    food: {
      beef: 60, // kg CO2/kg
      pork: 12,
      chicken: 6,
      fish: 5,
      dairy: 3.2,
      vegetables: 0.4,
      grains: 1.1,
      processed: 2.5
    },
    waste: {
      general: 0.5, // kg CO2/kg
      recycling: -0.2, // negative because it saves emissions
      compost: -0.1
    }
  };

  // Real-time calculation
  useEffect(() => {
    calculateEmissions();
  }, [formData]);

  const calculateEmissions = () => {
    // Transport calculations
    const carEmissions = formData.carType === 'electric' 
      ? formData.carDistance[0] * emissionFactors.transport.car.electric
      : (formData.carDistance[0] * formData.carEfficiency[0] / 100) * emissionFactors.transport.car[formData.carType as keyof typeof emissionFactors.transport.car];
    
    const publicTransportEmissions = formData.publicTransportHours[0] * 25 * emissionFactors.transport.publicTransport; // Assuming 25km/hour average
    const flightEmissions = formData.flightHours[0] * 800 * emissionFactors.transport.flight[formData.flightType as keyof typeof emissionFactors.transport.flight]; // Assuming 800km/hour
    const motorcycleEmissions = formData.motorcycleDistance[0] * emissionFactors.transport.motorcycle;
    
    const totalTransport = carEmissions + publicTransportEmissions + flightEmissions + motorcycleEmissions;

    // Energy calculations
    const electricityFactor = formData.renewableEnergy ? emissionFactors.energy.electricityRenewable : emissionFactors.energy.electricity;
    const electricityEmissions = formData.electricityUsage[0] * electricityFactor;
    const heatingEmissions = formData.heatingUsage[0] * emissionFactors.energy.heating[formData.heatingType as keyof typeof emissionFactors.energy.heating];
    const coolingEmissions = formData.coolingUsage[0] * electricityFactor;
    const applianceEmissions = (formData.homeSize[0] * 2) * (6 - formData.applianceEfficiency[0]) * electricityFactor / 10; // Efficiency factor
    
    const totalEnergy = electricityEmissions + heatingEmissions + coolingEmissions + applianceEmissions;

    // Food calculations
    const meatEmissions = formData.meatServings[0] * 0.25 * emissionFactors.food.beef * 4.33; // Monthly
    const dairyEmissions = formData.dairyServings[0] * 0.2 * emissionFactors.food.dairy * 4.33; // Monthly
    const vegetableEmissions = 30 * emissionFactors.food.vegetables; // Base vegetable consumption
    const processedEmissions = 10 * emissionFactors.food.processed; // Base processed food
    
    const foodWasteMultiplier = 1 + (formData.foodWaste[0] / 100);
    const localFoodReduction = 1 - (formData.localFood[0] / 200); // 50% reduction max
    
    const totalFood = (meatEmissions + dairyEmissions + vegetableEmissions + processedEmissions) * foodWasteMultiplier * localFoodReduction;

    // Waste calculations
    const generalWaste = formData.wasteGeneration[0] * (1 - formData.recyclingRate[0]/100 - formData.compostRate[0]/100) * emissionFactors.waste.general;
    const recyclingBenefit = formData.wasteGeneration[0] * (formData.recyclingRate[0]/100) * emissionFactors.waste.recycling;
    const compostBenefit = formData.wasteGeneration[0] * (formData.compostRate[0]/100) * emissionFactors.waste.compost;
    
    const totalWaste = generalWaste + recyclingBenefit + compostBenefit;

    // Update emissions
    setEmissions({
      transport: totalTransport,
      energy: totalEnergy,
      food: totalFood,
      waste: Math.max(0, totalWaste) // Ensure non-negative
    });

    // Update detailed emissions
    setDetailedEmissions({
      transport: {
        car: carEmissions,
        publicTransport: publicTransportEmissions,
        flights: flightEmissions,
        motorcycle: motorcycleEmissions
      },
      energy: {
        electricity: electricityEmissions,
        heating: heatingEmissions,
        cooling: coolingEmissions,
        appliances: applianceEmissions
      },
      food: {
        meat: meatEmissions,
        dairy: dairyEmissions,
        vegetables: vegetableEmissions,
        processed: processedEmissions
      },
      waste: {
        general: generalWaste,
        recycling: Math.abs(recyclingBenefit),
        compost: Math.abs(compostBenefit)
      }
    });
  };

  const totalEmissions = Object.values(emissions).reduce((sum, value) => sum + value, 0);
  const yearlyEmissions = totalEmissions * 12;

  // Comparison data
  const globalAverage = 400; // kg CO2/month
  const nationalAverage = 450; // kg CO2/month (example for developed country)
  
  const comparisonData = [
    { name: 'Your Footprint', value: totalEmissions, color: '#10B981' },
    { name: 'National Average', value: nationalAverage, color: '#F59E0B' },
    { name: 'Global Average', value: globalAverage, color: '#EF4444' }
  ];

  // Pie chart data
  const pieData = [
    { name: 'Transport', value: emissions.transport, color: '#EF4444' },
    { name: 'Energy', value: emissions.energy, color: '#F59E0B' },
    { name: 'Food', value: emissions.food, color: '#10B981' },
    { name: 'Waste', value: emissions.waste, color: '#3B82F6' }
  ];

  // Monthly projection data
  const monthlyProjection = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleDateString('en', { month: 'short' }),
    emissions: totalEmissions * (1 + (Math.random() - 0.5) * 0.2), // Add some variation
    target: totalEmissions * 0.8 // 20% reduction target
  }));

  const getRecommendations = () => {
    const recommendations = [];
    
    if (emissions.transport > 100) {
      recommendations.push({
        category: 'Transport',
        suggestion: 'Consider using public transport or cycling more often',
        impact: '25% reduction possible',
        icon: Car
      });
    }
    if (emissions.energy > 150) {
      recommendations.push({
        category: 'Energy',
        suggestion: 'Switch to renewable energy and improve home insulation',
        impact: '40% reduction possible',
        icon: Zap
      });
    }
    if (emissions.food > 80) {
      recommendations.push({
        category: 'Food',
        suggestion: 'Reduce meat consumption and buy local produce',
        impact: '30% reduction possible',
        icon: UtensilsCrossed
      });
    }
    if (emissions.waste > 10) {
      recommendations.push({
        category: 'Waste',
        suggestion: 'Increase recycling and composting rates',
        impact: '50% reduction possible',
        icon: Trash2
      });
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced AI Carbon Calculator</h1>
        <p className="text-lg text-gray-600">Real-time carbon footprint tracking with detailed analysis and projections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Forms */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="transport" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transport" className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Transport</span>
              </TabsTrigger>
              <TabsTrigger value="energy" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Energy</span>
              </TabsTrigger>
              <TabsTrigger value="food" className="flex items-center space-x-2">
                <UtensilsCrossed className="h-4 w-4" />
                <span>Food</span>
              </TabsTrigger>
              <TabsTrigger value="waste" className="flex items-center space-x-2">
                <Trash2 className="h-4 w-4" />
                <span>Waste</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transport">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="h-5 w-5" />
                    <span>Transportation Details</span>
                  </CardTitle>
                  <CardDescription>Track all your transportation methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Car Usage */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span>Personal Vehicle</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Monthly Distance: {formData.carDistance[0]} km</Label>
                        <Slider
                          value={formData.carDistance}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, carDistance: value }))}
                          max={2000}
                          step={50}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fuel Efficiency: {formData.carEfficiency[0]} L/100km</Label>
                        <Slider
                          value={formData.carEfficiency}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, carEfficiency: value }))}
                          min={3}
                          max={15}
                          step={0.5}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Vehicle Type</Label>
                      <Select value={formData.carType} onValueChange={(value) => setFormData(prev => ({ ...prev, carType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasoline">Gasoline</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Public Transport */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Bus className="h-4 w-4" />
                      <span>Public Transport</span>
                    </h4>
                    <div className="space-y-2">
                      <Label>Weekly Hours: {formData.publicTransportHours[0]} hours</Label>
                      <Slider
                        value={formData.publicTransportHours}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, publicTransportHours: value }))}
                        max={40}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Flights */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Plane className="h-4 w-4" />
                      <span>Air Travel</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Annual Flight Hours: {formData.flightHours[0]} hours</Label>
                        <Slider
                          value={formData.flightHours}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, flightHours: value }))}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Primary Flight Type</Label>
                        <Select value={formData.flightType} onValueChange={(value) => setFormData(prev => ({ ...prev, flightType: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="domestic">Domestic</SelectItem>
                            <SelectItem value="shortHaul">Short-haul International</SelectItem>
                            <SelectItem value="longHaul">Long-haul International</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="energy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>Home Energy Consumption</span>
                  </CardTitle>
                  <CardDescription>Detailed energy usage tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Home Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Home Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Home Size: {formData.homeSize[0]} m²</Label>
                        <Slider
                          value={formData.homeSize}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, homeSize: value }))}
                          min={50}
                          max={500}
                          step={10}
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={formData.renewableEnergy}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, renewableEnergy: checked }))}
                        />
                        <Label>Renewable Energy Source</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Electricity */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Electricity Usage</span>
                    </h4>
                    <div className="space-y-2">
                      <Label>Monthly Usage: {formData.electricityUsage[0]} kWh</Label>
                      <Slider
                        value={formData.electricityUsage}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, electricityUsage: value }))}
                        max={1000}
                        step={25}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Heating */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Heating & Cooling</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Heating Type</Label>
                        <Select value={formData.heatingType} onValueChange={(value) => setFormData(prev => ({ ...prev, heatingType: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="natural_gas">Natural Gas</SelectItem>
                            <SelectItem value="electricity">Electric</SelectItem>
                            <SelectItem value="oil">Oil</SelectItem>
                            <SelectItem value="propane">Propane</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Monthly Heating: {formData.heatingUsage[0]} {formData.heatingType === 'natural_gas' ? 'm³' : 'kWh'}</Label>
                        <Slider
                          value={formData.heatingUsage}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, heatingUsage: value }))}
                          max={200}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Monthly Cooling: {formData.coolingUsage[0]} kWh</Label>
                      <Slider
                        value={formData.coolingUsage}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, coolingUsage: value }))}
                        max={300}
                        step={10}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Appliances */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Appliance Efficiency</h4>
                    <div className="space-y-2">
                      <Label>Efficiency Rating: {formData.applianceEfficiency[0]}/5 (Energy Star)</Label>
                      <Slider
                        value={formData.applianceEfficiency}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, applianceEfficiency: value }))}
                        min={1}
                        max={5}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="food">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    <span>Diet & Food Consumption</span>
                  </CardTitle>
                  <CardDescription>Track your dietary carbon footprint</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Diet Type */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Diet Preferences</h4>
                    <div className="space-y-2">
                      <Label>Primary Diet Type</Label>
                      <Select value={formData.dietType} onValueChange={(value) => setFormData(prev => ({ ...prev, dietType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="pescatarian">Pescatarian</SelectItem>
                          <SelectItem value="mixed">Mixed Diet</SelectItem>
                          <SelectItem value="high_meat">High Meat Consumption</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Consumption Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Weekly Consumption</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Meat Servings: {formData.meatServings[0]} per week</Label>
                        <Slider
                          value={formData.meatServings}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, meatServings: value }))}
                          max={21}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dairy Servings: {formData.dairyServings[0]} per week</Label>
                        <Slider
                          value={formData.dairyServings}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, dairyServings: value }))}
                          max={35}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Food Sources */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Food Sources & Waste</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Local Food: {formData.localFood[0]}%</Label>
                        <Slider
                          value={formData.localFood}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, localFood: value }))}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Organic Food: {formData.organicFood[0]}%</Label>
                        <Slider
                          value={formData.organicFood}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, organicFood: value }))}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Food Waste: {formData.foodWaste[0]}%</Label>
                      <Slider
                        value={formData.foodWaste}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, foodWaste: value }))}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="waste">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trash2 className="h-5 w-5" />
                    <span>Waste Management</span>
                  </CardTitle>
                  <CardDescription>Track your waste generation and disposal methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Waste Generation</h4>
                    <div className="space-y-2">
                      <Label>Monthly Waste: {formData.wasteGeneration[0]} kg</Label>
                      <Slider
                        value={formData.wasteGeneration}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, wasteGeneration: value }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Waste Management Practices</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Recycling Rate: {formData.recyclingRate[0]}%</Label>
                        <Slider
                          value={formData.recyclingRate}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, recyclingRate: value }))}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Composting Rate: {formData.compostRate[0]}%</Label>
                        <Slider
                          value={formData.compostRate}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, compostRate: value }))}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Results and Visualizations */}
        <div className="space-y-6">
          {/* Current Footprint */}
          <Card className="bg-gradient-to-br from-green-500 to-blue-500 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Your Carbon Footprint</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{totalEmissions.toFixed(1)}</div>
                <div className="text-lg opacity-90">kg CO₂ per month</div>
                <div className="text-sm opacity-75 mt-2">
                  {yearlyEmissions.toFixed(1)} kg CO₂ annually
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                {[
                  { category: 'Transport', value: emissions.transport, icon: Car, color: '#EF4444' },
                  { category: 'Energy', value: emissions.energy, icon: Zap, color: '#F59E0B' },
                  { category: 'Food', value: emissions.food, icon: UtensilsCrossed, color: '#10B981' },
                  { category: 'Waste', value: emissions.waste, icon: Trash2, color: '#3B82F6' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/20">
                      {item.value.toFixed(1)} kg
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Emissions Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value.toFixed(1)} kg`, 'CO₂']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Global Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparisonData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={item.name === 'Your Footprint' ? 'font-semibold' : ''}>{item.name}</span>
                      <span>{item.value.toFixed(1)} kg CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${Math.min((item.value / Math.max(...comparisonData.map(d => d.value))) * 100, 100)}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
                {totalEmissions < globalAverage && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 font-medium flex items-center">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      You're {((globalAverage - totalEmissions) / globalAverage * 100).toFixed(0)}% below the global average!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Yearly Projection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value.toFixed(1)} kg`, 'CO₂']} />
                    <Bar dataKey="emissions" fill="#10B981" name="Current Trend" />
                    <Bar dataKey="target" fill="#3B82F6" name="Reduction Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Projected annual emissions: <span className="font-semibold">{yearlyEmissions.toFixed(0)} kg CO₂</span>
                </p>
                <p className="text-sm text-gray-600">
                  With 20% reduction: <span className="font-semibold text-green-600">{(yearlyEmissions * 0.8).toFixed(0)} kg CO₂</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Recommendations */}
      {getRecommendations().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>AI-Powered Recommendations</span>
            </CardTitle>
            <CardDescription>Personalized suggestions to reduce your carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getRecommendations().map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <rec.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-700 mt-1">{rec.suggestion}</div>
                    <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-800">
                      {rec.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}