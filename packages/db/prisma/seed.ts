import { prisma } from '../src/client';

async function main() {
  const testUser = await prisma.user.upsert({
    where: { email: 'test@theanswer.ai' },
    update: {},
    create: {
      email: 'test@theanswer.ai',
      name: 'Test',
      ChatApp: {
        create: { name: 'Test Chat App', apiKey: '01031993' }
      }
    }
  });

  const testUserTwo = await prisma.user.upsert({
    where: { email: 'test2@theanswer.ai' },
    update: {},
    create: {
      email: 'tes2t@theanswer.ai',
      name: 'Test 2',
      ChatApp: {
        create: { name: 'Test Chat App 2', apiKey: '05031979' }
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
