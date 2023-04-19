Summary:
This file contains the SlackMessage class which is used to retrieve information about a Slack message, including its text, sender, and replies. It also includes a static function to replace user mentions in a message with the user's real name.

Import statements:
The file imports the SlackObject class from './slackObject'.

Script Summary:
The SlackMessage class has several methods to retrieve information about a Slack message, including getInfo(), getTidiedInfo(), and getReplies(). It also has a static function replaceUserMentions() to replace user mentions in a message with the user's real name.

Internal Functions:
- getInfo(): retrieves information about the Slack message, including its text, sender, and replies.
- getTidiedInfo(): retrieves tidied information about the Slack message, including its text, date sent, date edited, and sender.
- getReplies(): retrieves replies to the Slack message.
- getUserName(): retrieves the name of the user who sent the Slack message.
- replaceUserMentions(): replaces user mentions in a message with the user's real name.

External Functions:
None.

Interaction Summary:
This file interacts with the Slack API client to retrieve information about a Slack message. It may be used by other parts of the application to display information about a Slack message or its replies.

Developer Questions:
- What other parts of the application use this file?
- How does this file interact with the Slack API client?
- What other Slack-related functionality does the application have?
- How are Slack messages displayed in the application?