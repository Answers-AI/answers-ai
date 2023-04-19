Summary:
This file contains a function that converts Jira ADF (Atlassian Document Format) to Markdown. It includes a Node interface and a jiraAdfToMarkdown function that takes in a Node object and returns a string in Markdown format.

Import statements:
None.

Script Summary:
The jiraAdfToMarkdown function takes in a Node object and returns a string in Markdown format. It uses a switch statement to handle different types of nodes and recursively calls itself for nested nodes.

Internal Functions:
None.

External Functions:
- jiraAdfToMarkdown(node: Node): string
  - Takes in a Node object and returns a string in Markdown format.

Interaction Summary:
This file is likely used as a utility function in a larger application that involves converting Jira ADF to Markdown. It may be used in conjunction with other functions that handle Markdown formatting or Jira integration.

Developer Questions:
- What is the expected format of the Node object passed into the jiraAdfToMarkdown function?
- How does this function fit into the larger application and what other functions does it interact with?
- Are there any known issues or limitations with this function when converting certain types of Jira ADF nodes to Markdown?