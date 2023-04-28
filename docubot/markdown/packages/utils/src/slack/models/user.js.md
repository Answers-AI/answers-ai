Summary:
This file exports a class called SlackUser that represents a user in the Slack API. It has a constructor that takes a Slack API client and a user ID as arguments. It also has a method called getInfo() that retrieves information about the user from the Slack API and caches it for future use. Additionally, it has a getter called real_name_normalized that returns the user's normalized real name.

Import statements:
The file imports a module called SlackObject from './slackObject'. It is not clear what this module does or what its contents are.

Script Summary:
The file exports a class called SlackUser that represents a user in the Slack API. It has a constructor that takes a Slack API client and a user ID as arguments. It also has a method called getInfo() that retrieves information about the user from the Slack API and caches it for future use. Additionally, it has a getter called real_name_normalized that returns the user's normalized real name.

Internal Functions:
- constructor(slackApiClient, userId): Initializes a new instance of the SlackUser class with the given Slack API client and user ID.
- async getInfo(): Retrieves information about the user from the Slack API and caches it for future use.

External Functions:
- get real_name_normalized(): Returns the user's normalized real name.

Interaction Summary:
This file interacts with the Slack API client to retrieve information about a user. It is not clear how this class is used in the larger application, but it could potentially be used to display user information or perform actions on behalf of a user.

Developer Questions:
- What is the SlackObject module and how is it used in this file?
- How is the SlackUser class used in the larger application?
- Are there any other methods or properties that should be added to the SlackUser class?

Known Issues and TODOs:
There are no known issues or TODOs for this file.