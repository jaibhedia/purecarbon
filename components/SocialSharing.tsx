'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram,
  Copy,
  Download,
  QrCode,
  Trophy,
  TrendingDown,
  Leaf,
  Award,
  Users,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface SocialSharingProps {
  type: 'achievement' | 'progress' | 'goal' | 'challenge';
  data: {
    title: string;
    description: string;
    value?: string | number;
    image?: string;
    url?: string;
  };
  trigger?: React.ReactNode;
}

export default function SocialSharing({ type, data, trigger }: SocialSharingProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Helper functions defined before they are used
  const generateAchievementImage = (data: any) => {
    // In a real implementation, this would generate a custom achievement image
    return '/achievement-share.jpg';
  };

  const generateProgressImage = (data: any) => {
    // In a real implementation, this would generate a custom progress image
    return '/progress-share.jpg';
  };

  const generateGoalImage = (data: any) => {
    // In a real implementation, this would generate a custom goal image
    return '/goal-share.jpg';
  };

  const generateChallengeImage = (data: any) => {
    // In a real implementation, this would generate a custom challenge image
    return '/challenge-share.jpg';
  };

  const getShareContent = () => {
    const baseUrl = 'https://purecarbon.app';
    const hashtags = '#PureCarbon #Sustainability #ClimateAction #EcoFriendly';
    
    switch (type) {
      case 'achievement':
        return {
          text: `🏆 Just earned the "${data.title}" achievement on PureCarbon! ${data.description} ${hashtags}`,
          url: `${baseUrl}/achievements/${data.title.toLowerCase().replace(/\s+/g, '-')}`,
          image: generateAchievementImage(data)
        };
      case 'progress':
        return {
          text: `📊 My carbon footprint progress: ${data.value} ${data.description} Track your impact with PureCarbon! ${hashtags}`,
          url: `${baseUrl}/progress`,
          image: generateProgressImage(data)
        };
      case 'goal':
        return {
          text: `🎯 Set a new sustainability goal: ${data.title}! Join me on PureCarbon to track your carbon journey ${hashtags}`,
          url: `${baseUrl}/goals`,
          image: generateGoalImage(data)
        };
      case 'challenge':
        return {
          text: `🌱 Completed the "${data.title}" challenge! ${data.description} ${hashtags}`,
          url: `${baseUrl}/challenges`,
          image: generateChallengeImage(data)
        };
      default:
        return {
          text: `🌍 Join me on PureCarbon to track and reduce your carbon footprint! ${hashtags}`,
          url: baseUrl,
          image: '/og-image.jpg'
        };
    }
  };

  const shareContent = getShareContent();

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent.text)}&url=${encodeURIComponent(shareContent.url)}`;
    window.open(url, '_blank', 'width=550,height=420');
    toast.success('Shared to Twitter!');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareContent.url)}&quote=${encodeURIComponent(shareContent.text)}`;
    window.open(url, '_blank', 'width=550,height=420');
    toast.success('Shared to Facebook!');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareContent.url)}&title=${encodeURIComponent(data.title)}&summary=${encodeURIComponent(data.description)}`;
    window.open(url, '_blank', 'width=550,height=420');
    toast.success('Shared to LinkedIn!');
  };

  const shareToInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we'll copy the text
    copyToClipboard();
    toast.success('Content copied! Paste it in your Instagram story or post.');
  };

  const copyToClipboard = () => {
    const textToCopy = `${shareContent.text}\n\n${shareContent.url}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success('Copied to clipboard!');
  };

  const downloadImage = () => {
    // In a real implementation, this would generate and download the custom image
    toast.success('Image downloaded! Share it on your favorite platform.');
  };

  const generateQRCode = () => {
    // In a real implementation, this would generate a QR code
    toast.success('QR code generated!');
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'achievement': return Trophy;
      case 'progress': return TrendingDown;
      case 'goal': return Award;
      case 'challenge': return Users;
      default: return Leaf;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TypeIcon className="h-5 w-5" />
            <span>Share Your Success</span>
          </DialogTitle>
          <DialogDescription>
            Inspire others with your sustainability journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Card */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <TypeIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{data.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{data.description}</p>
                  {data.value && (
                    <Badge className="mt-2 bg-green-500 hover:bg-green-500">
                      {data.value}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={shareToTwitter} className="social-share-button social-share-twitter">
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button onClick={shareToFacebook} className="social-share-button social-share-facebook">
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button onClick={shareToLinkedIn} className="social-share-button social-share-linkedin">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button onClick={shareToInstagram} className="social-share-button social-share-instagram">
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
          </div>

          {/* Additional Options */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyToClipboard} className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" onClick={downloadImage} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Image
            </Button>
            <Button variant="outline" onClick={generateQRCode}>
              <QrCode className="h-4 w-4" />
            </Button>
          </div>

          {/* Share Stats */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Join 10,000+ users sharing their sustainability journey</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Quick Share Components for common use cases
export function ShareAchievement({ achievement, trigger }: { achievement: any; trigger?: React.ReactNode }) {
  return (
    <SocialSharing
      type="achievement"
      data={{
        title: achievement.title,
        description: achievement.description,
        value: `+${achievement.points} EcoPoints`
      }}
      trigger={trigger}
    />
  );
}

export function ShareProgress({ progress, trigger }: { progress: any; trigger?: React.ReactNode }) {
  return (
    <SocialSharing
      type="progress"
      data={{
        title: 'Carbon Footprint Progress',
        description: `${progress.reduction}% reduction this month`,
        value: `${progress.current} kg CO₂`
      }}
      trigger={trigger}
    />
  );
}

export function ShareGoal({ goal, trigger }: { goal: any; trigger?: React.ReactNode }) {
  return (
    <SocialSharing
      type="goal"
      data={{
        title: goal.title,
        description: `Target: ${goal.target}% reduction by ${goal.deadline}`,
        value: `${goal.progress}% complete`
      }}
      trigger={trigger}
    />
  );
}

export function ShareChallenge({ challenge, trigger }: { challenge: any; trigger?: React.ReactNode }) {
  return (
    <SocialSharing
      type="challenge"
      data={{
        title: challenge.title,
        description: challenge.description,
        value: `+${challenge.points} EcoPoints earned`
      }}
      trigger={trigger}
    />
  );
}