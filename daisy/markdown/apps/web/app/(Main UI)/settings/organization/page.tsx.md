Summary:
This file is a React component that represents a page for editing organization settings. It imports the necessary dependencies and components, retrieves the organization data from the database, and renders the OrganizationForm component with the retrieved data.

Import statements:
- React: The main React library.
- prisma: The Prisma client for interacting with the database.
- OrganizationForm: A custom UI component for editing organization settings.
- authOptions: Options for authentication.
- getCachedSession: A function for retrieving the cached user session.

Component:
The OrganizationFormPage component is an async function that takes a params object as a parameter. It retrieves the user session using the getCachedSession function and checks if the user has an organizationId. If not, it returns null. It then queries the database using the prisma client to retrieve the organization data based on the user's organizationId. The selected fields are id, name, and contextFields. The retrieved data is parsed and passed as props to the OrganizationForm component.

Hooks:
None

Event Handlers:
None

Rendered components:
- OrganizationForm: A custom UI component for editing organization settings. It receives the params and organization props.

Interaction Summary:
This component interacts with the database using the prisma client to retrieve organization data. It also interacts with the OrganizationForm component by passing the retrieved organization data as props.

Developer Questions:
- How is the user session cached and retrieved using the getCachedSession function?
- How does the prisma client connect to the database and perform the query?
- What are the available props for the OrganizationForm component and how are they used?

Known Issues / Todo:
- No known issues or bugs.
- No todo items mentioned in the code.