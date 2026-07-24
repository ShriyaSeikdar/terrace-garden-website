import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { plantCatalog } from '../src/data/plantCatalog';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

async function main() {
  // We'll collect category IDs as we go to avoid querying for every product
  const categoryMap = new Map<string, string>();

  // Extract unique categories from catalog
  const categoryNames = [...new Set(plantCatalog.map(p => p.category))];

  for (const name of categoryNames) {
    const category = await prisma.plantCategory.upsert({
      where: { name },
      update: {},
      create: {
        name,
        description: `Collection of ${name}`,
      }
    });
    categoryMap.set(name, category.id);
  }

  console.log(`Seeding ${plantCatalog.length} products...`);

  for (const plant of plantCatalog) {
    const categoryId = categoryMap.get(plant.category);
    
    if (!categoryId) {
      console.error(`Category ID not found for ${plant.category}`);
      continue;
    }

    await prisma.product.upsert({
      where: { slug: plant.slug },
      update: {
        name: plant.name,
        scientificName: plant.scientificName,
        description: plant.description,
        price: plant.price,
        stock: plant.stock,
        categoryId: categoryId,
        flowerColor: plant.flowerColor,
        flowerType: plant.flowerType,
        sunlightRequirement: plant.sunlightRequirement,
        wateringFrequency: plant.wateringFrequency,
        bloomSeason: plant.bloomSeason,
        fertilizerRecommendation: plant.fertilizerRecommendation,
        potSize: plant.potSize,
        isFeatured: plant.isFeatured,
        images: plant.images,
        tags: plant.tags,
        status: plant.status,
      },
      create: {
        slug: plant.slug,
        name: plant.name,
        scientificName: plant.scientificName,
        description: plant.description,
        price: plant.price,
        stock: plant.stock,
        categoryId: categoryId,
        flowerColor: plant.flowerColor,
        flowerType: plant.flowerType,
        sunlightRequirement: plant.sunlightRequirement,
        wateringFrequency: plant.wateringFrequency,
        bloomSeason: plant.bloomSeason,
        fertilizerRecommendation: plant.fertilizerRecommendation,
        potSize: plant.potSize,
        isFeatured: plant.isFeatured,
        images: plant.images,
        tags: plant.tags,
        status: plant.status,
      }
    });
    console.log(`Upserted: ${plant.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
