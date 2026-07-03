import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q');
  const category = searchParams.get('category');
  const color = searchParams.get('color');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const availability = searchParams.get('availability');
  const sunlight = searchParams.get('sunlight');
  const difficulty = searchParams.get('difficulty');
  const flowerType = searchParams.get('flowerType');
  const featured = searchParams.get('featured');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    status: { not: 'ARCHIVED' }
  };

  if (search && search.length >= 2) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { scientificName: { contains: search, mode: 'insensitive' } },
      { shortDescription: { contains: search, mode: 'insensitive' } },
      { tags: { has: search } }
    ];
  }

  if (category) {
    where.categoryId = category;
  }
  
  if (color) {
    where.flowerColor = color;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  if (availability === 'In Stock') {
    where.stock = { gt: 0 };
  } else if (availability === 'Out of Stock') {
    where.stock = { equals: 0 };
  }

  if (sunlight) {
    where.sunlightRequirement = sunlight as any;
  }

  if (difficulty) {
    where.difficulty = difficulty as any;
  }

  if (flowerType) {
    where.flowerType = flowerType;
  }

  if (featured === 'true') {
    where.isFeatured = true;
  }

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { category: true }
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.slug || !data.price || !data.categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        price: parseFloat(data.price),
        categoryId: data.categoryId,
        scientificName: data.scientificName,
        description: data.description,
        shortDescription: data.shortDescription,
        discountPrice: data.discountPrice ? parseFloat(data.discountPrice) : null,
        stock: data.stock ? parseInt(data.stock) : 0,
        flowerColor: data.flowerColor,
        flowerType: data.flowerType,
        sunlightRequirement: data.sunlightRequirement,
        wateringFrequency: data.wateringFrequency,
        difficulty: data.difficulty,
        bloomSeason: data.bloomSeason,
        fertilizerRecommendation: data.fertilizerRecommendation,
        plantHeight: data.plantHeight,
        potSize: data.potSize,
        isFeatured: data.isFeatured || false,
        images: data.images || [],
        tags: data.tags || [],
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        status: data.status || 'DRAFT'
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
