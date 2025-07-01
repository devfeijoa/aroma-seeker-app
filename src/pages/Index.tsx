
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import CafeCard from '@/components/CafeCard';
import FilterModal from '@/components/FilterModal';
import SettingsModal from '@/components/SettingsModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [seniorMode, setSeniorMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Mock data for cafes
  const [cafes] = useState([
    {
      id: '1',
      name: '블루보틀 카페',
      image: '/placeholder.svg',
      rating: 4.8,
      distance: '200m',
      isOpen: true,
      tags: ['스페셜티 커피', '감성 카페', '디저트'],
      specialFeatures: ['wifi', 'power'],
      description: '최고급 원두로 만든 핸드드립 커피의 정석'
    },
    {
      id: '2',
      name: '스터디 카페 조용한공간',
      image: '/placeholder.svg',
      rating: 4.5,
      distance: '350m',
      isOpen: true,
      tags: ['카공족', '조용한 환경', '콘센트'],
      specialFeatures: ['wifi', 'power'],
      description: '공부하기 좋은 조용한 환경과 편안한 좌석'
    },
    {
      id: '3',
      name: '제로 카페',
      image: '/placeholder.svg',
      rating: 4.3,
      distance: '500m',
      isOpen: false,
      tags: ['제로 음료', '비건', '대체 우유'],
      specialFeatures: ['wifi'],
      description: '건강한 제로 음료와 식물성 우유 전문점'
    },
    {
      id: '4',
      name: '감성 로스터리',
      image: '/placeholder.svg',
      rating: 4.7,
      distance: '800m',
      isOpen: true,
      tags: ['감성 카페', '인테리어', 'SNS 핫플'],
      specialFeatures: ['wifi'],
      description: '인스타그램에서 핫한 감성적인 인테리어'
    }
  ]);

  // Filter state
  const [filters, setFilters] = useState([
    { id: 'study', label: '카공족', icon: '📚', active: false },
    { id: 'aesthetic', label: '감성 카페', icon: '✨', active: false },
    { id: 'zero', label: '제로 음료', icon: '🥤', active: false },
    { id: 'dessert', label: '디저트', icon: '🍰', active: false },
    { id: 'wifi', label: 'WiFi', icon: '📶', active: false },
    { id: 'power', label: '콘센트', icon: '🔌', active: false }
  ]);

  const filterGroups = [
    {
      title: '카페 특성',
      filters: filters.slice(0, 4)
    },
    {
      title: '편의시설',
      filters: filters.slice(4)
    }
  ];

  // Load settings from localStorage
  useEffect(() => {
    const savedSeniorMode = localStorage.getItem('seniorMode') === 'true';
    const savedVoiceEnabled = localStorage.getItem('voiceEnabled') === 'true';
    setSeniorMode(savedSeniorMode);
    setVoiceEnabled(savedVoiceEnabled);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('seniorMode', seniorMode.toString());
  }, [seniorMode]);

  useEffect(() => {
    localStorage.setItem('voiceEnabled', voiceEnabled.toString());
  }, [voiceEnabled]);

  const handleFilterToggle = (filterId: string) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, active: !filter.active }
          : filter
      )
    );
  };

  const handleResetFilters = () => {
    setFilters(prev => prev.map(filter => ({ ...filter, active: false })));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    
    if (voiceEnabled) {
      // Mock voice feedback
      toast({
        title: "음성 안내",
        description: `${query}을(를) 검색합니다.`,
      });
    }
  };

  const handleLocationSearch = () => {
    toast({
      title: "위치 검색",
      description: "현재 위치 주변의 카페를 찾고 있습니다.",
    });
  };

  const handleCafeClick = (cafe: any) => {
    console.log('Selected cafe:', cafe);
    
    if (voiceEnabled) {
      toast({
        title: "음성 안내",
        description: `${cafe.name}을(를) 선택했습니다.`,
      });
    }
    
    toast({
      title: "카페 선택됨",
      description: `${cafe.name}의 메뉴를 확인하세요.`,
    });
  };

  const filteredCafes = cafes.filter(cafe => {
    const activeFilterIds = filters.filter(f => f.active).map(f => f.id);
    if (activeFilterIds.length === 0) return true;
    
    return activeFilterIds.some(filterId => {
      switch (filterId) {
        case 'study':
          return cafe.tags.includes('카공족');
        case 'aesthetic':
          return cafe.tags.includes('감성 카페') || cafe.tags.includes('SNS 핫플');
        case 'zero':
          return cafe.tags.includes('제로 음료');
        case 'dessert':
          return cafe.tags.includes('디저트');
        case 'wifi':
          return cafe.specialFeatures.includes('wifi');
        case 'power':
          return cafe.specialFeatures.includes('power');
        default:
          return false;
      }
    });
  });

  return (
    <div className={`min-h-screen bg-background ${seniorMode ? 'senior-mode' : ''}`}>
      <Header
        seniorMode={seniorMode}
        onProfileClick={() => toast({ title: "프로필", description: "프로필 페이지로 이동합니다." })}
        onSettingsClick={() => setSettingsModalOpen(true)}
      />
      
      <SearchBar
        onSearch={handleSearch}
        onLocationSearch={handleLocationSearch}
        seniorMode={seniorMode}
      />
      
      <FilterBar
        filters={filters}
        onFilterToggle={handleFilterToggle}
        onFilterMenuOpen={() => setFilterModalOpen(true)}
        seniorMode={seniorMode}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">주변 카페</h2>
          <p className="text-muted-foreground">
            {filteredCafes.length}개의 카페를 찾았습니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCafes.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              seniorMode={seniorMode}
              onClick={() => handleCafeClick(cafe)}
            />
          ))}
        </div>
        
        {filteredCafes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              선택한 조건에 맞는 카페가 없습니다.
            </p>
            <p className="text-muted-foreground">
              다른 필터를 선택해보세요.
            </p>
          </div>
        )}
      </main>
      
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filterGroups={filterGroups}
        onFilterToggle={handleFilterToggle}
        onResetFilters={handleResetFilters}
        seniorMode={seniorMode}
      />
      
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        seniorMode={seniorMode}
        onSeniorModeToggle={setSeniorMode}
        voiceEnabled={voiceEnabled}
        onVoiceToggle={setVoiceEnabled}
      />
    </div>
  );
};

export default Index;
