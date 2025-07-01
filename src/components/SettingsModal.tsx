import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Volume2, Eye, Accessibility, Settings } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  seniorMode: boolean;
  onSeniorModeToggle: (enabled: boolean) => void;
  voiceEnabled: boolean;
  onVoiceToggle: (enabled: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  seniorMode,
  onSeniorModeToggle,
  voiceEnabled,
  onVoiceToggle
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md ${seniorMode ? 'senior-mode' : ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            설정
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <Accessibility className="h-4 w-4 mr-2" />
              접근성 설정
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="senior-mode" className="text-base font-medium">
                    시니어 모드
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    큰 글씨와 고대비 테마를 적용합니다
                  </p>
                </div>
                <Switch
                  id="senior-mode"
                  checked={seniorMode}
                  onCheckedChange={onSeniorModeToggle}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="voice-guide" className="text-base font-medium flex items-center">
                    <Volume2 className="h-4 w-4 mr-2" />
                    음성 안내
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    버튼과 화면을 음성으로 안내합니다
                  </p>
                </div>
                <Switch
                  id="voice-guide"
                  checked={voiceEnabled}
                  onCheckedChange={onVoiceToggle}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold mb-4">개인화 설정</h4>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                내 선호도 설정
              </Button>
              <Button variant="outline" className="w-full justify-start">
                자주 주문하는 메뉴 관리
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
