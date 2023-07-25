Summary:
This file is a React component called SidekickListPage. It imports the getAppSettings function from the '@ui/getAppSettings' module and the SidekickLists component from the '@ui/SidekickLists' module. The component is responsible for rendering the SidekickLists component with the necessary props.

Import statements:
- getAppSettings: A function that retrieves the application settings.
- React: The main React library.
- SidekickLists: A component that displays a list of sidekicks.

Component:
The SidekickListPage component is a server-side component. It is an async function that takes a single parameter, `params`, and returns the SidekickLists component with the `params` and `appSettings` props.

Hooks:
This component does not use any hooks.

Event Handlers:
This component does not define any event handlers.

Rendered components:
- SidekickLists: This component is rendered with the `params` and `appSettings` props.

Interaction Summary:
The SidekickListPage component interacts with other components in the application by rendering the SidekickLists component with the necessary props. It relies on the getAppSettings function to retrieve the application settings before rendering the SidekickLists component.

Developer Questions:
- How are the `params` and `appSettings` props used in the SidekickLists component?
- What does the getAppSettings function do and how does it retrieve the application settings?
- Are there any additional props that can be passed to the SidekickListPage component?

Known Issues / Todo:
- No known issues or bugs with the component.
- No specific todo items related to this component.