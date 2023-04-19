Summary:
This file contains the SlackUser class, which is a model for a user in the Slack API. It has a constructor that takes in a Slack API client and a user ID, and has methods for retrieving user information and the user's normalized name.

Import statements:
The file imports the SlackObject class from './slackObject'.

Script Summary:
The SlackUser class has a constructor that takes in a Slack API client and a user ID, and initializes a cache object. It has an async method called getInfo() that retrieves user information from the Slack API and caches it. It also has a getter method called real_name_normalized that retrieves the user's normalized name from the cached user information.

Internal Functions:
- constructor(slackApiClient, userId): Initializes a new SlackUser object with a Slack API client and a user ID.
- async getInfo(): Retrieves user information from the Slack API and caches it.
- get real_name_normalized(): Retrieves the user's normalized name from the cached user information.

External Functions:
- None

Interaction Summary:
This file interacts with the Slack API client to retrieve user information. It could be used in conjunction with other Slack API models and controllers to build a Slack integration.

Developer Questions:
- What other Slack API models and controllers does this file interact with?
- How is the Slack API client initialized and passed into the constructor?
- What other information can be retrieved from the Slack API for a user?
- How is the cache object used and managed in this file?