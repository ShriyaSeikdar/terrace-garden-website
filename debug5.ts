import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      const match = firstImage.match(/p(\d+)\.je?pg/i);
       {
        console.log(JSON.stringify(firstImage));
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
