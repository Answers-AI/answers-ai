Summary:
This file is a React component that serves as a page for the chat widget in a larger application. It imports the `getServerSession` function from the `next-auth` library and the `ChatWidget` component from the `@ui/ChatWidget` module. The component is responsible for fetching the server session and passing it as a prop to the `ChatWidget` component.

Import statements:
- `React` is imported from the `react` library.
- `getServerSession` is imported from the `next-auth` library.
- `ChatWidget` is imported from the `@ui/ChatWidget` module.

Component:
The `WidgetChatPage` component is an asynchronous function that takes a `params` object as a parameter. It uses the `getServerSession` function to fetch the server session and then renders the `ChatWidget` component, passing the `params` and `session` props to it.

Hooks:
This component does not use any hooks.

Event Handlers:
This component does not define any event handlers.

Rendered components:
- `ChatWidget`: This component is rendered with the spread operator (`{...params}`) to pass all properties of the `params` object as props. Additionally, the `session` prop is passed to the `ChatWidget` component.

Interaction Summary:
This component is a server-side component as it uses the `getServerSession` function to fetch the server session. It interacts with the `ChatWidget` component by passing the `params` and `session` props to it.

Developer Questions:
- How is the `params` object passed to this component?
- What properties are expected in the `params` object?
- How does the `getServerSession` function work and what does it return?

Known Issues / Todo:
- No known issues or bugs.
- No todo items related to this component.