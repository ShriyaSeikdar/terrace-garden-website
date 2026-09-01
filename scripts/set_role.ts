import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  const args = process.argv.slice(2);
  const email = args[0];
  const role = args[1]?.toUpperCase();

  if (!email || !role || (role !== 'USER' && role !== 'ADMIN')) {
    console.log('Usage: npx tsx scripts/set_role.ts <email> <USER|ADMIN>');
    console.log('Listing existing users:');
    const users = await prisma.user.findMany();
    console.table(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, isVerified: u.isVerified })));
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (!user) {
    console.error(`User with email "${normalizedEmail}" not found.`);
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { email: normalizedEmail },
    data: { role: role as 'USER' | 'ADMIN' }
  });

  console.log(`Successfully updated user "${updatedUser.email}" role to: ${updatedUser.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
