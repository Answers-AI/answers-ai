Summary:
This file exports a function called `chunkArray` which takes an array and a chunk size as input and returns an array of arrays where each sub-array has the specified chunk size or less.

Import statements:
None

Script Summary:
The `chunkArray` function takes an array and a chunk size as input and returns an array of arrays where each sub-array has the specified chunk size or less.

Internal Functions:
None

External Functions:
- `chunkArray(array: T[], chunkSize: number)`: This function takes an array and a chunk size as input and returns an array of arrays where each sub-array has the specified chunk size or less. The function uses the `Array.from()` method to create a new array with a length equal to the number of chunks needed to split the input array. The second argument to `Array.from()` is a mapping function that takes two arguments: the current value and the current index. The mapping function uses the `slice()` method to extract a chunk of the input array starting at the current index and with a length equal to the chunk size.

Interaction Summary:
This file does not interact with the rest of the application directly. It is a utility function that can be used by other parts of the application.

Developer Questions:
- What happens if the input array is empty?
- What happens if the chunk size is greater than the length of the input array?

Known Issues and TODOs:
None