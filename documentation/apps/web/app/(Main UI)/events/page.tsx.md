Filepath: apps/web/app/(Main UI)/events/page.tsx
Overview: Summary:
This file exports a React component called "Inngest" which renders an iframe with a toolbar component on top. The iframe source is set to a URL defined by the INNGEST_SERVER_URL constant.

Import statements:
- AppSyncToolbar: A custom toolbar component.
- React: The main React library.
- getAppSettings: A function that retrieves the application settings.

Component:
- Inngest: A functional component that renders an iframe with a toolbar component on top.

Hooks:
- None.

Event Handlers:
- None.

Rendered components:
- AppSyncToolbar: A custom toolbar component.
- iframe: An HTML element that displays a web page within another web page.

Interaction Summary:
This file is a client-side component that renders a web page within the main UI of the application. It interacts with the getAppSettings function to retrieve the application settings and displays them in the toolbar component. The INNGEST_SERVER_URL constant defines the URL of the web page to be displayed within the iframe.

Developer Questions:
- What is the purpose of the INNGEST_SERVER_URL constant?
- How does the getAppSettings function work and what information does it retrieve?
- Can the iframe source be changed dynamically based on user input?
- Are there any security concerns with displaying an external web page within the application?

