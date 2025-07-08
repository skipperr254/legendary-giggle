export interface StyleResult {
  style: string;
  description: string;
  characteristics: string[];
  designTips: string[];
  metals: string[];
  woodFinishes: string[];
  colorPalette: string[];
}

export const getStyleFromOption = (option: string): string => {
  const styleMapping: Record<string, string> = {
    "Option A": "French Country",
    "Option B": "Japandi",
    "Option C": "Modern Farmhouse",
    "Option D": "Bohemian",
    "Option E": "Mid Century Modern",
    "Option F": "Coastal",
    "Option G": "Industrial",
    "Option H": "Transitional"
  };
  return styleMapping[option] || option;
};

export const styleResults: Record<string, StyleResult> = {
  "French Country": {
    style: "French Country",
    description: "You're drawn to the romantic charm of French countryside living, where every element tells a story of timeless elegance and rustic sophistication. Your style embraces the gentle beauty of Provence with its soft, weathered textures and vintage treasures that have been lovingly collected over time. This aesthetic celebrates the art of imperfection, where distressed finishes and naturally aged materials create an atmosphere of lived-in comfort and authentic charm that feels both welcoming and effortlessly refined.",
    characteristics: ["Soft Pastels", "Vintage Furniture", "Natural Textures", "Romantic Details", "Rustic Elegance"],
    designTips: ["Layer vintage linens and lace for romantic texture", "Use distressed paint techniques on furniture for authentic aging", "Display fresh flowers in vintage pitchers and mason jars", "Incorporate toile patterns in fabrics and wallpaper", "Add wrought iron accents through lighting and hardware", "Create cozy reading nooks with vintage armchairs"],
    metals: ["Aged Brass", "Wrought Iron", "Antique Bronze", "Pewter"],
    woodFinishes: ["Distressed White", "Natural Oak", "Weathered Pine", "Antique Walnut"],
    colorPalette: ["Soft Cream", "Lavender", "Sage Green", "Dusty Rose", "Warm White"]
  },
  "Japandi": {
    style: "Japandi",
    description: "You appreciate the perfect harmony between Japanese minimalism and Scandinavian functionality, creating spaces that breathe with intentional simplicity and natural beauty. Your style reflects a deep understanding of the balance between form and function, where every element serves a purpose while contributing to an overall sense of calm and tranquility. This aesthetic philosophy embraces the concept of 'less is more' through carefully selected natural materials, clean geometric lines, and a neutral palette that allows the mind to rest and the soul to find peace in uncluttered, thoughtfully designed environments.",
    characteristics: ["Natural Materials", "Clean Lines", "Neutral Palette", "Functional Design", "Zen Atmosphere"],
    designTips: ["Choose furniture with clean, simple lines and natural wood", "Keep surfaces clutter-free with hidden storage solutions", "Use natural textiles like linen and cotton in neutral tones", "Incorporate plants for a connection to nature", "Focus on quality over quantity in furniture selection", "Create meditation spaces with floor cushions and low tables"],
    metals: ["Matte Black", "Brushed Steel", "Natural Copper", "Raw Iron"],
    woodFinishes: ["Light Ash", "Natural Birch", "Blonde Oak", "Untreated Pine"],
    colorPalette: ["Warm White", "Soft Beige", "Charcoal Gray", "Natural Linen", "Muted Green"]
  },
  "Modern Farmhouse": {
    style: "Modern Farmhouse",
    description: "You love the perfect marriage of rustic charm and contemporary comfort, creating spaces that honor traditional farmhouse heritage while embracing modern conveniences and clean aesthetics. Your style celebrates the authenticity of rural living through reclaimed materials and time-worn textures, yet maintains the sophistication and functionality that today's lifestyle demands. This approach to design creates homes that feel both grounded in history and perfectly suited for contemporary family life, where cozy gatherings and everyday moments are elevated by thoughtful design choices that blend the best of past and present.",
    characteristics: ["Rustic Charm", "Modern Comfort", "Natural Wood", "White & Neutral Tones", "Cozy Atmosphere"],
    designTips: ["Install shiplap walls for authentic farmhouse texture", "Use barn doors as room dividers or closet doors", "Display mason jars and galvanized metal accessories", "Create open shelving with reclaimed wood brackets", "Add farmhouse sinks with vintage-style faucets", "Layer cozy throws and pillows in natural fabrics"],
    metals: ["Matte Black", "Galvanized Steel", "Oil-Rubbed Bronze", "Brushed Nickel"],
    woodFinishes: ["Reclaimed Barn Wood", "White Wash", "Natural Cedar", "Rustic Pine"],
    colorPalette: ["Pure White", "Warm Gray", "Navy Blue", "Cream", "Soft Black"]
  },
  "Bohemian": {
    style: "Bohemian",
    description: "You embrace creativity and self-expression through eclectic design that celebrates the beauty of cultural diversity and artistic freedom. Your style is a vibrant tapestry of global influences, where bold patterns dance with rich textures and every piece tells a story of adventure and discovery. This aesthetic philosophy rejects conformity in favor of personal expression, creating spaces that are as unique as the individuals who inhabit them. Through layered textiles, collected treasures, and an fearless approach to color and pattern, your bohemian style creates an environment that nurtures creativity and reflects a life lived with passion and authenticity.",
    characteristics: ["Bold Patterns", "Rich Textures", "Global Influences", "Layered Textiles", "Artistic Expression"],
    designTips: ["Layer multiple rugs with different patterns and textures", "Hang tapestries and macramé wall hangings", "Mix vintage and global furniture pieces", "Use floor cushions and poufs for flexible seating", "Display collections of art, books, and travel souvenirs", "Create cozy corners with string lights and plants"],
    metals: ["Antique Brass", "Copper", "Bronze", "Gold Accents"],
    woodFinishes: ["Dark Walnut", "Mahogany", "Teak", "Reclaimed Exotic Woods"],
    colorPalette: ["Deep Burgundy", "Burnt Orange", "Rich Teal", "Golden Yellow", "Warm Terracotta"]
  },
  "Mid Century Modern": {
    style: "Mid Century Modern",
    description: "You're inspired by the revolutionary design movement of the 1950s and 60s, where form follows function in the most elegant way possible. Your style celebrates the optimistic spirit of the post-war era through sleek lines, geometric shapes, and a fearless embrace of both bold colors and natural materials. This aesthetic represents a perfect balance between sophistication and accessibility, where furniture becomes sculptural art and every piece serves both practical and visual purposes. Your mid-century modern approach creates spaces that feel both nostalgic and timelessly contemporary, honoring the innovative designers who believed that good design should be beautiful, functional, and available to everyone.",
    characteristics: ["Clean Lines", "Geometric Shapes", "Warm Woods", "Bold Colors", "Functional Beauty"],
    designTips: ["Choose furniture with tapered legs and geometric forms", "Add starburst mirrors and atomic-inspired lighting", "Use bold accent colors like orange, teal, and mustard", "Display vintage ceramics and sculptural objects", "Install built-in storage with clean, simple hardware", "Create conversation areas with low-profile seating"],
    metals: ["Brass", "Chrome", "Stainless Steel", "Copper"],
    woodFinishes: ["Walnut", "Teak", "Rosewood", "Cherry"],
    colorPalette: ["Avocado Green", "Burnt Orange", "Mustard Yellow", "Chocolate Brown", "Cream"]
  },
  "Coastal": {
    style: "Coastal",
    description: "You're inspired by the relaxed elegance of seaside living, where ocean breezes and natural light create an atmosphere of effortless tranquility. Your style captures the essence of coastal beauty through weathered textures, nautical elements, and a palette inspired by sand, sea, and sky. This aesthetic celebrates the connection between indoor and outdoor living, where natural materials and casual comfort take precedence over formal arrangements. Your coastal design approach creates homes that feel like a permanent vacation, where every day brings the serenity and rejuvenation that comes from living in harmony with the natural rhythm of the ocean.",
    characteristics: ["Ocean-Inspired Colors", "Natural Textures", "Weathered Finishes", "Nautical Elements", "Relaxed Elegance"],
    designTips: ["Use weathered wood and driftwood accents throughout", "Display seashells, coral, and ocean-inspired artwork", "Choose furniture with relaxed, casual silhouettes", "Add rope details and nautical hardware", "Layer natural textiles like linen and jute", "Create outdoor living spaces with comfortable seating"],
    metals: ["Weathered Brass", "Brushed Nickel", "Rope Accents", "Driftwood Hardware"],
    woodFinishes: ["Weathered Gray", "Driftwood", "Whitewashed Pine", "Natural Teak"],
    colorPalette: ["Ocean Blue", "Sandy Beige", "Seafoam Green", "Coral Pink", "Crisp White"]
  },
  "Industrial": {
    style: "Industrial",
    description: "You're drawn to the raw beauty of urban environments and the honest expression of materials in their most authentic form. Your style celebrates the heritage of industrial architecture through exposed brick, steel beams, and concrete surfaces that tell stories of craftsmanship and utility. This aesthetic philosophy embraces the beauty found in function, where every element serves a purpose while contributing to an overall sense of strength and authenticity. Your industrial design approach creates spaces that feel both edgy and sophisticated, where the marriage of rough and refined materials results in environments that are uniquely modern and timelessly appealing.",
    characteristics: ["Raw Materials", "Exposed Elements", "Metal Accents", "Urban Aesthetic", "Functional Beauty"],
    designTips: ["Expose brick walls and concrete surfaces", "Use metal pipe shelving and industrial lighting", "Choose furniture with steel frames and leather upholstery", "Display vintage industrial artifacts and machinery", "Add Edison bulb lighting and metal pendant fixtures", "Create open floor plans with minimal room divisions"],
    metals: ["Raw Steel", "Black Iron", "Copper Pipe", "Galvanized Metal"],
    woodFinishes: ["Reclaimed Barn Wood", "Dark Walnut", "Raw Pine", "Charred Oak"],
    colorPalette: ["Charcoal Gray", "Rust Orange", "Deep Black", "Warm Brown", "Industrial White"]
  },
  "Transitional": {
    style: "Transitional",
    description: "You masterfully navigate the bridge between traditional comfort and contemporary sophistication, creating spaces that honor the past while embracing the present. Your style represents the perfect synthesis of classic elegance and modern functionality, where timeless design principles meet current lifestyle needs. This aesthetic approach allows you to enjoy the best of both worlds without being confined by the rules of either, resulting in environments that feel both familiar and fresh. Your transitional style creates homes that are effortlessly elegant and endlessly livable, where neutral palettes and balanced proportions provide a sophisticated backdrop that can evolve with changing tastes and trends while maintaining its essential appeal.",
    characteristics: ["Classic Comfort", "Modern Sophistication", "Neutral Palette", "Balanced Design", "Timeless Appeal"],
    designTips: ["Mix traditional and contemporary furniture pieces", "Use neutral colors as a base with subtle pattern accents", "Combine different textures like linen, leather, and wood", "Add both classic and modern lighting fixtures", "Create symmetrical arrangements with asymmetrical accents", "Layer accessories in varying heights and materials"],
    metals: ["Brushed Nickel", "Satin Brass", "Oil-Rubbed Bronze", "Polished Chrome"],
    woodFinishes: ["Medium Oak", "Honey Maple", "Warm Cherry", "Natural Ash"],
    colorPalette: ["Warm Gray", "Soft White", "Taupe", "Sage Green", "Cream"]
  }
};