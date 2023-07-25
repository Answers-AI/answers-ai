Summary:
This file is a client-side React component that represents the layout of a sidekick form. It consists of a main container that contains a SidekickStudioDrawer component and a div container for the form content.

Import statements:
- React: The main React library.
- SidekickStudioDrawer: A custom component that represents a drawer for sidekicks.
- types: A module that contains type definitions for the application.

Component:
The SidekickFormLayout component is a functional component that takes three props: appSettings, children, and sidekicks. It renders a main container with two child components: SidekickStudioDrawer and a div container for the form content.

Hooks:
None.

Event Handlers:
None.

Rendered components:
- SidekickStudioDrawer: This component is rendered as a child of the main container. It receives the sidekicks prop, which is an array of sidekick objects. The component is responsible for rendering the sidekick drawer.

Interaction Summary:
This component is part of a larger application and is used to display the layout of a sidekick form. It interacts with the SidekickStudioDrawer component to render the sidekick drawer. The appSettings prop is used to configure the behavior of the form. The children prop is used to render the form content.

Developer Questions:
- How are the sidekicks passed to the SidekickStudioDrawer component?
- What are the available options in the appSettings prop?
- How can I customize the styling of the form layout?

Known Issues / Todo:
- No known issues or bugs.
- No specific todo items related to this component.