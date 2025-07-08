import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
              <li key={index} className="text-sm text-foreground px-2 py-1">
                {metal}
              </li>
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
              <li key={index} className="text-sm text-foreground px-2 py-1">
                {wood}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialImages;