Summary:
This file contains the SlackChannel class which is responsible for retrieving information and messages from a Slack channel. It depends on the SlackMessage class.

Import statements:
- SlackMessage: a class for creating Slack messages

Script Summary:
- SlackChannel: a class for retrieving information and messages from a Slack channel

Internal Functions:
- constructor(slackApiClient, channel): initializes the SlackChannel object with the Slack API client and channel ID
- async getInfo(): retrieves information about the Slack channel
- async getMessages(): retrieves messages from the Slack channel

External Functions:
- None

Interaction Summary:
- This file interacts with the Slack API client to retrieve information and messages from a Slack channel. It may be used by other parts of the application to display channel information and messages to users.

Developer Questions:
- What other parts of the application use this file?
- How does this file handle errors when retrieving information and messages from the Slack API?
- Can this file be used to send messages to a Slack channel as well?