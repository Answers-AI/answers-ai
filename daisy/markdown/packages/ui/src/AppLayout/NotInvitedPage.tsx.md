Summary:
This file contains a React component called "NotInvitedPage" that is part of a larger application. It is a client-side component that renders a page for users who have not been invited to the application's closed beta. The component displays a message and a button to change the account.

Import statements:
- React: The main React library.
- signOut: A function from the "next-auth/react" module that handles user sign out.
- Session: A type from the "next-auth" module that represents the user session.
- Box: A component from the "@mui/material" library that provides a flexible container.
- Button: A component from the "@mui/material" library that renders a button.
- Typography: A component from the "@mui/material" library that renders text with different styles.

Component:
The "NotInvitedPage" component is a functional component that takes a "session" prop of type "Session | undefined". It renders a box container with centered content. Inside the box, it displays a series of Typography components with different text variants. It also renders a Button component that triggers the "signOut" function when clicked.

Hooks:
None.

Event Handlers:
- onClick: The onClick event handler is attached to the Button component. When the button is clicked, it calls the "signOut" function to handle user sign out.

Rendered components:
- Box: A container component that provides layout and styling for its children.
- Typography: Components that render text with different styles.
- Button: A component that renders a button.

Interaction Summary:
This component interacts with the "signOut" function from the "next-auth/react" module to handle user sign out. It also receives the "session" prop, which represents the user session, from its parent component.

Developer Questions:
- How is the "session" prop passed to this component?
- What happens when the "signOut" function is called?
- Can the text content of the Typography components be customized?
- Can the Button component be styled differently?

Known Issues / Todo:
- No known issues or bugs.
- No specific todo items related to this component.