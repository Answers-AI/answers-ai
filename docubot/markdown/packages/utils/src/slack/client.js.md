Summary:
This file contains the implementation of a Slack API client that interacts with the Slack API to retrieve user and channel data. It also caches this data to improve performance.

Import statements:
- `WebClient` from `@slack/web-api`: A Slack API client library for Node.js.
- `SlackChannel` from `./models/channel`: A custom model for Slack channels.
- `SlackUser` from `./models/user`: A custom model for Slack users.

Script Summary:
- `SlackApiClient`: A class that represents a Slack API client.
- `constructor`: Initializes the Slack API client with an access token and initializes an empty cache for users, channels, and groups.
- `initDataLookups`: Initializes the cache for users and channels.
- `initUserCache`: Retrieves a list of all users and initializes a `SlackUser` object for each user in the cache.
- `initChannelCache`: Retrieves a list of all public and private channels and initializes a `SlackChannel` object for each channel in the cache.
- `initGroupCache`: Retrieves a list of all groups and initializes a `SlackGroup` object for each group in the cache.
- `getChannel`: Retrieves a `SlackChannel` object for a given channel ID. If the channel is not in the cache, it is retrieved from the Slack API and added to the cache.
- `getChannels`: Retrieves an array of all `SlackChannel` objects in the cache.
- `getUser`: Retrieves a `SlackUser` object for a given user ID. If the user is not in the cache, it is retrieved from the Slack API and added to the cache.
- `getGroup`: Retrieves a `SlackGroup` object for a given group ID. If the group is not in the cache, an error is thrown.

Internal Functions:
- `initUserCache()`: Retrieves a list of all users and initializes a `SlackUser` object for each user in the cache.
- `initChannelCache()`: Retrieves a list of all public and private channels and initializes a `SlackChannel` object for each channel in the cache.
- `initGroupCache()`: Retrieves a list of all groups and initializes a `SlackGroup` object for each group in the cache.

External Functions:
- `getChannel(channelId)`: Retrieves a `SlackChannel` object for a given channel ID. If the channel is not in the cache, it is retrieved from the Slack API and added to the cache.
- `getChannels()`: Retrieves an array of all `SlackChannel` objects in the cache.
- `getUser(userId)`: Retrieves a `SlackUser` object for a given user ID. If the user is not in the cache, it is retrieved from the Slack API and added to the cache.
- `getGroup(groupId)`: Retrieves a `SlackGroup` object for a given group ID. If the group is not in the cache, an error is thrown.

Interaction Summary:
This file interacts with the Slack API to retrieve user and channel data. It also caches this data to improve performance. Other parts of the application can use the `SlackApiClient` class to retrieve user and channel data.

Developer Questions:
- How can I add caching for groups?
- How can I improve the performance of `initChannelCache()`?
- How can I handle errors when retrieving data from the Slack API?

Known Issues and TODOs:
- There is no caching for groups.
- `initChannelCache()` may be slow for large Slack workspaces.
- Error handling could be improved.