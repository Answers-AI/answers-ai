import { inngest } from './client';
import { PrismaClient } from 'db/dist';
const prisma = new PrismaClient();

export const answersPromptUpserted = inngest.createFunction(
  { name: 'Process answers/prompt.upserted event' },
  { event: 'answers/prompt.upserted' },
  async ({ event }) => {
    const { data, user } = event;
    const { prompt } = data;
    const savedPrompt = await prisma.prompt.findUnique({ where: { prompt: data?.prompt } });
    await prisma.prompt.upsert({
      where: { prompt: data?.prompt },
      create: { users: { connect: { email: user?.email } }, prompt, likes: 0, usages: 1 },
      update: {
        usages: (savedPrompt?.usages || 0) + 1
      }
    });
  }
);

export const answersPromptAnswered = inngest.createFunction(
  { name: 'Process answers/prompt.answered event' },
  { event: 'answers/prompt.answered' },
  async ({ event }) => {
    const { data } = event;
    await prisma.prompt.update({
      where: { prompt: data?.prompt },
      data: {
        answers: {
          create: { text: data?.answer }
        }
      }
    });
  }
);
