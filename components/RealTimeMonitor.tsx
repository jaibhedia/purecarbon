'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Car, 
  UtensilsCrossed, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Wifi,
  Globe,
  Cpu,
  Database
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface RealTimeData {
  timestamp: string;
  carbonEmissions: number;
  energyUsage: number;
  transport: number;
  food: number;
  waste: number;
  trend: 'up' | 'down' | 'stable';
}

export default function RealTimeMonitor({ userData }: { userData: any }) {
  const [realTimeData, setRealTimeData] = useState<RealTimeData[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [currentEmissions, setCurrentEmissions] = useState(185);
  const [emissionsTrend, setEmissionsTrend] = useState<'up' | 'down' | 'stable'>('down');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString();
      
      // Generate realistic fluctuating data
      const baseEmissions = 185;
      const variation = (Math.random() - 0.5) * 20;
      const newEmissions = Math.max(0, baseEmissions + variation);
      
      const newDataPoint: RealTimeData = {
        timestamp,
        carbonEmissions: newEmissions,
        energyUsage: Math.random() * 100 + 50,
        transport: Math.random() * 50 + 20,
        food: Math.random() * 30 + 10,
        waste: Math.random() * 15 + 5,
        trend: variation > 0 ? 'up' : variation < 0 ? 'down' : 'stable'
      };

      setRealTimeData(prev => [...prev.slice(-19), newDataPoint]);
      setCurrentEmissions(newEmissions);
      setEmissionsTrend(newDataPoint.trend);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentHourData = [
    { time: '14:00', emissions: 190, target: 185 },
    { time: '14:15', emissions: 188, target: 185 },
    { time: '14:30', emissions: 185, target: 185 },
    { time: '14:45', emissions: 182, target: 185 },
    { time: '15:00', emissions: currentEmissions, target: 185 }
  ];

  const categoryData = [
    { 
      category: 'Energy', 
      current: 65, 
      target: 60, 
      status: 'warning',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500'
    },
    { 
      category: 'Transport', 
      current: 85, 
      target: 80, 
      status: 'warning',
      icon: Car,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500'
    },
    { 
      category: 'Food', 
      current: 25, 
      target: 30, 
      status: 'good',
      icon: UtensilsCrossed,
      color: 'text-green-500',
      bgColor: 'bg-green-500'
    },
    { 
      category: 'Waste', 
      current: 10, 
      target: 15, 
      status: 'good',
      icon: Trash2,
      color: 'text-red-500',
      bgColor: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Real-Time Carbon Monitor
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Live tracking of your carbon emissions and environmental impact
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={`${isConnected ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}
          >
            <div className={`w-2 h-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-2 ${isConnected ? 'animate-pulse' : ''}`}></div>
            {isConnected ? 'Live' : 'Disconnected'}
          </Badge>
          <Button variant="outline" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            IoT Devices
          </Button>
        </div>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Current Emissions
              </CardTitle>
              {emissionsTrend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-green-500" />
              ) : emissionsTrend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : (
                <Activity className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentEmissions.toFixed(1)} kg
            </div>
            <p className={`text-sm font-medium ${
              emissionsTrend === 'down' ? 'text-green-600' : 
              emissionsTrend === 'up' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {emissionsTrend === 'down' ? '↓ Decreasing' : 
               emissionsTrend === 'up' ? '↑ Increasing' : '→ Stable'}
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Target: 185 kg</span>
                <span>{((currentEmissions / 185) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(currentEmissions / 185) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Data Points
              </CardTitle>
              <Database className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {realTimeData.length}
            </div>
            <p className="text-sm text-blue-600 font-medium">
              Last 60 minutes
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                3s intervals
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                IoT Sensors
              </CardTitle>
              <Wifi className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              24/27
            </div>
            <p className="text-sm text-green-600 font-medium">
              Active sensors
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs text-green-600">
                89% uptime
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Processing
              </CardTitle>
              <Cpu className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              Real-time
            </div>
            <p className="text-sm text-purple-600 font-medium">
              AI processing
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs text-purple-600">
                &lt; 100ms latency
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Emissions Tracking</CardTitle>
            <CardDescription>Real-time carbon emissions over the last hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentHourData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Current"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10B981" 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Monitoring</CardTitle>
            <CardDescription>Real-time breakdown by emission category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((item) => {
                const IconComponent = item.icon;
                const isOverTarget = item.current > item.target;
                return (
                  <div key={item.category} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-gray-500">
                          Target: {item.target} kg
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-bold text-lg">{item.current} kg</div>
                        <div className={`text-sm ${isOverTarget ? 'text-red-600' : 'text-green-600'}`}>
                          {isOverTarget ? 'Over target' : 'Under target'}
                        </div>
                      </div>
                      {isOverTarget ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Alerts</CardTitle>
          <CardDescription>Automated monitoring and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <div className="font-medium text-yellow-800 dark:text-yellow-200">
                  Energy usage spike detected
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  Energy consumption is 8% above target for the last 15 minutes
                </div>
              </div>
              <div className="text-xs text-yellow-600">
                2 min ago
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <div className="font-medium text-green-800 dark:text-green-200">
                  Transport emissions optimized
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Route optimization reduced transport emissions by 12%
                </div>
              </div>
              <div className="text-xs text-green-600">
                5 min ago
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Activity className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-medium text-blue-800 dark:text-blue-200">
                  New IoT sensor connected
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  Smart thermostat in Building A is now online and reporting data
                </div>
              </div>
              <div className="text-xs text-blue-600">
                8 min ago
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
