import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  seniorMode: boolean;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  onSortChange,
  seniorMode
}) => {
  const sortOptions = [
    { value: 'distance', label: '거리순' },
    { value: 'rating', label: '별점순' },
    { value: 'status', label: '영업 상태순' },
    { value: 'name', label: '이름순' }
  ];

  return (
    <div className={`flex items-center gap-2 ${seniorMode ? 'senior-mode' : ''}`}>
      <ArrowUpDown className="h-4 w-4 text-gray-500" />
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;