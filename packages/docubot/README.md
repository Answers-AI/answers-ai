# Docubot

Docubot is a bot that helps you document your code. It allows you to save your code into memory and chat with it using AnswerAI.

## Usage

To use Docubot, you need to install it globally and then run it. Once it's running, you can chat with it using AnswerAI.

### First time
```bash
npm install -g docubot
docubot start -full
```

It will then count the tokens and give you a cost estimate. When you say yes, it will go through all of your files and magic... automated documentation!

### Configuration
| Constant name          | Description                                                      |
|------------------------|------------------------------------------------------------------|
| `CONFIG_FILE_TYPES`     | An array of strings representing valid configuration file types. |
| `REACT_FILE_TYPES`      | An array of strings representing valid React file types.         |
| `SCRIPT_FILE_TYPES`     | An array of strings representing valid script file types.        |
| `API_FILE_TYPE_PATHS`   | An array of strings representing valid API file paths.           |
| `INVALID_PATHS`         | An array of strings representing invalid file paths.             |
| `INVALID_FILE_TYPES`    | An array of strings representing invalid file types.             |
| `INVALID_FILE_NAMES`    | An array of strings representing invalid file names.             |
| `PROMPT_TYPE_CONDITIONS`| An object containing key-value pairs representing prompt types and their associated conditions. |
| `PROMPTS_FILE_PATH`     | A string representing the file path of the prompts file.         |
| `TEMPLATE_FILE_PATH`    | A string representing the file path of the template file.        |
| `PROMPT_FILES`          | An object containing key-value pairs representing prompt types and their associated prompt and template files. |
| `CODE_BASE_PATH`        | A string representing the base path of the code.                 |
| `DOCUBOT_DIRECTORY`     | A string representing the file path of the Docubot directory.    |
| `PINECONE_INDEX_NAME`   | A string representing the name of the Pinecone index.            |
| `PINECONE_NAMESPACE`    | A string representing the namespace of the Pinecone index.       |
| `MARKDOWN_DIRECTORY`    | A string representing the file path of the Markdown directory.   |
| `DOCUBOT_DIRECTORY_NAME`| A string representing the name of the Docubot directory.         |


To execute the commond on a single file
```bash
docubot start /path/to/file
```

## Commands

Docubot has several commands that you can use to interact with it.

### `docubot save`

The `save` command allows you to save your code into pinecone memory

```bash
docubot save 
```

### `docubot list`

The `list` command allows you to list all of the files that you have saved.

```bash
docubot list
```
## TODO
### CLI
- Add husky job to save to autodocument the change, allow the user to change the comment then pinecone on commit
- Add jest testing
- Reafactor to use modules for
    - fileprocessing (read/write ) based on the config - DONE
    - creating the full prompt from templates - Done
    - counting tokens - 
    - sending to completion API
    - Sending to embedding API
        - Classify files based on the area of the site
    - Creating pinecone metadata based on area of the app, send to pinecone (or answerai)
    - User command flow
- Enable automated syncing to pincone without embeddings on when a file changes
- Change outputs to nest console statements trees
- highlight the color of the tokens based on size and model used
- handle files over 8k in tokens
- Git action for pull requests that auto create the change log documentation based on the commit history and path file
- 

### UI
- Add ability to select files to use in completion
- Show the user how many tokens they can have in the completion based on what files, model, and prompt they have selected
- add 
- 