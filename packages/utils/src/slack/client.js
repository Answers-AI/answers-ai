import { WebClient } from '@slack/web-api';

class SlackClient {
  constructor() {
    this.client = new WebClient(process.env.SLACK_TOKEN);
  }

  async exportMessagesFromChannel(channelId) {
    let hasMore = true;
    let latestTimestamp;
    let messages = [];

    while (hasMore) {
      const response = await this.client.conversations.history({
        channel: channelId,
        latest: latestTimestamp,
        limit: 1000
      });

      messages = messages.concat(response.messages);
      latestTimestamp = response.messages[response.messages.length - 1].ts;
      hasMore = response.has_more;
    }

    return messages;
  }
}

export default SlackClient;
