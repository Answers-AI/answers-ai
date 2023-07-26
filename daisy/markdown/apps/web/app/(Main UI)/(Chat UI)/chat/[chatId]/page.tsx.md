Summary:
The provided React file is a server-side component that renders a chat detail page. It fetches data from a database using Prisma and displays the chat messages, users, and other related information. If the user accessing the page is not a participant in the chat, it renders a "ChatNotFound" component. The main component used in this file is the "Chat" component.

Import statements:
- React: The main React library.
- prisma: The Prisma client for interacting with the database.
- Chat: The main chat component for rendering the chat detail page.
- ChatNotFound: A component to render when the chat is not found.
- getCachedSession: A utility function to retrieve the cached user session.

Component:
- ChatDetailPage: The main component that renders the chat detail page. It is an async function that takes the "params" object as a parameter.

Hooks:
- None

Event Handlers:
- None

Rendered components:
- Chat: The main chat component that renders the chat detail page. It receives the "params" object, the "chat" object, and the "journey" object as props.

Interaction Summary:
The ChatDetailPage component interacts with the Prisma client to fetch the chat data from the database. It includes the chat messages, users, prompt, journey, and context documents. It also uses the getCachedSession utility function to retrieve the user session. If the user accessing the page is not a participant in the chat, it renders the ChatNotFound component. The Chat component is rendered with the fetched chat data and the journey object.

Developer Questions:
- How does the Prisma client connect to the database?
- What is the structure of the "chat" object returned from the Prisma query?
- How does the getCachedSession function work?
- How is the "params" object passed to the Chat component?
- How does the Chat component handle user interactions and state management?

Known Issues / Todo:
- No known issues or bugs.
- No specific todo items related to this component.