
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationSearch: () => void;
  seniorMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationSearch, seniorMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className={`bg-white border-b px-4 py-4 ${seniorMode ? 'senior-mode' : ''}`}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="카페 이름이나 메뉴를 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onLocationSearch}>
          <MapPin className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
