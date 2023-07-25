Summary:
This file is a React component called "JourneySettings" that is responsible for rendering different sources based on the "app" prop passed to it. It imports various source components such as SourcesAirtable, SourcesConfluence, etc., and maps them to the corresponding "app" value in the JOURNEY_SETTINGS object. It handles cases where the "app" prop is not found or is empty by displaying a message or returning null.

Import statements:
- React: The main React library.

Component:
- JourneySettings: This is the main component that renders different source components based on the "app" prop.

Hooks:
- None.

Event Handlers:
- None.

Rendered components:
- SourcesAirtable: Renders the Airtable source component.
- SourcesConfluence: Renders the Confluence source component.
- SourcesCodebase: Renders the Codebase source component.
- SourcesFile: Renders the File source component.
- SourcesJira: Renders the Jira source component.
- SourcesSlack: Renders the Slack source component.
- SourcesWeb: Renders the Web source component.
- SourcesYoutube: Renders the Youtube source component.
- SourcesDocument: Renders the Document source component.
- SourcesZoom: Renders the Zoom source component.

Interaction Summary:
This component is a client-side component that interacts with other components by rendering the appropriate source component based on the "app" prop. It does not have any direct interaction with server-side components or APIs.

Developer Questions:
- How can I add a new source component to be rendered based on a new "app" value?
- How can I customize the message displayed when the "app" prop is not found or is empty?

Known Issues / Todo:
- No known issues or bugs.
- No todo items related to this component.