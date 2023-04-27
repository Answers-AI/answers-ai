Summary:
This is a client-side React component that renders a chat input box with various features such as prompts, filters, and a send button. It interacts with other components in the application through the AnswersContext and Flagsmith libraries.

Import statements:
- client
- React
- Button from @mui/material/Button
- Box from @mui/material/Box
- FormControlLabel from @mui/material/FormControlLabel
- Switch from @mui/material/Switch
- TextField from @mui/material/TextField
- AddIcon from @mui/icons-material/Add
- useAnswers from ./AnswersContext
- useFlags from flagsmith/react
- DefaultPrompts from ./DefaultPrompts
- Filters from ./Filters
- Tooltip from @mui/material

Component:
- ChatInput: Renders a chat input box with various features such as prompts, filters, and a send button.

Hooks:
- useState: Used to manage state for the input value and whether to show prompts.
- useAnswers: Custom hook that provides access to chat-related data and functions through the AnswersContext.
- useFlags: Custom hook that provides access to feature flags through the Flagsmith library.
- useEffect: Used to perform side effects such as logging.

Event Handlers:
- handleInputChange: Updates the input value state when the user types in the input box.
- handleSubmit: Sends the user's message and clears the input box when the user clicks the send button.
- handlePromptSelected: Updates the input value state with the selected prompt when the user clicks on a prompt.
- handleInputFocus: Hides the prompts if the recommended_prompts_expand flag is set to "blur".
- handleNewChat: Clears the chat history and input box when the user clicks on the new chat button.
- handleKeyPress: Sends the user's message and clears the input box when the user presses the enter key.

Rendered components:
- DefaultPrompts: Renders a list of prompts for the user to select from.
- Filters: Renders a list of filters for the user to select from.
- FormControlLabel: Renders a label for the streaming mode switch.
- Switch: Renders a switch for toggling between query and streaming modes.
- TextField: Renders the input box for the user to type their message.
- Tooltip: Renders a tooltip for the new chat button.
- Button: Renders the send and new chat buttons.

Interaction Summary:
This component interacts with other components in the application through the AnswersContext and Flagsmith libraries. It receives chat-related data and functions from the AnswersContext and uses feature flags from Flagsmith to determine which components to render and how to render them.

Developer Questions:
- What is the structure of the AnswersContext and what data/functions does it provide?
- How are feature flags set and used in the application?
- What is the purpose of the Filters component and how does it interact with the chat input box?
- How does the component handle user input and state changes?

Known Issues and TODOs:
- None.