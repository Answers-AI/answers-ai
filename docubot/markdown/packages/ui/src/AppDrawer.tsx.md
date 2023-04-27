Summary:
This file defines the `AppDrawer` component, which is a sidebar navigation menu for the application. It is a client-side component that uses Material-UI components and styles to create a responsive and collapsible drawer. The drawer displays a list of navigation items, some of which are conditionally rendered based on feature flags and the current environment.

Import statements:
This file imports various Material-UI components, Next.js components, and hooks from external libraries such as `flagsmith/react` and `next/navigation`.

Component:
`AppDrawer` is the main component in this file, which takes a `params` prop.

Hooks:
- `useFlags`: Fetches feature flags from the Flagsmith API.
- `usePathname`: Retrieves the current pathname from Next.js navigation.

Event Handlers:
- `signOut`: Handles user sign out by calling the `signOut` function from `next-auth/react`.

Rendered components:
- `Drawer`: The main container for the navigation menu.
- `DrawerHeader`: The header section of the drawer, containing the app logo.
- `List`: A list of navigation items, conditionally rendered based on feature flags and environment.
- `ListItem`: Individual navigation items, wrapped in Next.js `Link` components.

Interaction Summary:
The `AppDrawer` component is used in the main layout of the application and provides navigation between different pages. It interacts with the Flagsmith API to fetch feature flags and conditionally render navigation items based on the flags' values.

Developer Questions:
- How are feature flags managed and updated in the application?
- How can I add or remove navigation items from the drawer?

Known Issues and TODOs:
- The `params` prop is not currently used in the component, and there is a TODO comment mentioning the need to use it in the future. This should be addressed when the related issue in the Next.js repository is resolved.
- The component could benefit from better prop validation and TypeScript typings for the `params` prop.

Props:

| Prop   | Type | Description                              |
| ------ | ---- | ---------------------------------------- |
| params | any  | An object containing parameters for the request. Currently unused in the component. |