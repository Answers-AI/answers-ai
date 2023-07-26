Summary:
This code is a module that contains functions for normalizing and manipulating sidekick data. It includes functions for normalizing a single sidekick item, normalizing a list of sidekick items, and normalizing a sidekick item for update. The code also imports a utility function for converting strings to sentence case.

Import statements:
- `toSentenceCase` from `@utils/utilities/toSentenceCase`: This is a utility function that converts a string to sentence case.
- `Sidekick`, `SidekickListItem`, `User` from `types`: These are type definitions for the sidekick data and user data.

Script Summary:
The script defines several functions for normalizing sidekick data. The `normalizeSidekickListItem` function takes a sidekick object and an optional user object and returns a normalized sidekick list item object. The `normalizeSidekickList` function takes an array of sidekick objects and an optional user object and returns an array of normalized sidekick list item objects. The `normalizeSidekickItem` and `normalizeSidekickForUpdate` functions are placeholders and currently return the sidekick object as is.

Internal Functions:
- `normalizeSidekickListItem`: This function takes a sidekick object and an optional user object and returns a normalized sidekick list item object. It first determines the `sharedWith` property based on the sidekick's `isGlobal`, `isSharedWithOrg`, and `isSystem` properties. It then checks if the sidekick is favorited by the user and sets the `isFavorite` property accordingly. Finally, it constructs the normalized sidekick list item object and returns it.
- `normalizeSidekickList`: This function takes an array of sidekick objects and an optional user object and returns an array of normalized sidekick list item objects. It calls the `normalizeSidekickListItem` function for each sidekick in the array and returns the resulting array of normalized sidekick list item objects.
- `normalizeSidekickItem`: This function takes a sidekick object and currently returns it as is. It is a placeholder and should be updated if not all fields of the sidekick object need to be returned.
- `normalizeSidekickForUpdate`: This function takes a sidekick object and returns a normalized sidekick object for update. It extracts the `temperature`, `frequency`, `presence`, `maxCompletionTokens`, and `sharedWith` properties from the sidekick object and assigns them to separate variables. It then constructs a new sidekick object with the remaining properties and adds the extracted properties as well as additional properties indicating the type of sharing (e.g., `isSystem`, `isGlobal`, `isSharedWithOrg`). The normalized sidekick object is then returned.

External Functions:
- `normalizeSidekickListItem`: This function is exported and can be used by other modules. It takes a sidekick object and an optional user object and returns a normalized sidekick list item object.
- `normalizeSidekickList`: This function is exported and can be used by other modules. It takes an array of sidekick objects and an optional user object and returns an array of normalized sidekick list item objects.
- `normalizeSidekickItem`: This function is exported and can be used by other modules. It takes a sidekick object and currently returns it as is. It is a placeholder and should be updated if not all fields of the sidekick object need to be returned.
- `normalizeSidekickForUpdate`: This function is exported and can be used by other modules. It takes a sidekick object and returns a normalized sidekick object for update.

Interaction Summary:
This module can be used by other parts of the application to normalize and manipulate sidekick data. The `normalizeSidekickListItem` function can be used to normalize a single sidekick item, the `normalizeSidekickList` function can be used to normalize a list of sidekick items, and the `normalizeSidekickItem` and `normalizeSidekickForUpdate` functions can be used to normalize a sidekick item for update.

Developer Questions:
- What is the purpose of the `toSentenceCase` utility function and how is it used?
- What are the possible values for the `sharedWith` property in the sidekick object?
- How can the `normalizeSidekickItem` and `normalizeSidekickForUpdate` functions be updated to return only specific fields of the sidekick object?
- Are there any other functions or modules that depend on this module?