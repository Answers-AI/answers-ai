import { inngest } from './client';
import { PrismaClient } from 'db/dist';
const prisma = new PrismaClient();

export const answersPromptCreated = inngest.createFunction(
  { name: 'Process answers/prompt.created event' },
  { event: 'answers/prompt.created' },
  async ({ event }) => {
    const { data } = event;
    await prisma.prompt.create({ data });
  }
);

export const answersPromptUpdated = inngest.createFunction(
  { name: 'Process answers/prompt.updated event' },
  { event: 'answers/prompt.updated' },
  async ({ event }) => {
    const { data } = event;
    console.log('data', data);
    await prisma.prompt.update(data);
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
