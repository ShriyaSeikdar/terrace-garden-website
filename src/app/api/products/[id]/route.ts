import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const data = await request.json();

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
        flowerColor: data.flowerColor,
        flowerType: data.flowerType,
        sunlightRequirement: data.sunlightRequirement,
        wateringFrequency: data.wateringFrequency,
        difficulty: data.difficulty,
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
    console.error(error);
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
    return NextResponse.json({ error: 'Failed to archive product' }, { status: 500 });
  }
}
