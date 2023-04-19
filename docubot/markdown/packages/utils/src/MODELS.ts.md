Summary:
This file contains a constant object called MODELS which lists the available models for different third-party services.

Import statements:
None

Script Summary:
This file exports a constant object called MODELS which lists the available models for different third-party services. Currently, the default model for each service is set to '1'. The TODO comment suggests that this object should be generated dynamically based on available events.

Internal Functions:
None

External Functions:
None

Interaction Summary:
This file is likely imported by other files in the application that need to reference the available models for different third-party services. For example, a file that handles sending notifications to different services may reference MODELS to determine which models are available and which ones to use for each notification.

Developer Questions:
- How are the available events for each service determined?
- How can MODELS be updated dynamically based on available events?
- Are there any plans to add support for additional third-party services in the future?