import { prisma } from 'db/dist';

export async function upsertChat({
  id,
  email = process.env.DEFAULT_USER_EMAIL!,
  filters = {},
  prompt,
  journeyId
}: {
  id?: string;
  email: string;
  filters?: object;
  prompt: string;
  journeyId?: string;
}) {
  const journey = await (!journeyId
    ? null
    : prisma.journey.update({
        where: { id: journeyId },
        data: { filters, users: { connect: { email } } }
      }));

  const chatProperties = {
    users: {
      connect: {
        email: email!
      }
    },
    filters: filters,
    ...(journey ? { journeyId: journey.id } : null)
  };

  let chat;
  if (!id) {
    chat = await prisma.chat.create({
      data: chatProperties
    });
  } else {
    chat = await prisma.chat.update({
      where: { id },
      data: chatProperties
    });
  }
  return chat;
}
