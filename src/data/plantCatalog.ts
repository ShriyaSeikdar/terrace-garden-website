// This file is the canonical source for the initial Adenium products.
// It is used to seed the database while preserving existing information.

export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type SunlightRequirement = 'FULL_SUN' | 'PARTIAL_SUN' | 'SHADE';

export interface PlantCatalogItem {
  slug: string;
  name: string;
  scientificName?: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  flowerColor?: string;
  flowerType?: string;
  sunlightRequirement?: SunlightRequirement;
  wateringFrequency?: string;
  bloomSeason?: string;
  fertilizerRecommendation?: string;
  potSize?: string;
  isFeatured: boolean;
  images: string[];
  tags: string[];
  status: ProductStatus;
}

export const plantCatalog: PlantCatalogItem[] = [
  {
    "slug": "adenium-obesum-black-velvet",
    "name": "Adenium obesum 'Black Velvet'",
    "scientificName": "Adenium obesum",
    "description": "Rare velvety black-maroon petals highlighted with vivid magenta edges.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring & Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p29.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-obesum-double-candy-swirl",
    "name": "Adenium obesum 'Double Candy Swirl'",
    "scientificName": "Adenium obesum",
    "description": "Elegant double blooms blending creamy white and vibrant rose-pink hues.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p2.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-obesum-double-pink-picotee",
    "name": "Adenium obesum 'Double Pink Picotee",
    "scientificName": "Adenium obesum",
    "description": "Frilled double flowers with bright pink petals and delicate white margins.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Late Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p3.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-crimson-eclipse",
    "name": "Adenium 'Crimson Eclipse'",
    "scientificName": "Adenium obesum",
    "description": "Deep velvety crimson petals with an enchanting near-black finish.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring to Fall",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p4.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-ros-halo",
    "name": "Adenium 'Rosé Halo'",
    "scientificName": "Adenium obesum",
    "description": "Soft blush-pink blooms accented with vivid magenta edges and a radiant center.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p5.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-ivory-elegance",
    "name": "Adenium 'Ivory Elegance'",
    "scientificName": "Adenium obesum",
    "description": "Pure ivory-white ruffled flowers that exude timeless grace and sophistication.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p6.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-purple-haze",
    "name": "Adenium 'Purple Haze'",
    "scientificName": "Adenium obesum",
    "description": "Rich violet-purple blooms with a glowing pink throat and velvety petals.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer & Fall",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p7.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-burgundy-lace",
    "name": "Adenium 'Burgundy Lace'",
    "scientificName": "Adenium obesum",
    "description": "Intricately layered cream petals adorned with dramatic burgundy streaks.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p8.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-snow-angel",
    "name": "Adenium 'Snow Angel'",
    "scientificName": "Adenium obesum",
    "description": "Elegant white double blooms accented with delicate raspberry-pink splashes.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p9.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-pink-pinwheel",
    "name": "Adenium 'Pink Pinwheel'",
    "scientificName": "Adenium obesum",
    "description": "Graceful white blooms highlighted by bold pink pinwheel stripes.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p10.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-royal-marble",
    "name": "Adenium 'Royal Marble'",
    "scientificName": "Adenium obesum",
    "description": "Luxurious double flowers with marbled magenta streaks on creamy white petals.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Late Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p11.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-red-velvet",
    "name": "Adenium 'Red Velvet'",
    "scientificName": "Adenium obesum",
    "description": "Brilliant crimson blooms with a velvety texture and luminous center.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p12.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-pink-stardust",
    "name": "Adenium 'Pink Stardust'",
    "scientificName": "Adenium obesum",
    "description": "Soft blush-pink petals adorned with striking ruby star-shaped markings.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer to Fall",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p13.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-apricot-blush",
    "name": "Adenium 'Apricot Blush'",
    "scientificName": "Adenium obesum",
    "description": "Delicate apricot blooms enhanced with fine raspberry veining.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p14.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-snow-pearl",
    "name": "Adenium 'Snow Pearl'",
    "scientificName": "Adenium obesum",
    "description": "Pure white double blooms with elegant layered petals and timeless beauty.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p15.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-rosette-charm",
    "name": "Adenium 'Rosette Charm'",
    "scientificName": "Adenium obesum",
    "description": "Neatly layered pink blooms with crisp crimson-edged petals.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "All Year",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p16.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-white-ruffles",
    "name": "Adenium 'White Ruffles'",
    "scientificName": "Adenium obesum",
    "description": "Ruffled ivory blooms finished with delicate rose-pink picotee edges.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p17.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-white-delight",
    "name": "Adenium 'White Delight'",
    "scientificName": "Adenium obesum",
    "description": "Abundant clusters of pristine white flowers with soft golden throats.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p18.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-snow-queen",
    "name": "Adenium 'Snow Queen'",
    "scientificName": "Adenium obesum",
    "description": "Magnificent double white blooms with gentle blush accents and rich layering.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Late Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p19.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-ruby-star",
    "name": "Adenium 'Ruby Star'",
    "scientificName": "Adenium obesum",
    "description": "Vivid ruby-red flowers featuring bright white star-shaped centers.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Fall",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p20.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-pink-duchess",
    "name": "Adenium 'Pink Duchess'",
    "scientificName": "Adenium obesum",
    "description": "Graceful rose-pink double blooms with softly ruffled petals.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p21.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-scarlet-splash",
    "name": "Adenium 'Scarlet Splash'",
    "scientificName": "Adenium obesum",
    "description": "Bold scarlet blooms accented by striking white splashes and deep crimson throats.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p22.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-picotee-star",
    "name": "Adenium 'Picotee Star'",
    "scientificName": "Adenium obesum",
    "description": "Elegant ivory flowers outlined with crimson picotee edges and vibrant centers.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p23.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-royal-ruffles",
    "name": "Adenium 'Royal Ruffles'",
    "scientificName": "Adenium obesum",
    "description": "Lush clusters of ruffled pink blooms with dramatic white marbling.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Fall",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p24.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-crimson-glory",
    "name": "Adenium 'Crimson Glory'",
    "scientificName": "Adenium obesum",
    "description": "Showy crimson-red flowers with glowing white highlights and a golden throat.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Late Summer to Fall",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p25.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-ivory-rose",
    "name": "Adenium 'Ivory Rose'",
    "scientificName": "Adenium obesum",
    "description": "Creamy ivory double blooms with soft buttery-yellow centers.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring & Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p26.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-pink-glamour",
    "name": "Adenium 'Pink Glamour'",
    "scientificName": "Adenium obesum",
    "description": "Elegant double pink blooms with delicately layered, ruffled petals.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p27.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-obesum-double-peach-splash",
    "name": "Adenium obesum 'Double Peach Splash'",
    "scientificName": "Adenium obesum",
    "description": "Ruffled double blooms blending peach, pink, and creamy white shades.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p28.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-obesum-pink-star",
    "name": "Adenium obesum 'Pink Star'",
    "scientificName": "Adenium obesum",
    "description": "Vibrant pink flowers with crisp white streaks and a rich crimson center.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Spring",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p1.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-obesum-pink-picotee",
    "name": "Adenium obesum 'Pink Picotee'",
    "scientificName": "Adenium obesum",
    "description": "Bright pink blooms beautifully outlined with bold white-edged petals.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p30.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  },
  {
    "slug": "adenium-obseum-double-pink-white",
    "name": "Adenium Obseum 'Double Pink-White",
    "scientificName": "Adenium obesum",
    "description": "Striking double blooms with deep magenta petals edged in crisp white.",
    "price": 50,
    "stock": 10,
    "category": "Adeniums",
    "flowerColor": "Multi-color",
    "flowerType": "Single",
    "sunlightRequirement": "FULL_SUN",
    "wateringFrequency": "Once a week",
    "bloomSeason": "Summer",
    "fertilizerRecommendation": "Balanced liquid fertilizer during active growth",
    "potSize": "6 inch",
    "isFeatured": false,
    "images": [
      "/p31.jpeg"
    ],
    "tags": [
      "Adenium",
      "Desert Rose"
    ],
    "status": "PUBLISHED"
  }
];
