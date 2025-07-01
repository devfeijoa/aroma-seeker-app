
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
      <DialogContent className={`max-w-2xl ${seniorMode ? 'senior-mode' : ''}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
            필터 설정
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {filterGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4 className="font-semibold mb-4 text-lg text-gray-800">{group.title}</h4>
              <div className="grid grid-cols-2 gap-3">
                {group.filters.map((filter) => (
                  <div
                    key={filter.id}
                    onClick={() => onFilterToggle(filter.id)}
                    className={`
                      cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md
                      ${filter.active 
                        ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center justify-center flex-col space-y-2">
                      {filter.icon && (
                        <span className="text-2xl">{filter.icon}</span>
                      )}
                      <span className={`text-sm font-medium text-center ${
                        filter.active ? 'text-amber-700' : 'text-gray-700'
                      }`}>
                        {filter.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {groupIndex < filterGroups.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onResetFilters}
            className="hover:bg-gray-50"
          >
            초기화
          </Button>
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            적용
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
