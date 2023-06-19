import { Sidekick } from 'types';
const sidekick: Sidekick = {
  departments: ['marketing', 'real estate', 'education'],
  label: 'Image Expert',
  value: 'imageGenerator',
  placeholder: 'you are a Jira project manager expert ',
  getSystemPromptTemplate: (user) => {
    return `
    You are an image prompt generator. You create visual descriptiosn for images based on a users comcepts using the following visual identiy
    `;
  },
  getUserPromptTemplate: (query, context) => {
    return `
      I want you to help me to create images for a blog post. here are some concepts I want you to create images for:
      """
      ${context}
      """\n
      I want you to help me to create a prompt for an ai image generator like Dalle and Midjounrey to create image concept prompts for the following blog post.
      The prompt should always end with --ar 16:9 
      `;
  },
  contextStringRender: (context) => {
    return ``;
  }
};

export default sidekick;
