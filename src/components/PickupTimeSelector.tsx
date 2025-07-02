import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface PickupTimeSelectorProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

const PickupTimeSelector: React.FC<PickupTimeSelectorProps> = ({
  selectedTime,
  onTimeChange
}) => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTimeOptions = () => {
    const options = ['지금'];
    const now = new Date();
    
    // 30분 후부터 4시간 후까지 30분 간격으로 생성
    for (let i = 1; i <= 8; i++) {
      const time = new Date(now.getTime() + (i * 30 * 60 * 1000));
      const hour = time.getHours();
      
      // 영업시간 체크 (오전 7시 ~ 오후 10시)
      if (hour >= 7 && hour < 22) {
        const timeString = time.toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        options.push(timeString);
      }
    }
    
    return options;
  };

  const timeOptions = getTimeOptions();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {timeOptions.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? "default" : "outline"}
            onClick={() => onTimeChange(time)}
            className={`flex items-center gap-2 ${
              selectedTime === time 
                ? "bg-gradient-to-r from-amber-600 to-orange-600" 
                : ""
            }`}
          >
            <Clock className="h-4 w-4" />
            {time === '지금' ? (
              <span>지금 ({getCurrentTime()})</span>
            ) : (
              <span>{time}</span>
            )}
          </Button>
        ))}
      </div>
      
      {selectedTime !== '지금' && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p>📋 선택한 시간: <strong>{selectedTime}</strong></p>
          <p>⏰ 해당 시간에 맞춰 준비해드립니다.</p>
        </div>
      )}
    </div>
  );
};

export default PickupTimeSelector;