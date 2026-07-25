import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Fetching all products...');
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    if (product.images && product.images.length > 0) {
      const firstImage = String(product.images[0]);
      const match = firstImage.match(/p(\d+)\.je?pg/i);
      if (match) {
        const serialNumber = parseInt(match[1], 10);
        await prisma.product.update({
          where: { id: product.id },
          data: { serialNumber }
        });
        console.log("Mapped product " + product.name + " to serial number " + serialNumber);
      }
    }
  }
  
  console.log('Mapping complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
