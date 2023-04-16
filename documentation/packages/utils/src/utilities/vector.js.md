Filepath: packages/utils/src/utilities/vector.js
Overview: Summary:
This file contains a class called Vector that has a constructor and two static methods. The constructor takes in an id, metadata, and values and assigns them to the class properties. The static methods are used to remove null values from an object and flatten an object respectively.

Import statements:
This file does not have any import statements.

Script Summary:
This file exports a class called Vector that has a constructor and two static methods. The constructor takes in an id, metadata, and values and assigns them to the class properties. The static methods are used to remove null values from an object and flatten an object respectively.

Internal Functions:
- removeObjNulls(obj): This function takes in an object and removes any key-value pairs where the value is null or undefined. It returns a new object with the null values removed.
- flattenObject(ob): This function takes in an object and flattens it by combining nested objects into a single object with concatenated keys. It uses recursion to flatten all nested objects. It then calls the removeObjNulls function to remove any null values from the flattened object. It returns the flattened object.

External Functions:
This file exports a class called Vector.

Interaction Summary:
This file could potentially interact with other parts of the application that use the Vector class. Other parts of the application could create instances of the Vector class and pass in the required parameters. The flattenObject method could also be used to flatten objects in other parts of the application.

Developer Questions:
- What is the purpose of the Vector class?
- What are the required parameters for creating a new instance of the Vector class?
- How does the flattenObject method work?
- What is the expected output of the removeObjNulls method?
- Are there any potential issues with using the flattenObject method on large or deeply nested objects?

