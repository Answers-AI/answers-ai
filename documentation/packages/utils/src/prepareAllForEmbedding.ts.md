Filepath: packages/utils/src/prepareAllForEmbedding.ts
Overview: Summary:
This file contains a single function called "prepareAllForEmbedding" which takes an array of Jira objects and prepares them for embedding.

Import statements:
None

Script Summary:
The "prepareAllForEmbedding" function takes an array of Jira objects and prepares them for embedding by calling the "prepareForEmbedding" method on each object. It returns an array of prepared statuses.

Internal Functions:
None

External Functions:
- prepareAllForEmbedding(jiraObjects: any[]): This function takes an array of Jira objects and prepares them for embedding by calling the "prepareForEmbedding" method on each object. It returns an array of prepared statuses.

Interaction Summary:
This file is part of a larger application that likely interacts with Jira APIs or other Jira-related services. The "prepareAllForEmbedding" function could be called from other parts of the application to prepare Jira objects for embedding.

Developer Questions:
- What is the "prepareForEmbedding" method and how does it work?
- What are the expected properties and methods of a Jira object?
- What other parts of the application call the "prepareAllForEmbedding" function?

