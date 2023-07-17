import { prisma } from '../src/client';

async function main() {
  const testUser = await prisma.user.upsert({
    where: { email: 'test@theanswer.ai' },
    update: {
      role: 'superadmin'
    },
    create: {
      email: 'test@theanswer.ai',
      name: 'Test',
      role: 'superadmin',
      ChatApp: {
        create: { name: 'Test Chat App', apiKey: '01031993' }
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
