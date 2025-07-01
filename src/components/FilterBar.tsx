
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon?: string;
  active: boolean;
}

interface FilterBarProps {
  filters: FilterOption[];
  onFilterToggle: (filterId: string) => void;
  onFilterMenuOpen: () => void;
  seniorMode: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterToggle, onFilterMenuOpen, seniorMode }) => {
  const activeFilters = filters.filter(f => f.active);

  return (
    <div className={`bg-white border-b px-4 py-3 ${seniorMode ? 'senior-mode' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">필터</h3>
        <Button variant="outline" size="sm" onClick={onFilterMenuOpen}>
          <Filter className="h-4 w-4 mr-2" />
          전체 필터
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <Badge
            key={filter.id}
            variant="secondary"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => onFilterToggle(filter.id)}
          >
            {filter.icon && <span className="mr-1">{filter.icon}</span>}
            {filter.label}
            <span className="ml-2">×</span>
          </Badge>
        ))}
        
        {activeFilters.length === 0 && (
          <span className="text-muted-foreground">필터를 선택해주세요</span>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
