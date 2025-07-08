import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StyleDetailsProps {
  style: string;
  characteristics: string[];
  designTips: string[];
  metals: string[];
  woodFinishes: string[];
  colorPalette: string[];
}

const StyleDetails: React.FC<StyleDetailsProps> = ({ style, characteristics, designTips, metals, woodFinishes, colorPalette }) => {
  const histories: Record<string, string> = {
    "French Country": "Originating in the French countryside during the 17th-18th centuries, this style emerged from rural farmhouses and provincial homes. It reflects the rustic elegance of French rural life, emphasizing natural materials, soft colors, and romantic details that create warm, inviting spaces.",
    "Japandi": "A contemporary fusion of Japanese minimalism and Scandinavian hygge, emerging in the 2010s. This style combines the Japanese philosophy of wabi-sabi (finding beauty in imperfection) with Scandinavian functionality and coziness, creating serene, uncluttered living spaces.",
    "Modern Farmhouse": "Popularized in the early 2000s by designers like Joanna Gaines, this style reimagines traditional American farmhouse design with contemporary elements. It blends rustic charm with modern conveniences, featuring clean lines, neutral colors, and natural materials.",
    "Bohemian": "Rooted in the 19th-century Bohemian movement of artists and writers, this style celebrates creativity and nonconformity. It embraces eclectic mixing of patterns, textures, and cultural influences, creating spaces that reflect individual expression and worldly experiences.",
    "Mid Century Modern": "Developed from 1945-1965, this style emerged post-WWII as architects like Eames and Saarinen created furniture emphasizing clean lines, functionality, and integration with nature. It represents optimism and forward-thinking design of the atomic age.",
    "Traditional": "Drawing from 18th and 19th-century European design, this timeless style emphasizes classic proportions, rich fabrics, and quality craftsmanship. It reflects centuries of refined taste and elegant living, creating sophisticated, comfortable spaces.",
    "Modern Minimalist": "Influenced by the Bauhaus movement and Japanese aesthetics, this style gained popularity in the 1960s-70s. It follows the principle 'less is more,' focusing on essential elements, clean lines, and functional beauty in uncluttered spaces.",
    "Transitional": "Emerging in the 1990s, this style bridges traditional and contemporary design. It combines the comfort of classic elements with the clean lines of modern design, creating timeless spaces that feel both familiar and fresh."
  };

  return (
    <>
      <div className="mb-6 flex justify-center">
        <img 
          src="/placeholder.svg" 
          alt="Design Style Illustration" 
          className="w-full max-w-md h-48 object-cover rounded-lg shadow-md"
        />
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            Style History & Key Characteristics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-4">
            {histories[style] || "A timeless design style with rich historical roots."}
          </p>
          
          <div className="mt-4 mb-6">
            <h4 className="text-lg font-semibold mb-3 text-foreground">Key Characteristics:</h4>
            <ul className="space-y-2">
              {characteristics.map((char, index) => (
                <li key={index} className="text-foreground flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 text-foreground">Design & Décor Tips:</h4>
            <ul className="space-y-2">
              {designTips.map((tip, index) => (
                <li key={index} className="text-foreground flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 text-foreground">Color Palette:</h4>
            <div className="flex flex-wrap gap-2">
              {colorPalette.map((color, index) => (
                <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm">
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-foreground">Metal Finishes:</h4>
              <div className="flex flex-wrap gap-2">
                {metals.map((metal, index) => (
                  <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                    {metal}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-foreground">Wood Finishes:</h4>
              <div className="flex flex-wrap gap-2">
                {woodFinishes.map((wood, index) => (
                  <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                    {wood}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StyleDetails;