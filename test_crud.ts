import { POST } from './src/app/api/products/route';
import { PUT, DELETE } from './src/app/api/products/[id]/route';
import { prisma } from './src/lib/prisma';

async function run() {
  console.log('Testing CRUD operations...');
  
  // 1. Get a category ID
  const category = await prisma.plantCategory.findFirst();
  if (!category) {
    console.log('No category found, creating one...');
    await prisma.plantCategory.create({ data: { name: 'Test Category', description: 'Test' } });
  }
  const categoryId = (await prisma.plantCategory.findFirst())!.id;

  // 2. Test Create (POST)
  const reqBody = {
    name: 'Test Product',
    slug: 'test-product-' + Date.now(),
    price: 29.99,
    categoryId,
    sunlightRequirement: 'FULL_SUN',
    difficulty: 'BEGINNER',
    flowerColor: 'Red',
    flowerType: 'Single',
    status: 'PUBLISHED'
  };

  const req = new Request('http://localhost/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody)
  });

  const postRes = await POST(req);
  const postData = await postRes.json();
  console.log('POST Response:', postRes.status, postData);
  
  if (postRes.status !== 201) throw new Error('Create failed');
  const productId = postData.id;

  // 3. Test Edit (PUT)
  const putBody = {
    name: 'Test Product Edited',
    sunlightRequirement: 'SHADE', // change enum
    difficulty: '', // unset enum (should become null or untouched if undefined, but "" sets to null)
    price: 39.99
  };

  const putReq = new Request(`http://localhost/api/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(putBody)
  });

  const putRes = await PUT(putReq, { params: Promise.resolve({ id: productId }) });
  const putData = await putRes.json();
  console.log('PUT Response:', putRes.status, putData);

  if (putRes.status !== 200 || putData.sunlightRequirement !== 'SHADE' || putData.difficulty !== null) {
    throw new Error('Edit failed');
  }

  // 4. Test Archive (DELETE)
  const delReq = new Request(`http://localhost/api/products/${productId}`, {
    method: 'DELETE'
  });

  const delRes = await DELETE(delReq, { params: Promise.resolve({ id: productId }) });
  const delData = await delRes.json();
  console.log('DELETE Response:', delRes.status, delData);

  if (delRes.status !== 200 || delData.status !== 'ARCHIVED') {
    throw new Error('Archive failed');
  }

  console.log('All CRUD tests passed successfully!');
}

run().catch(console.error).finally(() => process.exit(0));
