import { prisma } from 'db/dist';
import ConfluenceClient from '../confluence/client';
import JiraClient from '../jira/client';
import SlackApiClient from '../slack/client';

type UserClients = {
  jiraClient: JiraClient;
  confluenceClient: ConfluenceClient;
  slackClient: SlackApiClient;
};
export async function getUserClients(user: { id: string }) {
  const accounts = await prisma.account.findMany({
    where: {
      userId: user.id
    }
  });
  const accountsByProvider = accounts?.reduce((acc: any, account) => {
    acc[account.provider] = account;
    return acc;
  }, {});

  // @ts-expect-error
  const clients: UserClients = {};
  // console.log('Accounts', accountsByProvider);
  if (accountsByProvider?.atlassian?.access_token)
    clients.confluenceClient = new ConfluenceClient({
      accessToken: accountsByProvider?.atlassian?.access_token
    });
  if (accountsByProvider?.atlassian?.access_token)
    clients.jiraClient = new JiraClient({
      accessToken: accountsByProvider?.atlassian?.access_token
    });
  if (accountsByProvider?.slack?.access_token)
    clients.slackClient = new SlackApiClient({
      accessToken: accountsByProvider?.slack?.access_token
    });
  return clients;
}
