Summary:
This code is a TypeScript module that provides a function called `jiraAdfToMarkdown` for converting Jira ADF (Atlassian Document Format) to Markdown format. The function takes a `Node` object as input and returns a string in Markdown format. The `Node` interface defines the structure of the input object.

Import statements:
- There are no import statements in this code.

Script Summary:
The script defines a function `jiraAdfToMarkdown` that recursively traverses the input `Node` object and converts each node to its corresponding Markdown representation. The function uses a switch statement to handle different node types and returns the Markdown representation accordingly.

Internal Functions:
- None

External Functions:
- `jiraAdfToMarkdown(node: Node): string`: This is the main function of the script. It takes a `Node` object as input and recursively converts it to Markdown format. It returns a string representing the Markdown content.

Interaction Summary:
This script can be used as a utility function in a larger software application that deals with converting Jira ADF to Markdown. Other parts of the application can call the `jiraAdfToMarkdown` function to convert Jira ADF content to Markdown format.

Developer Questions:
- How can I use the `jiraAdfToMarkdown` function in my application?
- What are the supported node types and their corresponding Markdown representations?
- How can I modify the function to handle additional node types or customize the Markdown output?
- Are there any known issues or bugs with the conversion process?