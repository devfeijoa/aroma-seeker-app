
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Wifi, Zap } from 'lucide-react';

interface CafeCardProps {
  cafe: {
    id: string;
    name: string;
    image: string;
    rating: number;
    distance: string;
    isOpen: boolean;
    tags: string[];
    specialFeatures: string[];
    description: string;
  };
  seniorMode: boolean;
  onClick: () => void;
}

const CafeCard: React.FC<CafeCardProps> = ({ cafe, seniorMode, onClick }) => {
  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'wifi': return <Wifi className="h-3 w-3" />;
      case 'power': return <Zap className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-shadow ${seniorMode ? 'senior-mode' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="relative">
          <img 
            src={cafe.image} 
            alt={cafe.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={cafe.isOpen ? "default" : "secondary"}>
              <Clock className="h-3 w-3 mr-1" />
              {cafe.isOpen ? '영업중' : '영업종료'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{cafe.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{cafe.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{cafe.distance}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{cafe.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {cafe.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {cafe.specialFeatures.map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs flex items-center">
              {getFeatureIcon(feature)}
              <span className="ml-1">{feature}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CafeCard;
