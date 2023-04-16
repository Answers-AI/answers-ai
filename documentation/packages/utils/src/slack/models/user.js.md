Filepath: packages/utils/src/slack/models/user.js
Overview: Summary:
This file defines a class called SlackUser that represents a user in the Slack messaging platform. It has a constructor that takes a Slack API client and a user ID as parameters, and it has two methods: getInfo() and real_name_normalized.

Import statements:
The file imports a class called SlackObject from another file in the same directory.

Script Summary:
The SlackUser class has a constructor that initializes the slackApiClient, userId, and cache properties. The getInfo() method checks if the user's information is already in the cache and returns it if it is. Otherwise, it calls the Slack API to get the user's information and stores it in the cache before returning it. The real_name_normalized property is a getter that returns the user's normalized real name by calling the getInfo() method and extracting the real_name_normalized property from the returned user object.

Internal Functions:
- constructor(slackApiClient, userId): Initializes the slackApiClient, userId, and cache properties.
- async getInfo(): Checks if the user's information is already in the cache and returns it if it is. Otherwise, it calls the Slack API to get the user's information and stores it in the cache before returning it.

External Functions:
- get real_name_normalized(): Returns the user's normalized real name by calling the getInfo() method and extracting the real_name_normalized property from the returned user object.

Interaction Summary:
This file is part of a larger application that interacts with the Slack messaging platform. It represents a user in the platform and can be used to get the user's information and normalized real name. Other parts of the application can use this class to interact with Slack users.

Developer Questions:
- What other classes or files in the application use the SlackUser class?
- How is the Slack API client initialized and passed to the SlackUser constructor?
- What other properties or methods can be added to the SlackUser class to provide more functionality?

