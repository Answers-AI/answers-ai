Summary:
This file exports a class called SlackMessage which represents a message in a Slack channel. It has methods to retrieve information about the message, tidy up the information, and retrieve replies to the message. It also has a static method to replace user mentions in a message with the user's real name.

Import statements:
The file imports a class called SlackObject from './slackObject'. It is not clear what this file contains.

Script Summary:
The SlackMessage class has a constructor that takes in a Slack API client, a channel ID, a message object, and a parent message object. It also has methods to retrieve information about the message, tidy up the information, and retrieve replies to the message. It also has a static method to replace user mentions in a message with the user's real name.

Internal Functions:
- constructor(slackApiClient, channel, message, parentMessage): Initializes the SlackMessage object with the given Slack API client, channel ID, message object, and parent message object.
- async getInfo(): Retrieves information about the message from the Slack API and caches it for future use.
- async getTidiedInfo(): Retrieves tidied up information about the message, including the message text, date sent, date edited, and user who sent the message.
- async getReplies(): Retrieves replies to the message and caches them for future use.
- async getUserName(messageInfo): Retrieves the name of the user who sent the message.
- static replaceUserMentions(message, slackApiClient): Replaces user mentions in the given message with the user's real name.

External Functions:
- None

Interaction Summary:
The SlackMessage class interacts with the Slack API client to retrieve information about the message and its replies. It may also interact with the SlackObject class, but it is not clear what this class contains.

Developer Questions:
- What is the SlackObject class and what does it contain?
- How does the Slack API client interact with the SlackMessage class?
- How are parent messages used in the SlackMessage class?

Known Issues and TODOs:
- None