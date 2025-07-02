import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, CreditCard } from 'lucide-react';
import PickupTimeSelector from './PickupTimeSelector';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  cafeName: string;
  image: string;
}

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onConfirmOrder: (pickupTime: string) => void;
  seniorMode: boolean;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  items,
  onConfirmOrder,
  seniorMode
}) => {
  const [selectedPickupTime, setSelectedPickupTime] = useState<string>('지금');

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmOrder = () => {
    onConfirmOrder(selectedPickupTime);
    onClose();
  };

  const cafeNames = [...new Set(items.map(item => item.cafeName))];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[90vh] overflow-hidden ${seniorMode ? 'senior-mode' : ''}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
            주문 확인
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 카페 정보 */}
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-amber-600" />
              <span className="font-semibold">주문 카페</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cafeNames.map((cafeName) => (
                <Badge key={cafeName} variant="outline" className="bg-white">
                  {cafeName}
                </Badge>
              ))}
            </div>
          </div>

          {/* 주문 내역 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">주문 내역</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.cafeName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {item.price.toLocaleString()}원 × {item.quantity}
                    </p>
                    <p className="text-sm text-amber-600 font-semibold">
                      {(item.price * item.quantity).toLocaleString()}원
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 픽업 시간 선택 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              픽업 시간
            </h3>
            <PickupTimeSelector
              selectedTime={selectedPickupTime}
              onTimeChange={setSelectedPickupTime}
            />
          </div>

          {/* 결제 정보 */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-orange-600" />
              <span className="font-semibold">결제 정보</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>상품 금액 ({totalItems}개)</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>배달비</span>
                <span>0원</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>총 결제 금액</span>
                <span className="text-amber-600">{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleConfirmOrder}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              주문 확정
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationModal;