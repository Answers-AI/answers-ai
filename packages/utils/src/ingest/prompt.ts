import { PrismaClient } from 'db/dist';
import { EventVersionHandler } from './EventVersionHandler';
const prisma = new PrismaClient();

export const answersPromptUpserted: EventVersionHandler<{ prompt: string }> = {
  v: '1',
  event: 'answers/prompt.upserted',
  handler: async ({ event }) => {
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
};

export const answersPromptAnswered: EventVersionHandler<{ prompt: string; answer: string }> = {
  v: '1',
  event: 'answers/prompt.answered',
  handler: async ({ event }) => {
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
};
