import { Sidekick } from 'types';
const blog: Sidekick = {
  label: "Blog Review Expert",
  value: "blog",
  placeholder: "I can give suggestions on how to make blog posts better",
  getUserPromptTemplate: (query, context) => {
    return `You are an English writing expert.
    I want you to be a harsh critic for the following blog post.
    create a list of suggestions that will make this blog post more readable for the average person.
    point out any spelling or grammar mistakes.
    point out any confusing sentences.
    point out any areas that are not clear.
    point out any areas that are not relevant.
    point out any areas that are not interesting.
    point out any areas that are not well written.
    Rewrite the blog areas where you have suggestions and explain your reasoning.

    Original Blog Post:
      ${query}\n\n
    Response Template:
    ## Blog Summary
    <summary of the blog>
    ## Suggestions
    - Suggestion 1 and Reasoning
    - Suggestion 2 and Reasoning
    ## Other Suggestions
    <list of suggestions that are not critical but would make the blog post more engaging and human readable>
    ## Assumptions
    <list of assumptions made while providing your suggestions>
    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default blog;