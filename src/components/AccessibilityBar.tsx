
import React from 'react';
import { Button } from '@/components/ui/button';
import { Accessibility, Volume2 } from 'lucide-react';

interface AccessibilityBarProps {
  seniorMode: boolean;
  voiceEnabled: boolean;
  onSeniorModeToggle: (enabled: boolean) => void;
  onVoiceToggle: (enabled: boolean) => void;
}

const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  seniorMode,
  voiceEnabled,
  onSeniorModeToggle,
  onVoiceToggle
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <Button
        variant={seniorMode ? "default" : "outline"}
        size="icon"
        onClick={() => onSeniorModeToggle(!seniorMode)}
        className={`h-12 w-12 rounded-full shadow-lg ${
          seniorMode 
            ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700' 
            : 'bg-white hover:bg-amber-50 border-amber-200'
        }`}
        title="시니어 모드"
      >
        <Accessibility className={`h-6 w-6 ${seniorMode ? 'text-white' : 'text-amber-600'}`} />
      </Button>
      
      <Button
        variant={voiceEnabled ? "default" : "outline"}
        size="icon"
        onClick={() => onVoiceToggle(!voiceEnabled)}
        className={`h-12 w-12 rounded-full shadow-lg ${
          voiceEnabled 
            ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700' 
            : 'bg-white hover:bg-amber-50 border-amber-200'
        }`}
        title="음성 안내"
      >
        <Volume2 className={`h-6 w-6 ${voiceEnabled ? 'text-white' : 'text-amber-600'}`} />
      </Button>
    </div>
  );
};

export default AccessibilityBar;
