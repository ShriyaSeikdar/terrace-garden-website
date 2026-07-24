const fs = require('fs');

const content = fs.readFileSync('./src/data/adeniums.ts', 'utf-8');
const arrayMatch = content.match(/export const adeniumsData: Adenium\[\] = \[\s*([\s\S]*?)\s*\];/);
if (!arrayMatch) {
  console.error("Failed to find adeniumsData array");
  process.exit(1);
}

const arrayText = arrayMatch[1];
const adeniumsData = eval(`[${arrayText}]`);

function slugify(text) {
  return text.toLowerCase().replace(/['"“”‘’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const catalog = adeniumsData.map(a => {
  return {
    slug: slugify(a.name),
    name: a.name,
    scientificName: "Adenium obesum",
    description: a.description,
    price: 50.00,
    stock: 10,
    category: "Adeniums",
    flowerColor: "Multi-color", // Placeholder
    flowerType: "Single", // Placeholder
    sunlightRequirement: "FULL_SUN",
    wateringFrequency: "Once a week", // Placeholder
    bloomSeason: a.bloomSeason,
    fertilizerRecommendation: "Balanced liquid fertilizer during active growth",
    potSize: "6 inch",
    isFeatured: false,
    images: [a.image],
    tags: ["Adenium", "Desert Rose"],
    status: "PUBLISHED"
  };
});

const fileContent = `// This file is the canonical source for the initial Adenium products.
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

export const plantCatalog: PlantCatalogItem[] = ${JSON.stringify(catalog, null, 2)};
`;

fs.writeFileSync('./src/data/plantCatalog.ts', fileContent);
console.log("Successfully generated src/data/plantCatalog.ts");
