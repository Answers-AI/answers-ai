import { Sidekick } from 'types';
const marketing: Sidekick = {
  label: "Marketing Expert",
  value: "marketing",
  placeholder: "I can write great marketing copy",
  getSystemPromptTemplate: () => {
    return `You are an digital marketing and English writing expert.
    `
  },
  getUserPromptTemplate: (query, context) => {
    return `You are an digital marketing and English writing expert.
    ###
    ${context}
    ###
    I want you to write an engaging post on producthunt and slashdot targeted towards engineers with these guidelines:
    ${query}\n\n
    Provide specific use cases and examples of how the product could help enginners of all skill levels.
    Example:
    Are you tired of spending hours upon hours trying to create high-quality business applications? Do you find yourself constantly battling with broken builds, security flaws, complex deployments, and a never-ending list of bugs? Developing web applications can often feel like trying to navigate a maze blindfolded. And just when you think you've reached the end, compliance laws and the need for new marketing pages pop up, adding to your already overwhelming workload.

But fear not, because JSEngine is here to help. Think of JSEngine as the map that guides you through the maze. It simplifies the process of developing composable business applications across a wide range of services, making the development process more efficient and less stressful.

Imagine trying to build a large-scale marketing site, complete with a knowledge base, learning management system, and universal search. That's a daunting task, but with JSEngine, you can accomplish it all in one solution. No more jumping between different frameworks, trying to get them to work together. JSEngine provides a unified solution that allows you to create complex business apps quickly and easily.

JSEngine is an open-source framework, which means it's free to use and customizable to your specific needs.

    `;
  },
  contextStringRender: (context) => {
    return`filePath: ${context.metadata.filePath}\n${context.metadata.text}\n\n`;
  },
};

export default marketing;