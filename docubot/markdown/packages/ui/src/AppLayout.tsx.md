Summary:
This file contains the AppLayout component which is responsible for rendering the main layout of the application. It includes the AppDrawer component, which is a side navigation menu, and the children components that are nested within it. It also handles user authentication and renders the Auth component if the user is not authenticated.

Import statements:
- client: custom module for handling client-side API requests
- React: library for building user interfaces
- Box, Button, CssBaseline, Typography: components from the Material-UI library for styling
- ThemeProvider: component from Material-UI for theming
- FlagsmithProvider: component from the Flagsmith library for feature flag management
- flagsmith: client-side module for interacting with the Flagsmith API
- SessionProvider, signOut: components from the next-auth library for user authentication
- Session: type definition for user session data
- Auth: custom component for handling user authentication
- AppDrawer: custom component for rendering the side navigation menu
- darkModeTheme: custom theme object for Material-UI
- GlobalStyles: custom component for global CSS styles
- AppSettings: type definition for application settings

Component:
The AppLayout component is a server-side component that renders the main layout of the application. It accepts several props including session, appSettings, providers, params, children, and flagsmithState. It uses the FlagsmithProvider component to manage feature flags and the ThemeProvider component to apply custom styling to the application. If the user is authenticated, it renders the AppDrawer component and the children components. If the user is not authenticated, it renders the Auth component.

Hooks:
None

Event Handlers:
None

Rendered components:
- FlagsmithProvider: component for managing feature flags
- ThemeProvider: component for applying custom styling to the application
- CssBaseline: component for applying global CSS styles
- GlobalStyles: custom component for global CSS styles
- html: root element for the application
- body: element for the main content of the application
- AppDrawer: custom component for rendering the side navigation menu
- div: element for wrapping the children components

Interaction Summary:
The AppLayout component interacts with several other components in the application including the AppDrawer, Auth, and children components. It also interacts with the FlagsmithProvider and next-auth libraries for feature flag management and user authentication, respectively.

Developer Questions:
- What are the available appSettings that can be passed to the AppLayout component?
- How can I customize the styling of the AppDrawer component?
- How can I add additional children components to the AppLayout component?

Known Issues and TODOs:
None