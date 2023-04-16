Filepath: packages/ui/src/ChatInput.tsx
Overview: Summary:
ChatInput.tsx is a React component that renders a chat input box with various features such as prompts, filters, and a send button. It also includes a toggle switch for streaming mode and a clear messages button.

Import statements:
- React: for building UI components
- useState: for managing state within the component
- Button, Box, FormControlLabel, Switch, TextField: UI components from the Material-UI library
- DeleteIcon: an icon from the Material-UI library
- useAnswers: a custom hook from the AnswersContext file
- useFlags: a custom hook from the Flagsmith library
- DefaultPrompts: a custom component for displaying prompts
- Filters: a custom component for displaying filters

Component:
ChatInput is a functional component that takes in two props: inputRef and isWidget. It returns a Box component that contains various UI components such as a TextField, a Switch, and a Button. It also renders two custom components: DefaultPrompts and Filters.

Hooks:
- useState: used to manage the state of inputValue and showPrompts
- useAnswers: a custom hook that provides access to various data and functions related to the chat
- useFlags: a custom hook that provides access to feature flags

Event Handlers:
- handleInputChange: updates the inputValue state when the user types in the TextField
- handleSubmit: sends the user's message when the user clicks the send button
- handlePromptSelected: updates the inputValue state when the user selects a prompt
- handleInputFocus: hides the prompts when the user clicks on the TextField

Rendered components:
- DefaultPrompts: a custom component that displays prompts for the user to select
- Filters: a custom component that displays filters for the user to select
- TextField: a Material-UI component that allows the user to input text
- Switch: a Material-UI component that toggles between query and streaming mode
- Button: a Material-UI component that triggers the handleSubmit function when clicked
- DeleteIcon: a Material-UI icon that triggers the clearMessages function when clicked

Interaction Summary:
ChatInput interacts with the rest of the application through the useAnswers and useFlags hooks. It also triggers the sendMessage and clearMessages functions from the useAnswers hook when the user sends a message or clicks the clear messages button. Additionally, it provides a toggle switch for streaming mode, which may affect how the chat data is retrieved and displayed.

Developer Questions:
- What data and functions are available through the useAnswers hook?
- What feature flags are available through the useFlags hook?
- How does the sendMessage function work?
- How does the clearMessages function work?
- How does the streaming mode affect the chat data?
- How are the prompts and filters populated and updated?

