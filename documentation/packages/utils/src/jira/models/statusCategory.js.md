Filepath: packages/utils/src/jira/models/statusCategory.js
Overview: Summary:
This file defines a JiraStatusCategory class that extends the JiraObject class. It provides a constructor that takes a statusCategory object and tidies it up by removing certain fields. It also sets the object type and uid properties of the JiraObject instance.

Import statements:
- JiraObject: a class that represents a Jira object and provides methods for tidying up Jira data.

Script Summary:
- Defines a JiraStatusCategory class that extends the JiraObject class.
- Provides a constructor that takes a statusCategory object and tidies it up by removing certain fields.
- Sets the object type and uid properties of the JiraObject instance.
- Exports the JiraStatusCategory class.

Internal Functions:
- tidy(statusCategory): removes the "self", "colorName", and "key" fields from the statusCategory object. Returns the tidied object.

External Functions:
- None

Interaction Summary:
- This file is part of a larger application that interacts with Jira.
- The JiraStatusCategory class is likely used to represent Jira status categories in the application.
- Other parts of the application may create instances of the JiraStatusCategory class and use its properties and methods.

Developer Questions:
- What other classes extend the JiraObject class?
- What other Jira objects does the application interact with?
- How are instances of the JiraStatusCategory class used in the application?

