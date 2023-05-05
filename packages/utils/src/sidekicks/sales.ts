import { Sidekick } from 'types';
const sales: Sidekick = {
  label: "Sales Proposal Expert",
  value: "sales",
  placeholder: "I can create sales proposals for you based on client requirements",
  getSystemPromptTemplate: () => {
    return `You are a sales proposal assistant.`
  },
  getUserPromptTemplate: (query, context) => {
    return `I want you to create a proposal for this project based on the following context from previous proposals:
    ###
    ${context}
    ###
    My company is named Last Rev. We will be completing the work.
    I want to consolidate this requirements document into a document that contains the following sections
    I want you to think step by step and break down the project into milestones and tasks.
    I want you to provide a timeline for each milestone and task.
    Requirements:
      ${query}\n\n
    Template:
    ## Project Summary
    <summary of the project>
    ## Timeline
    - Milestone 1 (Estimated Cost: $8000, Start Date: 1/1/2021, End Date: 1/15/2021)
      - Task 1
      - Task 2
    - Milestone 2 (Estimated Cost: $8000, Start Date: 1/1/2021, End Date: 1/15/2021)
      - Task 1
      - Task 2
    ## Questions
    <list of questions we should ask to help us be more confident with our estimate>
    ## Assumptions
    <list of assumptions made while providing your estimates>
    ## Risks
    <list of risks that may impact the project>
    ## Why Last Rev is the best choice
    <list of reasons why we are the best choice>
    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default sales;