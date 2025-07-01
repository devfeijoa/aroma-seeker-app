
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Star, Coffee, Gift, Settings } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [seniorMode, setSeniorMode] = useState(localStorage.getItem('seniorMode') === 'true');
  const [voiceEnabled, setVoiceEnabled] = useState(localStorage.getItem('voiceEnabled') === 'true');
  const [userInfo, setUserInfo] = useState({
    name: '김카페',
    email: 'kim.cafe@example.com',
    phone: '010-1234-5678'
  });

  const handleSeniorModeToggle = (enabled: boolean) => {
    setSeniorMode(enabled);
    localStorage.setItem('seniorMode', enabled.toString());
    // 전체 앱에 변경사항 반영을 위해 페이지 새로고침
    window.location.reload();
  };

  const handleVoiceToggle = (enabled: boolean) => {
    setVoiceEnabled(enabled);
    localStorage.setItem('voiceEnabled', enabled.toString());
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 ${seniorMode ? 'senior-mode' : ''}`}>
      <header className="bg-white shadow-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="hover:bg-amber-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
              프로필
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 사용자 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              개인정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">이름</Label>
                <Input 
                  id="name" 
                  value={userInfo.name} 
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={userInfo.email} 
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">전화번호</Label>
              <Input 
                id="phone" 
                value={userInfo.phone} 
                onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* 접근성 설정 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              접근성 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">시니어 모드</Label>
                <p className="text-sm text-muted-foreground">
                  큰 글씨와 고대비 테마를 적용합니다
                </p>
              </div>
              <Switch
                checked={seniorMode}
                onCheckedChange={handleSeniorModeToggle}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">음성 안내</Label>
                <p className="text-sm text-muted-foreground">
                  버튼과 화면을 음성으로 안내합니다
                </p>
              </div>
              <Switch
                checked={voiceEnabled}
                onCheckedChange={handleVoiceToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* 나의 활동 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,250</p>
                  <p className="text-sm text-muted-foreground">총 포인트</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Coffee className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-sm text-muted-foreground">주문 수</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <Gift className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">쿠폰</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 자주 주문하는 메뉴 */}
        <Card>
          <CardHeader>
            <CardTitle>자주 주문하는 메뉴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium">아메리카노</p>
                  <p className="text-sm text-muted-foreground">블루보틀 카페</p>
                </div>
                <Button size="sm" variant="outline">재주문</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">카페라떼</p>
                  <p className="text-sm text-muted-foreground">감성 로스터리</p>
                </div>
                <Button size="sm" variant="outline">재주문</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
