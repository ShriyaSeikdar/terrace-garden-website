import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      featuredProducts,
      recentProducts
    ] = await Promise.all([
      prisma.product.count({ where: { status: { not: 'ARCHIVED' } } }),
      prisma.product.count({ where: { stock: { gt: 0 }, status: { not: 'ARCHIVED' } } }),
      prisma.product.count({ where: { stock: { equals: 0 }, status: { not: 'ARCHIVED' } } }),
      prisma.product.count({ where: { isFeatured: true, status: { not: 'ARCHIVED' } } }),
      prisma.product.findMany({
        where: { status: { not: 'ARCHIVED' } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { category: true }
      })
    ]);

    return NextResponse.json({
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      featuredProducts,
      recentProducts
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
