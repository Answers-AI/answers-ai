Summary:
This file contains a class called JiraStatusCategory which extends JiraObject. It has a constructor that takes in a statusCategory object and tidies it using a static method called tidy. It also sets the object type and uid of the JiraObject. The class is then exported.

Import statements:
The file imports JiraObject from "./jiraObject".

Script Summary:
This file exports a class called JiraStatusCategory which extends JiraObject. It tidies the statusCategory object passed to it and sets the object type and uid of the JiraObject.

Internal Functions:
- tidy(statusCategory): This function takes in a statusCategory object and removes the "self", "colorName", and "key" fields from it. It then returns the tidied object.

External Functions:
None.

Interaction Summary:
This file does not interact with the larger application directly. However, it extends JiraObject which may be used in other parts of the application.

Developer Questions:
- What is the purpose of JiraObject and how is it used in the application?
- What other classes extend JiraObject and how do they interact with JiraStatusCategory?
- What is the expected format of the statusCategory object passed to the constructor?

Known Issues and TODOs:
None.