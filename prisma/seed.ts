import { PrismaClient } from '../src/generated/prisma/client';
import { adeniumsData } from '../src/data/adeniums';

import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Ensure a category exists
  let category = await prisma.plantCategory.findFirst({
    where: { name: 'Adeniums' }
  });

  if (!category) {
    category = await prisma.plantCategory.create({
      data: {
        name: 'Adeniums',
        description: 'Premium collection of rare adeniums.',
      }
    });
  }

  console.log(`Seeding ${adeniumsData.length} adeniums...`);

  for (const adenium of adeniumsData) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: adenium.id }
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          name: adenium.name,
          slug: adenium.id,
          price: 50.00, // Default mock price
          stock: 10,    // Default stock
          categoryId: category.id,
          description: adenium.description,
          shortDescription: adenium.description,
          bloomSeason: adenium.bloomSeason,
          images: [adenium.image], // e.g., /p29.jpeg
          status: 'PUBLISHED',
          isFeatured: false,
          flowerColor: 'Multi-color',
          flowerType: 'Single'
        }
      });
      console.log(`Created: ${adenium.name}`);
    }
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
