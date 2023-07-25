Summary:
This code is a TypeScript module that provides a function called `jiraAdfToMarkdown` for converting Jira Atlassian Document Format (ADF) to Markdown format. The function takes a `Node` object as input and returns a string in Markdown format. The `Node` interface defines the structure of the input object.

Import statements:
- There are no import statements in this code.

Script Summary:
The script defines a function `jiraAdfToMarkdown` that recursively traverses the input `Node` object and converts each node to its corresponding Markdown representation. The function uses a switch statement to handle different node types and their respective conversions.

Internal Functions:
- None

External Functions:
- `jiraAdfToMarkdown(node: Node): string`: This is the main function of the script. It takes a `Node` object as input and recursively converts it to Markdown format. It returns a string representing the Markdown content.

Interaction Summary:
This script can be used as a utility function in a larger software application that deals with Jira ADF and Markdown formats. It can be called from other parts of the application to convert Jira ADF content to Markdown for display or processing.

Developer Questions:
- How can I use the `jiraAdfToMarkdown` function in my application?
- What are the supported node types and their corresponding Markdown conversions?
- Are there any limitations or known issues with the conversion process?
- How can I extend or modify the conversion logic to handle additional node types or custom requirements?