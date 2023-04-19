Summary:
This file contains the SlackApiClient class which is responsible for interacting with the Slack API and caching user, channel, and group data. It imports the WebClient class from the '@slack/web-api' package and the SlackChannel and SlackUser classes from './models'.

Import statements:
- WebClient from '@slack/web-api': A package for interacting with the Slack API.
- SlackChannel from './models/channel': A class for representing a Slack channel.
- SlackUser from './models/user': A class for representing a Slack user.

Script Summary:
- SlackApiClient: A class for interacting with the Slack API and caching user, channel, and group data.

Internal Functions:
- constructor: Initializes the SlackApiClient with an access token and creates a cache for users, channels, and groups.
- initDataLookups: Initializes the user and channel caches.
- initUserCache: Populates the user cache with data from the Slack API.
- initChannelCache: Populates the channel cache with data from the Slack API.
- initGroupCache: Populates the group cache with data from the Slack API.
- getChannel: Retrieves a channel from the cache or the Slack API.
- getChannels: Retrieves all channels from the cache or the Slack API.
- getUser: Retrieves a user from the cache or the Slack API.
- getGroup: Retrieves a group from the cache or throws an error if it is not found.

External Functions:
- None

Interaction Summary:
The SlackApiClient class is used to interact with the Slack API and cache user, channel, and group data. Other parts of the application may use this class to retrieve Slack data.

Developer Questions:
- What is the format of the data returned by the Slack API?
- How often should the cache be refreshed?
- What happens if the Slack API returns an error?
- How can I test the SlackApiClient class?