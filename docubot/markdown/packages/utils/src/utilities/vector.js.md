Summary:
This file contains a class called Vector which has a constructor and two static methods. The constructor takes in an id, metadata, and values and assigns them to the class properties. The static methods are used to remove null values from an object and flatten a nested object respectively.

Import statements:
This file does not have any import statements.

Script Summary:
This file exports a class called Vector which has a constructor and two static methods. The constructor takes in an id, metadata, and values and assigns them to the class properties. The static methods are used to remove null values from an object and flatten a nested object respectively.

Internal Functions:
- removeObjNulls(obj): This function takes in an object and removes any key-value pairs where the value is null or undefined. It returns a new object with the null values removed.
- flattenObject(ob): This function takes in a nested object and flattens it by concatenating the keys of nested objects with their parent keys. It then calls removeObjNulls to remove any null values and returns the flattened object.

External Functions:
This file exports a class called Vector which has a constructor and two static methods. The constructor takes in an id, metadata, and values and assigns them to the class properties. The static methods are used to remove null values from an object and flatten a nested object respectively.

Interaction Summary:
This file does not interact with any other parts of the application. It is meant to be used as a standalone class.

Developer Questions:
- What is the purpose of the flattenObject method?
- How is the removeObjNulls method used in this class?
- Can the Vector class be extended to add more functionality?

Known Issues and TODOs:
There are no known issues or TODOs for this file.