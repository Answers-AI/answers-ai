Summary:
This file exports a single function called `prepareAllForEmbedding` which takes an array of Jira objects and prepares them for embedding. It does this by calling the `prepareForEmbedding` function on each object and returning an array of the results.

Import statements:
None

Script Summary:
The `prepareAllForEmbedding` function takes an array of Jira objects and prepares them for embedding by calling the `prepareForEmbedding` function on each object. It then returns an array of the results.

Internal Functions:
None

External Functions:
- `prepareAllForEmbedding(jiraObjects: any[]): Promise<any[]>`
  - Parameters:
    - `jiraObjects`: An array of Jira objects to prepare for embedding
  - Returns:
    - A Promise that resolves to an array of the prepared Jira objects

Interaction Summary:
This file is a standalone utility function that can be used by other parts of the application to prepare Jira objects for embedding.

Developer Questions:
- What is the `prepareForEmbedding` function and how does it work?
- What is the expected format of the Jira objects passed to `prepareAllForEmbedding`?
- What is the expected format of the prepared Jira objects returned by `prepareAllForEmbedding`?

Known Issues and TODOs:
None