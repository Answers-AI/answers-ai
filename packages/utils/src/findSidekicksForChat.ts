import { prisma } from '@db/client';
import { normalizeSidekickList } from './normalizeSidekick';
import { User } from 'types';

export async function findSidekicksForChat(user: User) {
  const dbSidekicks = await prisma.sidekick.findMany({
    where: {
      AND: [
        { tags: { has: 'flowise' } },
        { NOT: { tags: { has: 'internal' } } },
        {
          chatflow: {
            path: ['answersConfig', 'workflowVisibility'],
            array_contains: ['AnswerAI']
          }
        },
        {
          OR: [
            { createdByUser: { id: user.id } },
            {
              organization: { id: user.org_id },
              chatflow: {
                path: ['answersConfig', 'workflowVisibility'],
                array_contains: ['Organzation']
              }
            },
            {
              isSystem: true
            }
          ]
        }
      ]
    }
  });

  const sidekicks = dbSidekicks?.length ? normalizeSidekickList(dbSidekicks, user) : [];
  return sidekicks;
}
