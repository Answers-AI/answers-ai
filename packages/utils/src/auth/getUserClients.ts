import { prisma } from 'db/dist';
import ConfluenceClient from '../confluence/client';
import JiraClient from '../jira/client';
import SlackApiClient from '../slack/client';

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
  // console.log('Accounts', accountsByProvider);
  const confluenceClient = new ConfluenceClient({
    accessToken: accountsByProvider?.atlassian?.access_token
  });
  const jiraClient = new JiraClient({
    accessToken: accountsByProvider?.atlassian?.access_token
  });
  const slackClient = new SlackApiClient({
    accessToken: accountsByProvider?.slack?.access_token
  });
  return { jiraClient, confluenceClient, slackClient };
}
