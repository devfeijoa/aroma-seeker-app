import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import CafeCard from '@/components/CafeCard';
import FilterModal from '@/components/FilterModal';
import SettingsModal from '@/components/SettingsModal';
import CafeMenuModal from '@/components/CafeMenuModal';
import AccessibilityBar from '@/components/AccessibilityBar';
import AdvancedSearch from '@/components/AdvancedSearch';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [seniorMode, setSeniorMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // 확장된 카페 데이터 (Unsplash 이미지 사용)
  const [cafes] = useState([
    {
      id: '1',
      name: '블루보틀 카페',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
      rating: 4.7,
      distance: '800m',
      isOpen: true,
      tags: ['감성 카페', '인테리어', 'SNS 핫플'],
      specialFeatures: ['wifi'],
      description: '인스타그램에서 핫한 감성적인 인테리어'
    },
    {
      id: '5',
      name: '미니멀 카페 라운지',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      rating: 4.6,
      distance: '300m',
      isOpen: true,
      tags: ['미니멀', '감성 카페', '디저트'],
      specialFeatures: ['wifi', 'power'],
      description: '깔끔한 미니멀 인테리어와 맛있는 디저트'
    },
    {
      id: '6',
      name: '북카페 히든스팟',
      image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=400&h=300&fit=crop',
      rating: 4.4,
      distance: '450m',
      isOpen: true,
      tags: ['카공족', '북카페', '조용한 환경'],
      specialFeatures: ['wifi', 'power'],
      description: '책과 함께하는 조용한 공간'
    },
    {
      id: '7',
      name: '로컬 빈즈',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop',
      rating: 4.9,
      distance: '600m',
      isOpen: true,
      tags: ['스페셜티 커피', '로스팅', '원두'],
      specialFeatures: ['wifi'],
      description: '직접 로스팅하는 신선한 원두 커피'
    },
    {
      id: '8',
      name: '브런치 앤 카페',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
      rating: 4.2,
      distance: '750m',
      isOpen: true,
      tags: ['브런치', '디저트', '감성 카페'],
      specialFeatures: ['wifi'],
      description: '맛있는 브런치와 함께하는 여유로운 시간'
    },
    {
      id: '9',
      name: '베이커리 카페 클래식',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop',
      rating: 4.5,
      distance: '400m',
      isOpen: true,
      tags: ['베이커리', '디저트', '갓 구운 빵'],
      specialFeatures: ['wifi'],
      description: '갓 구운 빵과 향긋한 커피의 만남'
    },
    {
      id: '10',
      name: '가든 테라스 카페',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop',
      rating: 4.8,
      distance: '900m',
      isOpen: true,
      tags: ['테라스', '자연', '감성 카페'],
      specialFeatures: ['wifi'],
      description: '자연 속에서 즐기는 편안한 커피 타임'
    },
    {
      id: '11',
      name: '24시 스터디 카페',
      image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=300&fit=crop',
      rating: 4.3,
      distance: '250m',
      isOpen: true,
      tags: ['카공족', '24시간', '콘센트'],
      specialFeatures: ['wifi', 'power'],
      description: '24시간 언제든 공부할 수 있는 공간'
    },
    {
      id: '12',
      name: '빈티지 레코드 카페',
      image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=300&fit=crop',
      rating: 4.6,
      distance: '550m',
      isOpen: true,
      tags: ['빈티지', '음악', '감성 카페'],
      specialFeatures: ['wifi'],
      description: '빈티지한 분위기와 LP 음악이 흐르는 공간'
    },
    {
      id: '13',
      name: '에스프레소 바',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      rating: 4.7,
      distance: '320m',
      isOpen: true,
      tags: ['에스프레소', '스페셜티 커피', '바리스타'],
      specialFeatures: ['wifi'],
      description: '전문 바리스타가 내리는 완벽한 에스프레소'
    },
    {
      id: '14',
      name: '플랜트 카페',
      image: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?w=400&h=300&fit=crop',
      rating: 4.4,
      distance: '680m',
      isOpen: true,
      tags: ['식물', '힐링', '감성 카페'],
      specialFeatures: ['wifi', 'power'],
      description: '식물들과 함께하는 자연친화적 공간'
    },
    {
      id: '15',
      name: '루프탑 카페',
      image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop',
      rating: 4.9,
      distance: '1.2km',
      isOpen: true,
      tags: ['루프탑', '뷰', 'SNS 핫플'],
      specialFeatures: ['wifi'],
      description: '도시 전망을 감상하며 즐기는 특별한 커피'
    },
    {
      id: '16',
      name: '헬시 스무디 카페',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      rating: 4.2,
      distance: '420m',
      isOpen: true,
      tags: ['스무디', '건강', '제로 음료'],
      specialFeatures: ['wifi'],
      description: '건강한 재료로 만든 신선한 스무디'
    },
    {
      id: '17',
      name: '아늑한 동네 카페',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
      rating: 4.5,
      distance: '380m',
      isOpen: true,
      tags: ['동네카페', '아늑한', '홈메이드'],
      specialFeatures: ['wifi', 'power'],
      description: '집처럼 편안한 동네의 작은 카페'
    },
    {
      id: '18',
      name: '모던 컨셉 카페',
      image: 'https://images.unsplash.com/photo-1549652506-4d4d42c59be6?w=400&h=300&fit=crop',
      rating: 4.8,
      distance: '720m',
      isOpen: true,
      tags: ['모던', '미니멀', 'SNS 핫플'],
      specialFeatures: ['wifi', 'power'],
      description: '세련된 모던 인테리어의 컨셉 카페'
    },
    {
      id: '19',
      name: '캐주얼 브루잉 카페',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
      rating: 4.3,
      distance: '850m',
      isOpen: false,
      tags: ['브루잉', '캐주얼', '원두'],
      specialFeatures: ['wifi'],
      description: '다양한 브루잉 방식으로 즐기는 커피'
    },
    {
      id: '20',
      name: '코워킹 카페 스페이스',
      image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&h=300&fit=crop',
      rating: 4.6,
      distance: '150m',
      isOpen: true,
      tags: ['코워킹', '카공족', '콘센트'],
      specialFeatures: ['wifi', 'power'],
      description: '업무와 스터디를 위한 전용 공간'
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

  // 시니어 모드 토글 핸들러
  const handleSeniorModeToggle = (enabled: boolean) => {
    setSeniorMode(enabled);
    localStorage.setItem('seniorMode', enabled.toString());
    window.location.reload(); // 전체 앱에 변경사항 적용
  };

  // 음성 토글 핸들러
  const handleVoiceToggle = (enabled: boolean) => {
    setVoiceEnabled(enabled);
    localStorage.setItem('voiceEnabled', enabled.toString());
  };

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
      toast({
        title: "음성 안내",
        description: `${query}을(를) 검색합니다.`,
      });
    }
  };

  const handleAdvancedSearch = (searchFilters: any) => {
    console.log('Advanced search filters:', searchFilters);
    
    if (voiceEnabled) {
      toast({
        title: "음성 안내",
        description: "고급 검색을 실행합니다.",
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
    setSelectedCafe(cafe);
    setMenuModalOpen(true);
    
    if (voiceEnabled) {
      toast({
        title: "음성 안내",
        description: `${cafe.name}의 메뉴를 확인합니다.`,
      });
    }
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
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 ${seniorMode ? 'senior-mode' : ''}`}>
      <Header
        seniorMode={seniorMode}
        onSettingsClick={() => setSettingsModalOpen(true)}
      />
      
      <SearchBar
        onSearch={handleSearch}
        onLocationSearch={handleLocationSearch}
        onAdvancedSearch={() => setAdvancedSearchOpen(true)}
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
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
            주변 카페
          </h2>
          <p className="text-gray-600 text-lg">
            {filteredCafes.length}개의 카페를 찾았습니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <p className="text-gray-500 text-xl mb-2">
              선택한 조건에 맞는 카페가 없습니다.
            </p>
            <p className="text-gray-400">
              다른 필터를 선택해보세요.
            </p>
          </div>
        )}
      </main>
      
      {/* 접근성 바 - 화면 우하단에 고정 */}
      <AccessibilityBar
        seniorMode={seniorMode}
        voiceEnabled={voiceEnabled}
        onSeniorModeToggle={handleSeniorModeToggle}
        onVoiceToggle={handleVoiceToggle}
      />
      
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
        onSeniorModeToggle={handleSeniorModeToggle}
        voiceEnabled={voiceEnabled}
        onVoiceToggle={handleVoiceToggle}
      />
      
      <AdvancedSearch
        isOpen={advancedSearchOpen}
        onClose={() => setAdvancedSearchOpen(false)}
        onSearch={handleAdvancedSearch}
        seniorMode={seniorMode}
      />
      
      {selectedCafe && (
        <CafeMenuModal
          isOpen={menuModalOpen}
          onClose={() => setMenuModalOpen(false)}
          cafe={selectedCafe}
          seniorMode={seniorMode}
        />
      )}
    </div>
  );
};

export default Index;
