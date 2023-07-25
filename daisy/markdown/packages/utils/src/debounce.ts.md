Summary:
This code provides a debounce function that can be used to limit the frequency of function calls. It takes a function, a wait time, and optional options as parameters and returns a debounced version of the function. The debounced function will only be called once after the specified wait time has passed since the last call.

Import statements:
- None

Script Summary:
The script exports a function named "debounce" that takes a function, a wait time, and optional options as parameters. It returns a debounced version of the function.

Internal Functions:
- clear: This function clears the timeout if it exists.
- invoke: This function clears the timeout, invokes the original function with the last arguments and context, and resets the last arguments and context.

External Functions:
- debounce: This function takes a function, a wait time, and optional options as parameters. It returns a debounced version of the function. The debounced function will only be called once after the specified wait time has passed since the last call.

Interaction Summary:
This script can be used as a utility function in other parts of the application where debouncing is required. Developers can import the "debounce" function and use it to create debounced versions of their functions.

Developer Questions:
- How do I use the debounce function in my code?
- What are the options I can pass to the debounce function?
- How can I cancel a debounced function call? (The commented out line suggests there might be a cancel method)