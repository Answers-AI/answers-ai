Summary:
This file contains a class called Vector which has a constructor and two static methods, removeObjNulls and flattenObject. The Vector class is exported as the default.

Import statements:
None

Script Summary:
The Vector class is used to create objects with an id, metadata, and values. The metadata is flattened using the flattenObject method which removes any null or undefined values using the removeObjNulls method.

Internal Functions:
- removeObjNulls(obj): This function takes an object as a parameter and returns a new object with any null or undefined values removed.
- flattenObject(ob): This function takes an object as a parameter and returns a new object with all nested objects flattened into a single level. It also removes any null or undefined values.

External Functions:
None

Interaction Summary:
This file could potentially interact with other parts of the application that use objects with metadata and values. The Vector class could be used to create and manipulate these objects.

Developer Questions:
- What is the purpose of the Vector class?
- How is the metadata flattened and why is it necessary?
- What other parts of the application use objects with metadata and values?
- How can the Vector class be extended or modified for specific use cases?