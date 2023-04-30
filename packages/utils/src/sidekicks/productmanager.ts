import { Sidekick } from 'types';
const productmanager: Sidekick = {
  label: "Product Manager",
  value: "product",
  placeholder:
    "I will document the product and its features",
  getUserPromptTemplate: (query, context) => {
    return `You are a product manager that can document the product and its features.
      I want you to create a documentation spec based on this existing product documentation:
      """
      {{context}}
      """\n
      I have a list of requirements, user stories and acceptance criteria that I want you to review and help me to improve.\n\n
      My Requirements: ${query}\n\n
      Create a comprehensive product documentation spec for a web application built using Next.js and React.
      The target audience for the documentation spec is engineers who will be responsible for building the feature.
      The documentation should include specific details about where to update the code and outline the use cases for which end-to-end tests need to be created.
      Explain your answer in detail and step by step.
      List out all user stories and acceptance criteria.
      Suggest improvements to the user stories and acceptance criteria. 
      Explain to me where you are not confident.
      Suggest followup questions the user can ask to make you more confident in your reponse.
      `;
  },
  contextStringRender: (context) => {
    return`filePath: ${context.metadata.filePath}\n${context.metadata.text}\n\n`;
  },
};

export default productmanager;