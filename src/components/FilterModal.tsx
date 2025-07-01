
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FilterGroup {
  title: string;
  filters: {
    id: string;
    label: string;
    icon?: string;
    active: boolean;
  }[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  onFilterToggle: (filterId: string) => void;
  onResetFilters: () => void;
  seniorMode: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filterGroups,
  onFilterToggle,
  onResetFilters,
  seniorMode
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md ${seniorMode ? 'senior-mode' : ''}`}>
        <DialogHeader>
          <DialogTitle>필터 설정</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {filterGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4 className="font-semibold mb-3">{group.title}</h4>
              <div className="space-y-3">
                {group.filters.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={filter.active}
                      onCheckedChange={() => onFilterToggle(filter.id)}
                    />
                    <Label htmlFor={filter.id} className="flex items-center cursor-pointer">
                      {filter.icon && <span className="mr-2">{filter.icon}</span>}
                      {filter.label}
                    </Label>
                  </div>
                ))}
              </div>
              {groupIndex < filterGroups.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onResetFilters}>
            초기화
          </Button>
          <Button onClick={onClose}>
            적용
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
