import { prisma } from '@db/client';
import { normalizeSidekickList } from './normalizeSidekick';
import { User } from 'types';

export async function findSidekicksForChat(user: User) {
  if (!user) return [];
  const dbSidekicks = await prisma.sidekick.findMany({
    where: {
      tags: { has: 'flowise' },
      NOT: { tags: { has: 'internal' } },
      chatflow: {
        path: ['answersConfig', 'workflowVisibility'],
        array_contains: ['AnswerAI']
      },
      organization: { id: user.org_id },
      OR: [
        { createdByUser: { id: user.id } },
        {
          organization: { id: user.org_id },
          chatflow: {
            path: ['answersConfig', 'workflowVisibility'],
            array_contains: ['Organization']
          }
        }
      ]
    }
  });

  const sidekicks = dbSidekicks?.length ? normalizeSidekickList(dbSidekicks, user) : [];
  return sidekicks;
}
