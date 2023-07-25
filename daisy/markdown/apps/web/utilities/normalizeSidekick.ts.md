Summary:
This code is a module that contains functions for normalizing and manipulating sidekick data. It includes functions for normalizing a single sidekick item, normalizing a list of sidekick items, and normalizing a sidekick item for update. The code also imports a utility function for converting strings to sentence case.

Import statements:
- `toSentenceCase` from `@utils/utilities/toSentenceCase`: This is a utility function that converts a string to sentence case.
- `Sidekick`, `SidekickListItem`, `User` from `types`: These are type definitions for the sidekick data.

Script Summary:
The script exports several functions for normalizing and manipulating sidekick data. The `normalizeSidekickListItem` function takes a sidekick object and an optional user object and returns a normalized sidekick list item object. The `normalizeSidekickList` function takes an array of sidekick objects and an optional user object and returns an array of normalized sidekick list item objects. The `normalizeSidekickItem` and `normalizeSidekickForUpdate` functions both take a sidekick object and return a normalized sidekick object.

Internal Functions:
- `normalizeSidekickListItem`: This function takes a sidekick object and an optional user object and returns a normalized sidekick list item object. It first determines the `sharedWith` property based on the sidekick's `isGlobal`, `isSharedWithOrg`, and `isSystem` properties. It then checks if the sidekick is favorited by the user and sets the `isFavorite` property accordingly. Finally, it constructs and returns the normalized sidekick list item object.
- `normalizeSidekickList`: This function takes an array of sidekick objects and an optional user object and returns an array of normalized sidekick list item objects. It uses the `normalizeSidekickListItem` function to normalize each sidekick object in the array and returns the resulting array of normalized sidekick list item objects.
- `normalizeSidekickItem`: This function takes a sidekick object and returns the same sidekick object without any modifications. This function is currently not used and has a TODO comment suggesting it may need to be updated.
- `normalizeSidekickForUpdate`: This function takes a sidekick object and returns a normalized sidekick object for update. It extracts specific properties from the sidekick object and assigns them to a new object, while also converting some properties to numbers. It determines the `isSystem`, `isGlobal`, and `isSharedWithOrg` properties based on the `sharedWith` property. The resulting normalized sidekick object is then returned.

External Functions:
- `normalizeSidekickListItem`: This function is exported and can be used to normalize a single sidekick object into a normalized sidekick list item object.
- `normalizeSidekickList`: This function is exported and can be used to normalize an array of sidekick objects into an array of normalized sidekick list item objects.
- `normalizeSidekickItem`: This function is exported but currently not used. It can be used to normalize a single sidekick object, but it simply returns the same object without any modifications.
- `normalizeSidekickForUpdate`: This function is exported and can be used to normalize a sidekick object for update by extracting specific properties and converting some properties to numbers.

Interaction Summary:
This module can be used by other parts of the application to normalize and manipulate sidekick data. The `normalizeSidekickListItem` function can be used to normalize a single sidekick object, while the `normalizeSidekickList` function can be used to normalize an array of sidekick objects. The `normalizeSidekickForUpdate` function can be used to normalize a sidekick object for update by extracting specific properties and converting some properties to numbers.

Developer Questions:
- What is the purpose of the `normalizeSidekickItem` function and why is it currently not used?
- How should the `normalizeSidekickItem` function be updated if we don't want to return all fields?
- How should the `normalizeSidekickForUpdate` function be updated if we don't want to return all fields?
- Are there any potential bugs or issues in the code that need to be addressed?