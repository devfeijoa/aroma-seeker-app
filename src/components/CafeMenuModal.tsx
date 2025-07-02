
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isZero?: boolean;
  hasAlternativeMilk?: boolean;
}

interface CafeMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  cafe: any;
  seniorMode: boolean;
  onAddToCart: (item: {
    id: string;
    name: string;
    price: number;
    cafeName: string;
    image: string;
  }) => void;
}

const CafeMenuModal: React.FC<CafeMenuModalProps> = ({
  isOpen,
  onClose,
  cafe,
  seniorMode,
  onAddToCart
}) => {
  const { toast } = useToast();
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState('커피');

  // 샘플 메뉴 데이터
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: '아메리카노',
      price: 4500,
      description: '깔끔하고 진한 에스프레소의 맛',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
      category: '커피'
    },
    {
      id: '2',
      name: '카페라떼',
      price: 5000,
      description: '부드러운 우유거품과 에스프레소의 조화',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop',
      category: '커피',
      hasAlternativeMilk: true
    },
    {
      id: '3',
      name: '카푸치노',
      price: 5200,
      description: '풍성한 우유거품이 특징인 클래식 커피',
      image: 'https://images.unsplash.com/photo-1572286258217-ceac5bc05954?w=200&h=200&fit=crop',
      category: '커피'
    },
    {
      id: '4',
      name: '제로 콜라',
      price: 3000,
      description: '당분 없는 건강한 콜라',
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=200&h=200&fit=crop',
      category: '음료',
      isZero: true
    },
    {
      id: '5',
      name: '초콜릿 케익',
      price: 6500,
      description: '진짜 벨기에 초콜릿으로 만든 케익',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop',
      category: '디저트'
    },
    {
      id: '6',
      name: '크로아상',
      price: 4000,
      description: '바삭하고 부드러운 프랑스식 크로아상',
      image: 'https://images.unsplash.com/photo-1555507036-ab794f0ecde3?w=200&h=200&fit=crop',
      category: '디저트'
    }
  ];

  const categories = ['커피', '음료', '디저트'];
  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const addToCartLocal = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    // Add to global cart
    const item = menuItems.find(m => m.id === itemId);
    if (item) {
      onAddToCart({
        id: `${cafe.id}-${item.id}`,
        name: item.name,
        price: item.price,
        cafeName: cafe.name,
        image: item.image
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(m => m.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const handleOrder = () => {
    if (getTotalItems() === 0) {
      toast({
        title: "주문 실패",
        description: "주문할 상품을 선택해주세요.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "주문 완료",
      description: `${cafe.name}에서 ${getTotalPrice().toLocaleString()}원 주문이 완료되었습니다.`,
    });
    setCart({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-hidden ${seniorMode ? 'senior-mode' : ''}`}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                {cafe.name}
              </DialogTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{cafe.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{cafe.distance}</span>
                </div>
                <Badge variant={cafe.isOpen ? "default" : "secondary"}>
                  <Clock className="h-3 w-3 mr-1" />
                  {cafe.isOpen ? '영업중' : '영업종료'}
                </Badge>
              </div>
            </div>
            {getTotalItems() > 0 && (
              <div className="text-right">
                <div className="text-sm text-gray-600">총 {getTotalItems()}개</div>
                <div className="text-lg font-bold text-amber-600">
                  {getTotalPrice().toLocaleString()}원
                </div>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* 카테고리 선택 */}
          <div className="flex gap-2 mb-4 border-b pb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-amber-600 to-orange-600" 
                  : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* 메뉴 목록 */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <span className="font-bold text-amber-600">
                          {item.price.toLocaleString()}원
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {item.isZero && (
                            <Badge variant="outline" className="text-xs">제로</Badge>
                          )}
                          {item.hasAlternativeMilk && (
                            <Badge variant="outline" className="text-xs">대체우유</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {cart[item.id] > 0 && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {cart[item.id]}
                              </span>
                            </>
                          )}
                          <Button
                            size="sm"
                            onClick={() => addToCartLocal(item.id)}
                            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주문 버튼 */}
          <div className="border-t pt-4 mt-4">
            <Button
              onClick={handleOrder}
              disabled={getTotalItems() === 0}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {getTotalItems() > 0 
                ? `${getTotalPrice().toLocaleString()}원 주문하기 (${getTotalItems()}개)`
                : "상품을 선택해주세요"
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CafeMenuModal;
