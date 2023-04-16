Filepath: packages/ui/src/ResizablePanels.tsx
Overview: Summary:
ResizablePanels.tsx is a React component that allows for resizing of panels in four directions (north, south, east, west). It uses the DraggableCore component from react-draggable and lodash.debounce for debouncing. The component is styled using MUI's Box and styled components.

Import statements:
- React: for using React components and hooks
- useState: for managing component state
- useRef: for creating references to DOM elements
- DraggableCore: for creating draggable components
- debounce: for debouncing
- Box: for creating MUI Box components
- styled: for creating styled components
- useTheme: for accessing the MUI theme
- Theme: for typing the MUI theme
- CSSObject: for typing CSS objects
- SxProps: for typing MUI style props

Component:
- ResizePanel: the main component that renders the resizable panel. It takes in props for direction, containerClass, handleClass, borderClass, sx, and children. It uses state to manage the size of the panel and refs to access the content and wrapper elements. It also uses a debounced function to validate the size of the panel after dragging. It renders the handle, content, and wrapper elements.

Hooks:
- useState: for managing component state
- useRef: for creating references to DOM elements

Event Handlers:
- handleDrag: a function that is called when the user is dragging the handle. It calculates the new size of the panel based on the drag delta and the direction of the panel.
- handleDragEnd: a function that is called when the user stops dragging the handle. It validates the size of the panel using the debounced function.

Rendered components:
- StyledResizePanel: a styled div that contains the resizable panel
- ResizeContent: a styled Box component that contains the content of the panel
- ResizeHandle: a styled Box component that contains the handle for resizing the panel
- ResizeBar: a styled Box component that contains the border of the panel

Interaction Summary:
ResizablePanels.tsx is a client-side component that can be used in any React application. It can be used to create resizable panels in four directions. It uses MUI's Box and styled components for styling and can be customized using props for direction, containerClass, handleClass, borderClass, and sx. It interacts with the rest of the application by rendering the resizable panel and allowing the user to resize it.

Developer Questions:
- How can I customize the styling of the resizable panel?
- How can I change the direction of the resizable panel?
- How can I add additional functionality to the resizable panel?
- How does the debounced function work and why is it necessary?
- How can I access the size of the panel from outside the component?

