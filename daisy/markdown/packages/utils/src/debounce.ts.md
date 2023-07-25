Summary:
This code defines a debounce function that can be used to delay the execution of a function until a certain amount of time has passed without any further calls to the function. It provides options for controlling whether the function should be executed immediately (leading) or after the delay (trailing).

Import statements:
- None

Script Summary:
The script exports a single function called `debounce`. This function takes in a function `func`, a delay time `wait`, and optional options for controlling the leading and trailing behavior. It returns a debounced version of the input function.

Internal Functions:
- `clear`: This function clears the timeout if it exists.
- `invoke`: This function clears the timeout, invokes the original function with the last arguments and context, and resets the last arguments and context.

External Functions:
- `debounce`: This is the main function that takes in the original function, delay time, and options. It returns a debounced version of the original function. It internally uses the `clear` and `invoke` functions to handle the debouncing logic.

Interaction Summary:
This script can be used as a utility function in other parts of the application where debouncing is required. Developers can import and use the `debounce` function to wrap their functions and control the delay between consecutive calls.

Developer Questions:
- How do I use the `debounce` function in my code?
- What are the options for controlling the leading and trailing behavior?
- How can I cancel a debounced function before it is executed?
- Are there any potential issues or bugs with this implementation?