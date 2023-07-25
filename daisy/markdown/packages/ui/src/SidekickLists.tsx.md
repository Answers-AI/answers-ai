Summary:
The provided React file is a client-side component that renders a set of tabs for displaying different lists of sidekicks. It uses the Flagsmith library to conditionally render a "System" tab based on a feature flag. The component also includes a button to add a new sidekick and a snack message for displaying loading status.

Import statements:
- React: The main React library for building user interfaces.
- useState: A React hook for managing state in functional components.
- NextLink: A component from the Next.js library for client-side navigation.
- useFlags: A custom hook from the Flagsmith library for accessing feature flags.
- Box, Tabs, Tab, Typography, Divider, Button: Components from the Material-UI library.
- SnackMessage: A custom component for displaying snack messages.
- SidekickList: A custom component for rendering a list of sidekicks.
- AppSettings: A custom type for representing application settings.

Component:
The SidekickTabs component is a functional component that takes an appSettings prop of type AppSettings. It renders a set of tabs for displaying different lists of sidekicks based on the selected tab. The component also includes a button to add a new sidekick and a snack message for displaying loading status.

Hooks:
- useState: The component uses the useState hook to manage the currentTab state, which represents the currently selected tab, and the isLoading state, which indicates whether the component is currently loading data.

Event Handlers:
- handleTabChange: This event handler is called when the user selects a different tab. It updates the currentTab state with the new selected tab.

Rendered components:
- SnackMessage: This component is rendered to display a snack message with the text "...Loading" when the isLoading state is true.
- Typography: This component renders the heading "Sidekicks".
- Divider: This component renders a horizontal divider.
- Button: This component renders a button with the label "Add New Sidekick". Clicking on the button navigates to the "/sidekick-studio/new" page.
- Tabs: This component renders the set of tabs for selecting different lists of sidekicks.
- Tab: These components represent individual tabs in the Tabs component.
- SidekickList: This component is rendered multiple times, each with a different endpoint prop based on the selected tab. It renders a list of sidekicks.

Interaction Summary:
The SidekickTabs component interacts with other components in the application by rendering the SidekickList component multiple times with different endpoints based on the selected tab. It also interacts with the Flagsmith library to conditionally render the "System" tab based on a feature flag. The component uses the NextLink component for client-side navigation to the "/sidekick-studio/new" page.

Developer Questions:
- How can I customize the labels and values of the tabs?
- How can I add more tabs to the component?
- How can I change the endpoint URLs for fetching sidekick data?
- How can I customize the appearance of the SidekickList component?

Known Issues / Todo:
- No known issues or bugs.
- Todo: Add error handling for failed API requests.