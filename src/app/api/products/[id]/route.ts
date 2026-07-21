import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { VALID_SUNLIGHTS, VALID_DIFFICULTIES, VALID_STATUSES, VALID_FLOWER_TYPES, VALID_FLOWER_COLORS } from '@/lib/constants';

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
} catch (error) {
  console.error('GET /api/products error:', error);
  return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
}
}

export async function PUT(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (data.sunlightRequirement && data.sunlightRequirement !== "" && !VALID_SUNLIGHTS.includes(data.sunlightRequirement)) {
      return NextResponse.json({ error: 'Invalid sunlight requirement' }, { status: 400 });
    }
    if (data.difficulty && data.difficulty !== "" && !VALID_DIFFICULTIES.includes(data.difficulty)) {
      return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 });
    }
    if (data.status && data.status !== "" && !VALID_STATUSES.includes(data.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    if (data.flowerType && data.flowerType !== "" && !VALID_FLOWER_TYPES.includes(data.flowerType)) {
      return NextResponse.json({ error: 'Invalid flower type' }, { status: 400 });
    }
    if (data.flowerColor && data.flowerColor !== "" && !VALID_FLOWER_COLORS.includes(data.flowerColor)) {
      return NextResponse.json({ error: 'Invalid flower color' }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        price: data.price !== undefined ? parseFloat(data.price) : undefined,
        categoryId: data.categoryId,
        scientificName: data.scientificName,
        description: data.description,
        shortDescription: data.shortDescription,
        discountPrice: data.discountPrice ? parseFloat(data.discountPrice) : null,
        stock: data.stock !== undefined ? parseInt(data.stock) : undefined,
        flowerColor: data.flowerColor === "" ? null : data.flowerColor,
        flowerType: data.flowerType === "" ? null : data.flowerType,
        sunlightRequirement: data.sunlightRequirement === "" ? null : data.sunlightRequirement,
        wateringFrequency: data.wateringFrequency === "" ? null : data.wateringFrequency,
        difficulty: data.difficulty === "" ? null : data.difficulty,
        bloomSeason: data.bloomSeason,
        fertilizerRecommendation: data.fertilizerRecommendation,
        plantHeight: data.plantHeight,
        potSize: data.potSize,
        isFeatured: data.isFeatured,
        images: data.images,
        tags: data.tags,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        status: data.status
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const archivedProduct = await prisma.product.update({
      where: { id },
      data: { status: 'ARCHIVED' }
    });

    return NextResponse.json(archivedProduct);
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to archive product' }, { status: 500 });
  }
}
