Summary:
This file is a React component called SidekickListPage. It imports the getAppSettings function from the '@ui/getAppSettings' module and the SidekickLists component from the '@ui/SidekickLists' module. The component is responsible for rendering the SidekickLists component with the necessary props.

Import statements:
- getAppSettings: A function that retrieves the application settings.
- React: The main React library.
- SidekickLists: A component that displays a list of sidekicks.

Component:
The SidekickListPage component is a server-side component. It is an async function that takes a single parameter, params. It uses the getAppSettings function to retrieve the application settings asynchronously. Once the appSettings are fetched, it renders the SidekickLists component with the params and appSettings as props.

Hooks:
This component does not use any hooks.

Event Handlers:
This component does not have any event handlers.

Rendered components:
- SidekickLists: This component is rendered with the params and appSettings as props.

Interaction Summary:
The SidekickListPage component interacts with the getAppSettings function to fetch the application settings. It then passes the fetched appSettings as a prop to the SidekickLists component. The SidekickLists component is responsible for rendering the list of sidekicks based on the provided props.

Developer Questions:
- How does the getAppSettings function work and what does it return?
- What are the expected properties of the params object?
- How does the SidekickLists component use the appSettings prop?

Known Issues / Todo:
- No known issues or bugs.
- No todo items related to this component.