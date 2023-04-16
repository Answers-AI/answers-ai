Filepath: packages/utils/src/slack/models/message.js
Overview: Summary:
This file contains the SlackMessage class which is responsible for handling Slack messages and their information. It has functions to retrieve message information, tidy up the information, retrieve replies, and replace user mentions. 

Import statements:
The file imports the SlackObject class from './slackObject'.

Script Summary:
The SlackMessage class has a constructor that takes in the Slack API client, channel, message, and parent message. It also has functions to retrieve message information, tidy up the information, retrieve replies, and replace user mentions.

Internal Functions:
- getInfo(): retrieves message information from the Slack API client and caches it for future use.
- getTidiedInfo(): tidies up the message information retrieved from getInfo() and caches it for future use.
- getReplies(): retrieves replies to the message from the Slack API client and caches them for future use.
- getUserName(): retrieves the username of the user who sent the message.
- replaceUserMentions(): replaces user mentions in a message with the user's real name.

External Functions:
- None

Interaction Summary:
This file interacts with the Slack API client to retrieve message information, replies, and user information. It also interacts with the SlackObject class to convert timestamps to dates.

Developer Questions:
- What other classes or files interact with the SlackMessage class?
- How does the Slack API client interact with the rest of the application?
- What other functions could be added to the SlackMessage class to improve its functionality?

