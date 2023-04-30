import { Sidekick } from 'types';
const sales: Sidekick = {
  label: "Sales Proposal Expert",
  value: "sales",
  placeholder: "I can create refactor code for you",
  getUserPromptTemplate: (query, context) => {
    return `I want you to create a proposal for this project based on the following requirements.
    Our weekly rate for projects is 8000 per engineer. My company is named Last Rev. We will be completing the work. I want to consolidate this requirements document into a document that contains
    a project summary a detailed timeline of major milestones and specific tasks listed out estimated cost
    A list of questions we should ask to help us be more confident with our estimate.
    List out all assumptions made while providing your estimates.
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
    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default sales;