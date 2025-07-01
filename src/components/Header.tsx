
import React from 'react';
import { Bell, User, Settings, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  seniorMode: boolean;
  onProfileClick?: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ seniorMode, onProfileClick, onSettingsClick }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate('/profile');
    }
  };

  return (
    <header className={`bg-white shadow-lg border-b border-amber-200 ${seniorMode ? 'senior-mode' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-lg">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
                CafeHub
              </h1>
              <p className="text-xs text-gray-500">당신만의 카페 파트너</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative hover:bg-amber-50">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon" onClick={onSettingsClick} className="hover:bg-amber-50">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleProfileClick} className="hover:bg-amber-50">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
