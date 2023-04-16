Filepath: packages/ui/src/AppsDrawer.tsx
Overview: Summary:
This file contains the AppsDrawer component which displays a list of integration cards and a modal for a selected integration. It uses various dependencies such as React, MUI, Framer Motion, and Next.js.

Import statements:
- React: for building UI components
- Box, ClickAwayListener: MUI components for building UI
- AnimatePresence, motion: Framer Motion components for building animations
- AppSettings: a custom type for app settings
- useRouter: a Next.js hook for handling routing
- IntegrationCard: a custom component for displaying integration cards

Component:
- AppsDrawer: a functional component that takes in appSettings and activeApp as props and returns a JSX element. It displays a list of integration cards and a modal for a selected integration.

Hooks:
- useRouter: a Next.js hook for handling routing

Event Handlers:
- onClick: an event handler for clicking on an integration card. It navigates to the integration's settings page.

Rendered components:
- Box: a MUI component for building a container with a grid layout
- IntegrationCard: a custom component for displaying integration cards
- AnimatePresence: a Framer Motion component for animating the modal
- ClickAwayListener: a MUI component for handling clicks outside of a component
- motion: a Framer Motion component for animating the modal

Interaction Summary:
This file is a client-side component that is part of a larger application. It displays a list of integration cards and a modal for a selected integration. The component uses Next.js for routing and MUI and Framer Motion for building the UI and animations.

Developer Questions:
- How are the appSettings and activeApp props passed down to this component?
- How does the onClick event handler navigate to the integration's settings page?
- How does the AnimatePresence component animate the modal?
- How does the ClickAwayListener component handle clicks outside of the modal?

