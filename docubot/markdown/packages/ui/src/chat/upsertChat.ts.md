Summary:
This file contains a function called upsertChat which creates or updates a chat object in the database. It takes in various parameters including the chat ID, email, filters, prompt, and journey ID.

Import statements:
The file imports the prisma object from the db/dist module.

Script Summary:
The upsertChat function creates or updates a chat object in the database. If isNewJourney is true, it creates a new journey object and connects it to the chat object. If journeyId is provided, it updates the existing journey object and connects it to the chat object. It then creates or updates the chat object with the provided properties.

Internal Functions:
- upsertChat: This is the main function that creates or updates a chat object in the database. It takes in various parameters including the chat ID, email, filters, prompt, and journey ID. It returns the created or updated chat object.

External Functions:
None

Interaction Summary:
This file interacts with the database through the prisma object. It creates or updates chat and journey objects in the database.

Developer Questions:
- What is the structure of the chat and journey objects in the database?
- What other files interact with the prisma object?
- What is the purpose of the filters parameter?
- What is the purpose of the prompt parameter?
- What is the purpose of the journeyId parameter?
- What happens if both isNewJourney and journeyId are provided?
- What happens if the email parameter is not provided?