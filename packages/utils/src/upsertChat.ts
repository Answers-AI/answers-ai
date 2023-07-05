import { prisma } from '@db/client';
import { User } from 'types';

export async function upsertChat({
  id,
  user,
  filters = {},
  prompt,
  journeyId
}: {
  id?: string;
  user: User;

  filters?: object;
  prompt: string;
  journeyId?: string;
}) {
  const journey = await (!journeyId
    ? null
    : prisma.journey.update({
        where: { id: journeyId },
        data: { filters, users: { connect: { email: user.email! } } }
      }));

  const chatProperties = {
    title: prompt,
    users: {
      connect: {
        email: user.email!
      }
    },
    filters: filters,
    ...(journey ? { journeyId: journey.id } : null),
    messages: {
      create: {
        role: 'user',
        content: prompt,
        user: { connect: { email: user.email! } }
      }
    }
  };

  let chat;
  if (!id) {
    chat = await prisma.chat.create({
      data: {
        ...chatProperties,
        organizationId: user.organizationId,
        ownerId: user.id
      },
      include: { journey: true }
    });
  } else {
    chat = await prisma.chat.update({
      where: { id },
      data: chatProperties,
      include: { journey: true }
    });
  }
  return chat;
}
