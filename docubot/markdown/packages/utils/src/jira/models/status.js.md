Summary:
This file defines a class called JiraStatus which extends another class called JiraObject. It exports the JiraStatus class as the default export of the module. The class constructor takes a status object as a parameter, tidies it up using the static tidy() method, and sets some properties of the JiraObject instance that it inherits from.

Import statements:
The file imports a class called JiraObject from a module located in the same directory as this file.

Script Summary:
This file defines a class called JiraStatus which extends another class called JiraObject. It exports the JiraStatus class as the default export of the module. The class constructor takes a status object as a parameter, tidies it up using the static tidy() method, and sets some properties of the JiraObject instance that it inherits from.

Internal Functions:
- tidy(status): This is a static method of the JiraStatus class. It takes a status object as a parameter, removes some fields from it, and returns the tidied status object.

External Functions:
None

Interaction Summary:
This file defines a class that is used to represent JIRA statuses in the larger application. It extends another class called JiraObject, which is also used in other parts of the application. Other parts of the application may create instances of the JiraStatus class and use them to represent JIRA statuses.

Developer Questions:
- What fields are removed from the status object in the tidy() method?
- What other classes in the application use the JiraObject class?
- What other classes in the application use the JiraStatus class?

Known Issues and TODOs:
None