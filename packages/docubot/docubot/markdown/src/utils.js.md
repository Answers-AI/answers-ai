Template:

Summary:
This file contains functions for tokenizing text, compiling completion prompts, calculating estimated pricing, and generating a cost summary. It interacts with other files in the application to read and compile templates, and uses a third-party library for tokenization.

Import statements:
- fs: a Node.js module for working with the file system
- path: a Node.js module for working with file paths
- GPT3Tokenizer: a third-party library for tokenizing text using the GPT-3 model
- getTemplateFiles: a custom function for getting template files
- Handlebars: a third-party library for compiling templates

Script Summary:
This file exports several functions for working with text and calculating pricing. The functions include:
- countTokens: a function that takes a string of text and returns the number of tokens in the text
- compileCompletionPrompts: a function that compiles a completion prompt using a template and file contents
- getCompletionModelBasedOnTokenSize: a function that determines which GPT model to use based on the number of tokens in the text
- getEstimatedPricing: a function that calculates the estimated cost of a completion request based on the GPT model and number of tokens
- generateCostSummary: a function that generates a summary of the cost of completion requests for a set of files

Internal Functions:
- templateCompiler: a function that takes a string of template content and returns a compiled Handlebars template
  - Parameters: content (string)
  - Returns: compiled template (function)
- fileReader: an async function that reads a file and returns its contents as a string
  - Parameters: filePath (string)
  - Returns: file contents (string)

External Functions:
- countTokens: a function that takes a string of text and returns the number of tokens in the text
  - Parameters: content (string)
  - Returns: tokensInFile (number)
- compileCompletionPrompts: a function that compiles a completion prompt using a template and file contents
  - Parameters: filePath (string), prompt (string), skipCompletion (boolean), options (object)
  - Returns: fullPrompt (string), fileContents (string)
- getCompletionModelBasedOnTokenSize: a function that determines which GPT model to use based on the number of tokens in the text
  - Parameters: tokens (number)
  - Returns: model (string)
- getEstimatedPricing: a function that calculates the estimated cost of a completion request based on the GPT model and number of tokens
  - Parameters: model (string), tokens (number)
  - Returns: cost (number)
- generateCostSummary: a function that generates a summary of the cost of completion requests for a set of files
  - Parameters: files (array of objects)
  - Returns: cost summary (string)

Interaction Summary:
This file interacts with other files in the application to read and compile templates. It also uses a third-party library for tokenization. The functions in this file can be used by other parts of the application to tokenize text, compile completion prompts, calculate pricing, and generate cost summaries.

Developer Questions:
- What is the GPT-3 model and how does it work?
- How can I configure this file to work with other models besides GPT-3?
- How can I calculate the true token size based on the prompt and response tokens?
- How can I calculate the cost of a completion request based on the response tokens?
- How can I modify the generateCostSummary function to include more information?