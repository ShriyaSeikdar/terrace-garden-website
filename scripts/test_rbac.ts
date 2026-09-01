import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import { signJWT, requireAdmin, getAuthenticatedUser } from '../src/lib/auth';
import { GET as adminDashboardGET } from '../src/app/api/admin/dashboard/route';
import { GET as productsGET, POST as productsPOST } from '../src/app/api/products/route';
import { GET as productGET, PUT as productPUT, DELETE as productDELETE } from '../src/app/api/products/[id]/route';
import { POST as registerPOST } from '../src/app/api/auth/register/route';

async function runRBACTests() {
  console.log('=== STARTING RBAC VERIFICATION SUITE ===\n');

  // Find or create test USER and test ADMIN in the database
  let testUser = await prisma.user.findFirst({ where: { role: 'USER' } });
  if (!testUser) {
    testUser = await prisma.user.create({
      data: {
        name: 'Test Regular User',
        email: 'regular_user_test@terracegarden.com',
        passwordHash: 'dummy_hash',
        role: 'USER',
        isVerified: true
      }
    });
  }

  let testAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!testAdmin) {
    testAdmin = await prisma.user.create({
      data: {
        name: 'Test Administrator',
        email: 'admin_user_test@terracegarden.com',
        passwordHash: 'dummy_hash',
        role: 'ADMIN',
        isVerified: true
      }
    });
  }

  console.log(`[Setup] Verified Regular USER: ${testUser.name} (${testUser.email}, role: ${testUser.role})`);
  console.log(`[Setup] Verified ADMIN: ${testAdmin.name} (${testAdmin.email}, role: ${testAdmin.role})\n`);

  // Generate tokens
  const userToken = await signJWT({ userId: testUser.id, passwordVersion: testUser.passwordVersion });
  const adminToken = await signJWT({ userId: testAdmin.id, passwordVersion: testAdmin.passwordVersion });

  function createMockRequest(url: string, method = 'GET', token?: string, body?: unknown) {
    const headers = new Headers();
    if (token) {
      headers.set('cookie', `tg-session=${token}`);
    }
    if (body) {
      headers.set('content-type', 'application/json');
    }
    return new Request(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  }

  // -------------------------------------------------------------
  // Test 1: Public Catalogue Accessibility (GET /api/products & GET /api/products/[id])
  // -------------------------------------------------------------
  console.log('--- TEST 1: Public Catalogue Routes (Must remain accessible without auth) ---');
  const publicReq = createMockRequest('http://localhost:3000/api/products');
  const publicRes = await productsGET(publicReq);
  console.log(`GET /api/products status: ${publicRes.status} (Expected: 200)`);
  if (publicRes.status !== 200) throw new Error('Public catalogue GET failed!');

  const anyProduct = await prisma.product.findFirst();
  if (anyProduct) {
    const publicSingleReq = createMockRequest(`http://localhost:3000/api/products/${anyProduct.id}`);
    const publicSingleRes = await productGET(publicSingleReq, { params: Promise.resolve({ id: anyProduct.id }) });
    console.log(`GET /api/products/[id] status: ${publicSingleRes.status} (Expected: 200)`);
    if (publicSingleRes.status !== 200) throw new Error('Public plant detail GET failed!');
  }
  console.log('✓ Public catalogue remains 100% accessible.\n');

  // -------------------------------------------------------------
  // Test 2: Unauthenticated Requests to Admin Endpoints (Must return 401)
  // -------------------------------------------------------------
  console.log('--- TEST 2: Unauthenticated Access to Admin Routes (Must return 401) ---');
  const unauthDashReq = createMockRequest('http://localhost:3000/api/admin/dashboard');
  const unauthDashRes = await adminDashboardGET(unauthDashReq);
  console.log(`Unauthenticated GET /api/admin/dashboard status: ${unauthDashRes.status} (Expected: 401)`);
  if (unauthDashRes.status !== 401) throw new Error('Unauthenticated access was not rejected with 401!');

  const unauthCreateReq = createMockRequest('http://localhost:3000/api/products', 'POST', undefined, { name: 'Hacked Plant' });
  const unauthCreateRes = await productsPOST(unauthCreateReq);
  console.log(`Unauthenticated POST /api/products status: ${unauthCreateRes.status} (Expected: 401)`);
  if (unauthCreateRes.status !== 401) throw new Error('Unauthenticated product creation was not rejected with 401!');

  if (anyProduct) {
    const unauthPutReq = createMockRequest(`http://localhost:3000/api/products/${anyProduct.id}`, 'PUT', undefined, { name: 'Hacked' });
    const unauthPutRes = await productPUT(unauthPutReq, { params: Promise.resolve({ id: anyProduct.id }) });
    console.log(`Unauthenticated PUT /api/products/[id] status: ${unauthPutRes.status} (Expected: 401)`);
    if (unauthPutRes.status !== 401) throw new Error('Unauthenticated product update was not rejected with 401!');

    const unauthDelReq = createMockRequest(`http://localhost:3000/api/products/${anyProduct.id}`, 'DELETE');
    const unauthDelRes = await productDELETE(unauthDelReq, { params: Promise.resolve({ id: anyProduct.id }) });
    console.log(`Unauthenticated DELETE /api/products/[id] status: ${unauthDelRes.status} (Expected: 401)`);
    if (unauthDelRes.status !== 401) throw new Error('Unauthenticated product delete was not rejected with 401!');
  }
  console.log('✓ All unauthenticated requests rejected with 401 Unauthorized.\n');

  // -------------------------------------------------------------
  // Test 3: Authenticated USER Requests to Admin Endpoints (Must return 403)
  // -------------------------------------------------------------
  console.log('--- TEST 3: Regular USER Role Access to Admin Routes (Must return 403) ---');
  const userDashReq = createMockRequest('http://localhost:3000/api/admin/dashboard', 'GET', userToken);
  const userDashRes = await adminDashboardGET(userDashReq);
  console.log(`USER GET /api/admin/dashboard status: ${userDashRes.status} (Expected: 403)`);
  if (userDashRes.status !== 403) throw new Error('USER access to dashboard was not rejected with 403!');

  const userCreateReq = createMockRequest('http://localhost:3000/api/products', 'POST', userToken, { name: 'User Plant' });
  const userCreateRes = await productsPOST(userCreateReq);
  console.log(`USER POST /api/products status: ${userCreateRes.status} (Expected: 403)`);
  if (userCreateRes.status !== 403) throw new Error('USER product creation was not rejected with 403!');

  if (anyProduct) {
    const userPutReq = createMockRequest(`http://localhost:3000/api/products/${anyProduct.id}`, 'PUT', userToken, { name: 'User Edit' });
    const userPutRes = await productPUT(userPutReq, { params: Promise.resolve({ id: anyProduct.id }) });
    console.log(`USER PUT /api/products/[id] status: ${userPutRes.status} (Expected: 403)`);
    if (userPutRes.status !== 403) throw new Error('USER product update was not rejected with 403!');

    const userDelReq = createMockRequest(`http://localhost:3000/api/products/${anyProduct.id}`, 'DELETE', userToken);
    const userDelRes = await productDELETE(userDelReq, { params: Promise.resolve({ id: anyProduct.id }) });
    console.log(`USER DELETE /api/products/[id] status: ${userDelRes.status} (Expected: 403)`);
    if (userDelRes.status !== 403) throw new Error('USER product delete was not rejected with 403!');
  }
  console.log('✓ All regular USER attempts on admin endpoints rejected with 403 Forbidden.\n');

  // -------------------------------------------------------------
  // Test 4: Authenticated ADMIN Requests to Admin Endpoints (Must return 200 / 201)
  // -------------------------------------------------------------
  console.log('--- TEST 4: Authenticated ADMIN Role Access (Must succeed) ---');
  const adminDashReq = createMockRequest('http://localhost:3000/api/admin/dashboard', 'GET', adminToken);
  const adminDashRes = await adminDashboardGET(adminDashReq);
  console.log(`ADMIN GET /api/admin/dashboard status: ${adminDashRes.status} (Expected: 200)`);
  if (adminDashRes.status !== 200) throw new Error('ADMIN dashboard request failed!');

  const category = await prisma.plantCategory.findFirst();
  if (category) {
    const testSlug = `rbac-test-plant-${Date.now()}`;
    const adminCreateReq = createMockRequest('http://localhost:3000/api/products', 'POST', adminToken, {
      name: 'RBAC Test Plant',
      slug: testSlug,
      price: '499.00',
      categoryId: category.id
    });
    const adminCreateRes = await productsPOST(adminCreateReq);
    console.log(`ADMIN POST /api/products status: ${adminCreateRes.status} (Expected: 201)`);
    if (adminCreateRes.status !== 201) throw new Error('ADMIN product creation failed!');
    const createdProduct = await adminCreateRes.json();

    const adminPutReq = createMockRequest(`http://localhost:3000/api/products/${createdProduct.id}`, 'PUT', adminToken, {
      name: 'RBAC Test Plant Updated'
    });
    const adminPutRes = await productPUT(adminPutReq, { params: Promise.resolve({ id: createdProduct.id }) });
    console.log(`ADMIN PUT /api/products/[id] status: ${adminPutRes.status} (Expected: 200)`);
    if (adminPutRes.status !== 200) throw new Error('ADMIN product update failed!');

    const adminDelReq = createMockRequest(`http://localhost:3000/api/products/${createdProduct.id}`, 'DELETE', adminToken);
    const adminDelRes = await productDELETE(adminDelReq, { params: Promise.resolve({ id: createdProduct.id }) });
    console.log(`ADMIN DELETE /api/products/[id] status: ${adminDelRes.status} (Expected: 200)`);
    if (adminDelRes.status !== 200) throw new Error('ADMIN product archive failed!');

    // Cleanup created test product
    await prisma.product.delete({ where: { id: createdProduct.id } });
  }
  console.log('✓ ADMIN role successfully authorized for administrative operations.\n');

  // -------------------------------------------------------------
  // Test 5: Registration Privilege Escalation Prevention
  // -------------------------------------------------------------
  console.log('--- TEST 5: Registration Privilege Escalation Attack ---');
  const attackerEmail = `attacker_${Date.now()}@test.com`;
  const registerReq = createMockRequest('http://localhost:3000/api/auth/register', 'POST', undefined, {
    name: 'Attacker User',
    email: attackerEmail,
    password: 'Password123!',
    role: 'ADMIN' // Malicious attempt to escalate role
  });
  const registerRes = await registerPOST(registerReq);
  console.log(`Registration attempt status: ${registerRes.status}`);
  if (registerRes.status === 201) {
    const createdUser = await prisma.user.findUnique({ where: { email: attackerEmail } });
    console.log(`Created user role in database: "${createdUser?.role}" (Expected: "USER")`);
    if (createdUser?.role !== 'USER') {
      throw new Error('SECURITY BREACH: Client-supplied role was assigned to user!');
    }
    // Cleanup
    await prisma.verificationToken.deleteMany({ where: { email: attackerEmail } });
    await prisma.user.delete({ where: { email: attackerEmail } });
    console.log('✓ Registration role escalation attack safely neutralized (forced to USER).\n');
  }

  // -------------------------------------------------------------
  // Test 6: getAuthenticatedUser and requireAdmin helper validation
  // -------------------------------------------------------------
  console.log('--- TEST 6: Helper Function Direct Validation ---');
  const userCheck = await getAuthenticatedUser(createMockRequest('http://localhost:3000/', 'GET', userToken));
  console.log(`getAuthenticatedUser for USER: role="${userCheck?.role}" (Expected: "USER")`);
  if (userCheck?.role !== 'USER') throw new Error('getAuthenticatedUser failed for USER');

  const adminCheck = await getAuthenticatedUser(createMockRequest('http://localhost:3000/', 'GET', adminToken));
  console.log(`getAuthenticatedUser for ADMIN: role="${adminCheck?.role}" (Expected: "ADMIN")`);
  if (adminCheck?.role !== 'ADMIN') throw new Error('getAuthenticatedUser failed for ADMIN');

  const adminAuthResult = await requireAdmin(createMockRequest('http://localhost:3000/', 'GET', adminToken));
  console.log(`requireAdmin for ADMIN: response is null (authorized): ${adminAuthResult.response === null}`);
  if (adminAuthResult.response !== null) throw new Error('requireAdmin failed to authorize ADMIN');

  const userAuthResult = await requireAdmin(createMockRequest('http://localhost:3000/', 'GET', userToken));
  console.log(`requireAdmin for USER: status=${userAuthResult.response?.status} (Expected: 403)`);
  if (userAuthResult.response?.status !== 403) throw new Error('requireAdmin failed to forbid USER');

  const anonAuthResult = await requireAdmin(createMockRequest('http://localhost:3000/', 'GET'));
  console.log(`requireAdmin for Anonymous: status=${anonAuthResult.response?.status} (Expected: 401)`);
  if (anonAuthResult.response?.status !== 401) throw new Error('requireAdmin failed to reject Anonymous');

  console.log('✓ Helper functions verified with 100% precision.\n');

  console.log('=== ALL RBAC TESTS PASSED SUCCESSFULLY ===');
}

runRBACTests()
  .catch((e) => {
    console.error('RBAC Test Suite Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
