Summary:
This file provides a utility function to convert Jira's Atlassian Document Format (ADF) to Markdown format. It defines a Node interface and a jiraAdfToMarkdown function that takes a Node as input and returns a string in Markdown format.

Import statements:
There are no import statements in this file.

Script Summary:
The script contains a single utility function that converts Jira ADF to Markdown format.

Internal Functions:
There are no internal functions in this file.

External Functions:
- jiraAdfToMarkdown(node: Node): string
  - Description: Converts a Jira ADF node to its equivalent Markdown representation.
  - Parameters:
    - node: A Node object representing a Jira ADF node.
  - Returns: A string containing the Markdown representation of the input node.

Interaction Summary:
This utility function can be used by other parts of the application that require converting Jira ADF content to Markdown format.

Developer Questions:
- What is the structure of the Node interface and its properties?
- How does the jiraAdfToMarkdown function handle different node types?
- Are there any limitations or edge cases that the jiraAdfToMarkdown function does not handle?

Known Issues and TODOs:
- The 'emoji' case is commented out in the jiraAdfToMarkdown function, which may lead to incomplete conversion of emojis.
- The code does not handle any custom or unsupported node types in the Jira ADF format.
- There may be edge cases where the conversion to Markdown is not accurate or loses some formatting information.