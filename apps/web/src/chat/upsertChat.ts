import { prisma } from 'db/dist';

export async function upsertChat({
  id,
  email,
  filters,
  prompt,
  journeyId
}: {
  id: string;
  email: string;
  filters: object;
  prompt: string;
  journeyId: string;
}) {
  const chatProperties = {
    users: {
      connect: {
        email: email!
      }
    },
    filters: filters,
    prompt: {
      connectOrCreate: {
        create: {
          content: prompt
        },
        where: {
          content: prompt
        }
      }
    },
    journey: journeyId ? { connect: { id: journeyId } } : {}
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
