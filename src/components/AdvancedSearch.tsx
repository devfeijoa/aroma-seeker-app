
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: any) => void;
  seniorMode: boolean;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  seniorMode
}) => {
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    location: '',
    priceRange: [0, 10000],
    atmosphere: '',
    menuType: '',
    openTime: '',
    features: []
  });

  const handleSearch = () => {
    onSearch(searchFilters);
    onClose();
  };

  const handleReset = () => {
    setSearchFilters({
      keyword: '',
      location: '',
      priceRange: [0, 10000],
      atmosphere: '',
      menuType: '',
      openTime: '',
      features: []
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[80vh] overflow-y-auto ${seniorMode ? 'senior-mode' : ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
            <Search className="h-6 w-6 text-amber-600" />
            상세 검색
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 키워드 검색 */}
          <div>
            <Label htmlFor="keyword" className="text-base font-medium">키워드</Label>
            <Input
              id="keyword"
              placeholder="카페 이름, 메뉴, 특징을 검색하세요"
              value={searchFilters.keyword}
              onChange={(e) => setSearchFilters({...searchFilters, keyword: e.target.value})}
            />
          </div>

          <Separator />

          {/* 위치 */}
          <div>
            <Label htmlFor="location" className="text-base font-medium">지역</Label>
            <Select value={searchFilters.location} onValueChange={(value) => setSearchFilters({...searchFilters, location: value})}>
              <SelectTrigger>
                <SelectValue placeholder="지역을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gangnam">강남구</SelectItem>
                <SelectItem value="seocho">서초구</SelectItem>
                <SelectItem value="mapo">마포구</SelectItem>
                <SelectItem value="jongno">종로구</SelectItem>
                <SelectItem value="jung">중구</SelectItem>
                <SelectItem value="hongdae">홍대</SelectItem>
                <SelectItem value="itaewon">이태원</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 가격대 */}
          <div>
            <Label className="text-base font-medium">가격대</Label>
            <div className="px-3 py-4">
              <Slider
                value={searchFilters.priceRange}
                onValueChange={(value) => setSearchFilters({...searchFilters, priceRange: value})}
                max={15000}
                min={0}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{searchFilters.priceRange[0].toLocaleString()}원</span>
                <span>{searchFilters.priceRange[1].toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* 분위기 */}
          <div>
            <Label className="text-base font-medium">분위기</Label>
            <Select value={searchFilters.atmosphere} onValueChange={(value) => setSearchFilters({...searchFilters, atmosphere: value})}>
              <SelectTrigger>
                <SelectValue placeholder="분위기를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quiet">조용한</SelectItem>
                <SelectItem value="cozy">아늑한</SelectItem>
                <SelectItem value="modern">모던한</SelectItem>
                <SelectItem value="vintage">빈티지</SelectItem>
                <SelectItem value="natural">자연친화적</SelectItem>
                <SelectItem value="instagram">인스타 감성</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 메뉴 종류 */}
          <div>
            <Label className="text-base font-medium">메뉴 종류</Label>
            <Select value={searchFilters.menuType} onValueChange={(value) => setSearchFilters({...searchFilters, menuType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="메뉴 종류를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coffee">커피 전문</SelectItem>
                <SelectItem value="dessert">디저트 카페</SelectItem>
                <SelectItem value="brunch">브런치 카페</SelectItem>
                <SelectItem value="bakery">베이커리 카페</SelectItem>
                <SelectItem value="smoothie">스무디 전문</SelectItem>
                <SelectItem value="zero">제로 음료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 영업시간 */}
          <div>
            <Label className="text-base font-medium">영업시간</Label>
            <Select value={searchFilters.openTime} onValueChange={(value) => setSearchFilters({...searchFilters, openTime: value})}>
              <SelectTrigger>
                <SelectValue placeholder="영업시간을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early">새벽 영업 (7시 이전)</SelectItem>
                <SelectItem value="late">늦은 영업 (22시 이후)</SelectItem>
                <SelectItem value="24h">24시간</SelectItem>
                <SelectItem value="weekend">주말 영업</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            초기화
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              검색
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearch;
