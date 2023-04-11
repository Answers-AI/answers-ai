import { prisma } from 'db/dist';

export async function upsertChat({
  id,
  email = process.env.DEFAULT_USER_EMAIL!,
  filters,
  prompt,
  isNewJourney,
  journeyId
}: {
  id: string;
  email: string;
  filters: object;
  prompt: string;
  isNewJourney?: boolean;
  journeyId?: string;
}) {
  const journey = await (isNewJourney
    ? prisma.journey.create({ data: { title: prompt, filters, users: { connect: { email } } } })
    : journeyId
    ? prisma.journey.update({
        where: { id: journeyId },
        data: { filters, users: { connect: { email } } }
      })
    : null);

  const chatProperties = {
    users: {
      connect: {
        email: email!
      }
    },
    filters: filters,
    // prompt: {
    //   connectOrCreate: {
    //     create: {
    //       content: prompt
    //     },
    //     where: {
    //       content: prompt
    //     }
    //   }
    // },
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
