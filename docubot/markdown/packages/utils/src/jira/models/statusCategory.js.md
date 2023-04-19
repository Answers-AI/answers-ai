Summary:
This file contains a class for JiraStatusCategory, which extends JiraObject. It also includes a static method for tidying up the status category object.

Import statements:
The file imports JiraObject from "./jiraObject".

Script Summary:
The JiraStatusCategory class constructor takes in a statusCategory object, tidies it up using the static tidy method, and sets the object type and uid properties. The tidy method removes certain fields from the statusCategory object. The class extends JiraObject and exports JiraStatusCategory.

Internal Functions:
- tidy(statusCategory): This static method takes in a statusCategory object, removes certain fields from it, and returns the tidied object.

External Functions:
None.

Interaction Summary:
This file is part of a larger application that likely interacts with Jira. It provides a way to create and manipulate Jira status categories.

Developer Questions:
- What other classes extend JiraObject?
- What other Jira-related classes are in the application?
- How are Jira status categories used in the application?
- What fields are removed by the tidy method, and why?