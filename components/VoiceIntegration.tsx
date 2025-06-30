'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  Headphones,
  MessageCircle,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Play,
  Square
} from 'lucide-react';
import { toast } from 'sonner';

interface VoiceCommand {
  command: string;
  response: string;
  timestamp: string;
  confidence: number;
}

interface VoiceSettings {
  enabled: boolean;
  voice: string;
  speed: number;
  volume: number;
  language: string;
  autoSpeak: boolean;
  wakeWord: boolean;
}

export default function VoiceIntegration() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<any>(null);
  
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: false,
    voice: 'sarah',
    speed: 1.0,
    volume: 0.8,
    language: 'en-US',
    autoSpeak: true,
    wakeWord: true
  });

  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([
    {
      command: "What's my carbon footprint this month?",
      response: "Your carbon footprint this month is 225 kg of CO2, which is 12% lower than last month. Great progress!",
      timestamp: "2025-01-15 14:30",
      confidence: 0.95
    },
    {
      command: "Show me my top recommendations",
      response: "Your top 3 recommendations are: optimize your commute route for 15% reduction, adjust your thermostat schedule for 22% energy savings, and start composting for 25% waste reduction.",
      timestamp: "2025-01-15 14:25",
      confidence: 0.92
    },
    {
      command: "How am I doing with my goals?",
      response: "You're making excellent progress! You've achieved 3 out of 5 weekly goals and are 35% towards your annual reduction target.",
      timestamp: "2025-01-15 14:20",
      confidence: 0.88
    }
  ]);

  const voiceOptions = [
    { id: 'sarah', name: 'Sarah (Friendly)', description: 'Warm and encouraging tone' },
    { id: 'alex', name: 'Alex (Professional)', description: 'Clear and informative' },
    { id: 'emma', name: 'Emma (Energetic)', description: 'Motivational and upbeat' },
    { id: 'james', name: 'James (Calm)', description: 'Soothing and reassuring' }
  ];

  const languageOptions = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese' },
    { code: 'zh-CN', name: 'Chinese' }
  ];

  const sampleCommands = [
    "What's my carbon footprint?",
    "Show me recommendations",
    "How are my goals?",
    "Give me insights",
    "What can you help me with?",
    "Analyze my emissions"
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.language = settings.language;
        
        recognitionInstance.onstart = () => {
          setConnectionStatus('connected');
          setIsListening(true);
        };
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCurrentTranscript(transcript);
          
          if (event.results[0].isFinal) {
            processVoiceCommand(transcript);
          }
        };
        
        recognitionInstance.onerror = () => {
          setConnectionStatus('disconnected');
          setIsListening(false);
          toast.error('Voice recognition error. Please try again.');
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
          setCurrentTranscript('');
        };
        
        setRecognition(recognitionInstance);
      }

      // Initialize speech synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis);
      }
    }
  }, [settings.language]);

  // Process voice commands with AI-like responses
  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response = '';
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('carbon footprint') || lowerCommand.includes('emissions')) {
      response = "Your current carbon footprint is 225 kg of CO2 this month, which is 12% lower than last month. You're doing great!";
    } else if (lowerCommand.includes('recommendation') || lowerCommand.includes('suggest')) {
      response = "I recommend optimizing your commute route, which could reduce your transport emissions by 15%. Would you like me to show you the details?";
    } else if (lowerCommand.includes('goal') || lowerCommand.includes('target')) {
      response = "You're currently 65% towards your monthly reduction goal. Keep up the excellent work! Your next milestone is just 5 kg away.";
    } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      response = "I can help you track your carbon footprint, provide personalized recommendations, set goals, and answer questions about your environmental impact.";
    } else if (lowerCommand.includes('insights') || lowerCommand.includes('analysis')) {
      response = "Based on my analysis, your biggest opportunity for improvement is in transport, which accounts for 42% of your emissions. Shall I provide specific recommendations?";
    } else {
      response = "I understand you're asking about your carbon footprint. Could you please rephrase your question? I can help with emissions tracking, recommendations, and goal setting.";
    }
    
    const newCommand: VoiceCommand = {
      command,
      response,
      timestamp: new Date().toLocaleString(),
      confidence: Math.random() * 0.3 + 0.7 // Random confidence between 0.7-1.0
    };
    
    setCommandHistory(prev => [newCommand, ...prev.slice(0, 9)]); // Keep last 10 commands
    setIsProcessing(false);
    
    if (settings.autoSpeak && synthesis) {
      speakResponse(response);
    }
    
    toast.success('Voice command processed successfully!');
  };

  // Text-to-speech functionality
  const speakResponse = (text: string) => {
    if (!synthesis) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.speed;
    utterance.volume = settings.volume;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    synthesis.speak(utterance);
  };

  // Start/stop listening
  const toggleListening = () => {
    if (!recognition) {
      toast.error('Speech recognition not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      setConnectionStatus('connecting');
      recognition.start();
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Enable/disable voice features
  const toggleVoiceEnabled = () => {
    const newEnabled = !settings.enabled;
    setSettings(prev => ({ ...prev, enabled: newEnabled }));
    
    if (newEnabled) {
      setConnectionStatus('connected');
      toast.success('Voice assistant activated!');
    } else {
      setConnectionStatus('disconnected');
      if (isListening && recognition) {
        recognition.stop();
      }
      if (isSpeaking && synthesis) {
        synthesis.cancel();
      }
      toast.info('Voice assistant deactivated');
    }
  };

  // Update settings
  const updateSettings = (key: keyof VoiceSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Mic className="h-6 w-6 text-blue-600" />
            <span>Voice Assistant</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Interact with PureCarbon using natural voice commands
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Voice Assistant</span>
            <Switch 
              checked={settings.enabled}
              onCheckedChange={toggleVoiceEnabled}
            />
          </div>
          <Badge 
            variant={connectionStatus === 'connected' ? 'default' : connectionStatus === 'connecting' ? 'secondary' : 'destructive'}
          >
            {connectionStatus}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Voice Control */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Headphones className="h-5 w-5" />
              <span>Voice Control</span>
            </CardTitle>
            <CardDescription>
              Speak naturally to get insights about your carbon footprint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Display */}
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              {currentTranscript && (
                <div className="space-y-3">
                  <Mic className="h-12 w-12 text-blue-500 mx-auto animate-pulse" />
                  <div className="text-lg font-semibold text-blue-600">Listening...</div>
                  <div className="text-sm text-gray-600 italic">"{currentTranscript}"</div>
                </div>
              )}
              
              {isProcessing && (
                <div className="space-y-3">
                  <Loader2 className="h-12 w-12 text-yellow-500 mx-auto animate-spin" />
                  <div className="text-lg font-semibold text-yellow-600">Processing...</div>
                </div>
              )}
              
              {isSpeaking && (
                <div className="space-y-3">
                  <Volume2 className="h-12 w-12 text-green-500 mx-auto animate-pulse" />
                  <div className="text-lg font-semibold text-green-600">Speaking...</div>
                </div>
              )}
              
              {!isListening && !isProcessing && !isSpeaking && (
                <div className="space-y-3">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto" />
                  <div className="text-lg font-semibold text-gray-600">Ready for commands</div>
                  <div className="text-sm text-gray-500">Click the microphone to start</div>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={toggleListening}
                disabled={!settings.enabled || isProcessing}
                className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </Button>
              <Button
                onClick={stopSpeaking}
                disabled={!settings.enabled || !isSpeaking}
                variant="outline"
              >
                {isSpeaking ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>

            {/* Sample Commands */}
            <div>
              <div className="text-sm font-medium mb-2">Try these commands:</div>
              <div className="grid grid-cols-1 gap-2">
                {sampleCommands.slice(0, 4).map((command, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => processVoiceCommand(command)}
                    disabled={!settings.enabled || isProcessing}
                    className="justify-start text-left"
                  >
                    "{command}"
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Voice Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Voice Character</label>
              <Select 
                value={settings.voice} 
                onValueChange={(value) => updateSettings('voice', value)}
                disabled={!settings.enabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voiceOptions.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      <div className="flex flex-col">
                        <span>{voice.name}</span>
                        <span className="text-xs text-gray-500">{voice.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => updateSettings('language', value)}
                disabled={!settings.enabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Speech Speed: {settings.speed.toFixed(1)}x</label>
              <Slider
                value={[settings.speed]}
                onValueChange={(value) => updateSettings('speed', value[0])}
                min={0.5}
                max={2.0}
                step={0.1}
                disabled={!settings.enabled}
              />
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Volume: {Math.round(settings.volume * 100)}%</label>
              <Slider
                value={[settings.volume]}
                onValueChange={(value) => updateSettings('volume', value[0])}
                min={0}
                max={1}
                step={0.1}
                disabled={!settings.enabled}
              />
            </div>

            {/* Toggle Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-speak responses</span>
                <Switch 
                  checked={settings.autoSpeak}
                  onCheckedChange={(checked) => updateSettings('autoSpeak', checked)}
                  disabled={!settings.enabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Wake word detection</span>
                <Switch 
                  checked={settings.wakeWord}
                  onCheckedChange={(checked) => updateSettings('wakeWord', checked)}
                  disabled={!settings.enabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Command History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Recent Conversations</span>
          </CardTitle>
          <CardDescription>
            Your latest voice interactions with the assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {commandHistory.map((cmd, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    "{cmd.command}"
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {Math.round(cmd.confidence * 100)}%
                    </Badge>
                    <span className="text-xs text-gray-500">{cmd.timestamp}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  {cmd.response}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakResponse(cmd.response)}
                    disabled={!settings.enabled || isSpeaking}
                    className="ml-2 h-6 w-6 p-0"
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
