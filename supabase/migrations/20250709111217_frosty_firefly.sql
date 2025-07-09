/*
  # Seed Initial Data

  This migration populates the database with initial data for:
  1. Room Types
  2. Design Styles
  3. Quiz Questions
  4. Media Files (references to your Supabase Storage)
*/

-- Insert Room Types
INSERT INTO room_types (name, slug, description, sort_order) VALUES
('Kitchen', 'kitchen', 'Kitchen spaces and cooking areas', 1),
('Living Room', 'living-room', 'Main living and entertainment spaces', 2),
('Dining Room', 'dining-room', 'Formal and casual dining areas', 3),
('Primary Bedroom', 'primary-bedroom', 'Master bedroom and sleeping areas', 4),
('Primary Bathroom', 'primary-bathroom', 'Master bathroom and spa areas', 5),
('Home Office', 'home-office', 'Work and study spaces', 6),
('Entryway', 'entryway', 'Foyer and entrance areas', 7),
('Outdoor Patio', 'outdoor-patio', 'Outdoor living and entertainment spaces', 8),
('Lifestyle', 'lifestyle', 'General lifestyle and preference questions', 9)
ON CONFLICT (name) DO NOTHING;

-- Insert Design Styles
INSERT INTO design_styles (name, slug, description, characteristics, design_tips, color_palette) VALUES
(
  'French Country',
  'french-country',
  'You''re drawn to the romantic charm of French countryside living, where every element tells a story of timeless elegance and rustic sophistication. Your style embraces the gentle beauty of Provence with its soft, weathered textures and vintage treasures that have been lovingly collected over time.',
  ARRAY['Soft Pastels', 'Vintage Furniture', 'Natural Textures', 'Romantic Details', 'Rustic Elegance'],
  ARRAY['Layer vintage linens and lace for romantic texture', 'Use distressed paint techniques on furniture for authentic aging', 'Display fresh flowers in vintage pitchers and mason jars', 'Incorporate toile patterns in fabrics and wallpaper', 'Add wrought iron accents through lighting and hardware', 'Create cozy reading nooks with vintage armchairs'],
  ARRAY['Soft Cream', 'Lavender', 'Sage Green', 'Dusty Rose', 'Warm White']
),
(
  'Japandi',
  'japandi',
  'You appreciate the perfect harmony between Japanese minimalism and Scandinavian functionality, creating spaces that breathe with intentional simplicity and natural beauty. Your style reflects a deep understanding of the balance between form and function.',
  ARRAY['Natural Materials', 'Clean Lines', 'Neutral Palette', 'Functional Design', 'Zen Atmosphere'],
  ARRAY['Choose furniture with clean, simple lines and natural wood', 'Keep surfaces clutter-free with hidden storage solutions', 'Use natural textiles like linen and cotton in neutral tones', 'Incorporate plants for a connection to nature', 'Focus on quality over quantity in furniture selection', 'Create meditation spaces with floor cushions and low tables'],
  ARRAY['Warm White', 'Soft Beige', 'Charcoal Gray', 'Natural Linen', 'Muted Green']
),
(
  'Modern Farmhouse',
  'modern-farmhouse',
  'You love the perfect marriage of rustic charm and contemporary comfort, creating spaces that honor traditional farmhouse heritage while embracing modern conveniences and clean aesthetics.',
  ARRAY['Rustic Charm', 'Modern Comfort', 'Natural Wood', 'White & Neutral Tones', 'Cozy Atmosphere'],
  ARRAY['Install shiplap walls for authentic farmhouse texture', 'Use barn doors as room dividers or closet doors', 'Display mason jars and galvanized metal accessories', 'Create open shelving with reclaimed wood brackets', 'Add farmhouse sinks with vintage-style faucets', 'Layer cozy throws and pillows in natural fabrics'],
  ARRAY['Pure White', 'Warm Gray', 'Navy Blue', 'Cream', 'Soft Black']
),
(
  'Bohemian',
  'bohemian',
  'You embrace creativity and self-expression through eclectic design that celebrates the beauty of cultural diversity and artistic freedom. Your style is a vibrant tapestry of global influences.',
  ARRAY['Bold Patterns', 'Rich Textures', 'Global Influences', 'Layered Textiles', 'Artistic Expression'],
  ARRAY['Layer multiple rugs with different patterns and textures', 'Hang tapestries and macramé wall hangings', 'Mix vintage and global furniture pieces', 'Use floor cushions and poufs for flexible seating', 'Display collections of art, books, and travel souvenirs', 'Create cozy corners with string lights and plants'],
  ARRAY['Deep Burgundy', 'Burnt Orange', 'Rich Teal', 'Golden Yellow', 'Warm Terracotta']
),
(
  'Mid Century Modern',
  'mid-century-modern',
  'You''re inspired by the revolutionary design movement of the 1950s and 60s, where form follows function in the most elegant way possible. Your style celebrates the optimistic spirit of the post-war era.',
  ARRAY['Clean Lines', 'Geometric Shapes', 'Warm Woods', 'Bold Colors', 'Functional Beauty'],
  ARRAY['Choose furniture with tapered legs and geometric forms', 'Add starburst mirrors and atomic-inspired lighting', 'Use bold accent colors like orange, teal, and mustard', 'Display vintage ceramics and sculptural objects', 'Install built-in storage with clean, simple hardware', 'Create conversation areas with low-profile seating'],
  ARRAY['Avocado Green', 'Burnt Orange', 'Mustard Yellow', 'Chocolate Brown', 'Cream']
),
(
  'Coastal',
  'coastal',
  'You''re inspired by the relaxed elegance of seaside living, where ocean breezes and natural light create an atmosphere of effortless tranquility.',
  ARRAY['Ocean-Inspired Colors', 'Natural Textures', 'Weathered Finishes', 'Nautical Elements', 'Relaxed Elegance'],
  ARRAY['Use weathered wood and driftwood accents throughout', 'Display seashells, coral, and ocean-inspired artwork', 'Choose furniture with relaxed, casual silhouettes', 'Add rope details and nautical hardware', 'Layer natural textiles like linen and jute', 'Create outdoor living spaces with comfortable seating'],
  ARRAY['Ocean Blue', 'Sandy Beige', 'Seafoam Green', 'Coral Pink', 'Crisp White']
),
(
  'Industrial',
  'industrial',
  'You''re drawn to the raw beauty of urban environments and the honest expression of materials in their most authentic form. Your style celebrates the heritage of industrial architecture.',
  ARRAY['Raw Materials', 'Exposed Elements', 'Metal Accents', 'Urban Aesthetic', 'Functional Beauty'],
  ARRAY['Expose brick walls and concrete surfaces', 'Use metal pipe shelving and industrial lighting', 'Choose furniture with steel frames and leather upholstery', 'Display vintage industrial artifacts and machinery', 'Add Edison bulb lighting and metal pendant fixtures', 'Create open floor plans with minimal room divisions'],
  ARRAY['Charcoal Gray', 'Rust Orange', 'Deep Black', 'Warm Brown', 'Industrial White']
),
(
  'Transitional',
  'transitional',
  'You masterfully navigate the bridge between traditional comfort and contemporary sophistication, creating spaces that honor the past while embracing the present.',
  ARRAY['Classic Comfort', 'Modern Sophistication', 'Neutral Palette', 'Balanced Design', 'Timeless Appeal'],
  ARRAY['Mix traditional and contemporary furniture pieces', 'Use neutral colors as a base with subtle pattern accents', 'Combine different textures like linen, leather, and wood', 'Add both classic and modern lighting fixtures', 'Create symmetrical arrangements with asymmetrical accents', 'Layer accessories in varying heights and materials'],
  ARRAY['Warm Gray', 'Soft White', 'Taupe', 'Sage Green', 'Cream']
)
ON CONFLICT (name) DO NOTHING;

-- Insert Quiz Questions
INSERT INTO quiz_questions (question_text, room_type_id, sort_order) VALUES
('Which kitchen style can you envision yourself in?', (SELECT id FROM room_types WHERE slug = 'kitchen'), 1),
('Which living room style speaks to you?', (SELECT id FROM room_types WHERE slug = 'living-room'), 2),
('Which dining room style can you see yourself enjoying meals in?', (SELECT id FROM room_types WHERE slug = 'dining-room'), 3),
('Which primary bedroom style would make you feel most at home?', (SELECT id FROM room_types WHERE slug = 'primary-bedroom'), 4),
('Which primary bathroom style appeals to you most?', (SELECT id FROM room_types WHERE slug = 'primary-bathroom'), 5),
('Which home office style would inspire your productivity?', (SELECT id FROM room_types WHERE slug = 'home-office'), 6),
('Which entryway style would welcome you home?', (SELECT id FROM room_types WHERE slug = 'entryway'), 7),
('Which outdoor patio style would be your perfect retreat?', (SELECT id FROM room_types WHERE slug = 'outdoor-patio'), 8),
('Which color palette do you prefer?', (SELECT id FROM room_types WHERE slug = 'lifestyle'), 9),
('Which chair would you like to relax in?', (SELECT id FROM room_types WHERE slug = 'lifestyle'), 10),
('Which door handle would you choose for your home?', (SELECT id FROM room_types WHERE slug = 'lifestyle'), 11)
ON CONFLICT DO NOTHING;

-- Insert Style Materials (Wood finishes)
INSERT INTO style_materials (style_id, material_type, material_name, sort_order) VALUES
-- French Country
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'wood', 'Distressed White', 1),
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'wood', 'Natural Oak', 2),
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'wood', 'Weathered Pine', 3),
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'wood', 'Antique Walnut', 4),
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'metal', 'Aged Brass', 1),
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'metal', 'Wrought Iron', 2),
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'metal', 'Antique Bronze', 3),
((SELECT id FROM design_styles WHERE slug = 'french-country'), 'metal', 'Pewter', 4),

-- Japandi
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'wood', 'Light Ash', 1),
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'wood', 'Natural Birch', 2),
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'wood', 'Blonde Oak', 3),
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'wood', 'Untreated Pine', 4),
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'metal', 'Matte Black', 1),
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'metal', 'Brushed Steel', 2),
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'metal', 'Natural Copper', 3),
((SELECT id FROM design_styles WHERE slug = 'japandi'), 'metal', 'Raw Iron', 4),

-- Modern Farmhouse
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'wood', 'Reclaimed Barn Wood', 1),
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'wood', 'White Wash', 2),
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'wood', 'Natural Cedar', 3),
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'wood', 'Rustic Pine', 4),
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'metal', 'Matte Black', 1),
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'metal', 'Galvanized Steel', 2),
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'metal', 'Oil-Rubbed Bronze', 3),
((SELECT id FROM design_styles WHERE slug = 'modern-farmhouse'), 'metal', 'Brushed Nickel', 4),

-- Bohemian
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'wood', 'Dark Walnut', 1),
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'wood', 'Mahogany', 2),
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'wood', 'Teak', 3),
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'wood', 'Reclaimed Exotic Woods', 4),
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'metal', 'Antique Brass', 1),
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'metal', 'Copper', 2),
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'metal', 'Bronze', 3),
((SELECT id FROM design_styles WHERE slug = 'bohemian'), 'metal', 'Gold Accents', 4),

-- Mid Century Modern
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'wood', 'Walnut', 1),
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'wood', 'Teak', 2),
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'wood', 'Rosewood', 3),
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'wood', 'Cherry', 4),
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'metal', 'Brass', 1),
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'metal', 'Chrome', 2),
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'metal', 'Stainless Steel', 3),
((SELECT id FROM design_styles WHERE slug = 'mid-century-modern'), 'metal', 'Copper', 4),

-- Coastal
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'wood', 'Weathered Gray', 1),
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'wood', 'Driftwood', 2),
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'wood', 'Whitewashed Pine', 3),
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'wood', 'Natural Teak', 4),
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'metal', 'Weathered Brass', 1),
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'metal', 'Brushed Nickel', 2),
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'metal', 'Rope Accents', 3),
((SELECT id FROM design_styles WHERE slug = 'coastal'), 'metal', 'Driftwood Hardware', 4),

-- Industrial
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'wood', 'Reclaimed Barn Wood', 1),
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'wood', 'Dark Walnut', 2),
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'wood', 'Raw Pine', 3),
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'wood', 'Charred Oak', 4),
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'metal', 'Raw Steel', 1),
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'metal', 'Black Iron', 2),
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'metal', 'Copper Pipe', 3),
((SELECT id FROM design_styles WHERE slug = 'industrial'), 'metal', 'Galvanized Metal', 4),

-- Transitional
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'wood', 'Medium Oak', 1),
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'wood', 'Honey Maple', 2),
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'wood', 'Warm Cherry', 3),
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'wood', 'Natural Ash', 4),
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'metal', 'Brushed Nickel', 1),
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'metal', 'Satin Brass', 2),
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'metal', 'Oil-Rubbed Bronze', 3),
((SELECT id FROM design_styles WHERE slug = 'transitional'), 'metal', 'Polished Chrome', 4);