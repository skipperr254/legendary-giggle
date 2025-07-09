import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaterialImage } from '@/hooks/use-media';

interface MaterialItemProps {
  name: string;
  type: 'wood' | 'metal';
}

const MaterialItem: React.FC<MaterialItemProps> = ({ name, type }) => {
  const { imageUrl, loading } = useMaterialImage(type, name);

  return (
    <li className="flex items-center space-x-3 text-sm text-foreground px-2 py-1">
      <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        ) : (
          <img
            src={imageUrl}
            alt={`${name} ${type}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        )}
      </div>
      <span>{name}</span>
    </li>
  );
};

interface MaterialImagesProps {
  metals: string[];
  woodFinishes: string[];
}

const MaterialImages: React.FC<MaterialImagesProps> = ({ metals, woodFinishes }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            Metal Finishes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {metals.map((metal, index) => (
              <MaterialItem key={index} name={metal} type="metal" />
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            Wood Finishes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {woodFinishes.map((wood, index) => (
              <MaterialItem key={index} name={wood} type="wood" />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialImages;