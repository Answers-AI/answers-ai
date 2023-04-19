Summary:
This file exports a function called prepareAllForEmbedding which takes an array of Jira objects and prepares them for embedding. It returns an array of prepared statuses.

Import statements:
None

Script Summary:
The prepareAllForEmbedding function takes an array of Jira objects and prepares them for embedding. It does this by calling the prepareForEmbedding function on each object and storing the resulting promises in an array. It then waits for all promises to resolve using Promise.all and returns the resulting array of prepared statuses.

Internal Functions:
None

External Functions:
- prepareAllForEmbedding: This function takes an array of Jira objects and prepares them for embedding. It returns an array of prepared statuses.

Interaction Summary:
This file is part of a larger application that likely interacts with Jira. The prepareAllForEmbedding function is likely called by other parts of the application to prepare Jira objects for embedding.

Developer Questions:
- What is the prepareForEmbedding function and how does it work?
- What are the expected properties of a Jira object?
- What is the format of the preparedStatuses array that is returned?
- How is the prepareAllForEmbedding function called and where is it used in the application?