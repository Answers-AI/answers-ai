Filepath: packages/utils/src/slack/client.js
Overview: Summary:
This file contains the SlackApiClient class, which is responsible for interacting with the Slack API and caching user, channel, and group data.

Import statements:
The file imports the WebClient class from the '@slack/web-api' package, as well as the SlackChannel and SlackUser classes from './models/channel' and './models/user', respectively.

Script Summary:
The SlackApiClient class has a constructor that takes an access token and initializes a WebClient instance with that token. It also initializes a cache object with empty users, channels, and groups properties. The class has several methods for initializing and retrieving data from the cache, including initDataLookups, initUserCache, initChannelCache, getChannel, getChannels, getUser, and getGroup.

Internal Functions:
- initDataLookups: initializes the user and channel caches
- initUserCache: retrieves user data from the Slack API and adds it to the cache
- initChannelCache: retrieves channel data from the Slack API and adds it to the cache
- initGroupCache: retrieves group data from the Slack API and adds it to the cache
- getChannel: retrieves a channel from the cache or the Slack API and adds it to the cache if it wasn't already there
- getChannels: retrieves all channels from the cache
- getUser: retrieves a user from the cache or the Slack API and adds it to the cache if it wasn't already there
- getGroup: retrieves a group from the cache or throws an error if it wasn't found in the cache

External Functions:
None

Interaction Summary:
This file interacts with the Slack API to retrieve user, channel, and group data and caches that data for later use by other parts of the application. Other parts of the application can use the SlackApiClient class to retrieve user, channel, and group data from the cache or the Slack API.

Developer Questions:
- What is the format of the data stored in the cache?
- How often is the cache updated?
- What happens if the Slack API is down or returns an error?
- How can I add new data to the cache?
- How can I clear the cache?

