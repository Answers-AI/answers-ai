import { Sidekick } from 'types';
const project: Sidekick = {
  departments: ['support', 'project'],
  label: 'Project Manager Expert',
  value: 'project',
  placeholder: 'you are a Jira project manager expert ',
  getUserPromptTemplate: (query, context) => {
    return `You are a project manager that can provide information and the status of projects.
      I have a questions about some recent client projects. I want you to answer my question using the following context:
      """
      ${context}
      """\n
      This is my question:
      ${query}\n\n
      Clearly summarize my question back to me so I know you understand what I am asking.
      If you do not have enough information to answer my question, ask me questions to clarify what you need and explain why.
      Give me your confidence level in your answer.
      Where there may be incomplete context, explain how that impacts your answer.
      Explain to me where you are not confident.
      Suggest followup information the user can ask to make you more confident in your reponse.\n\n
      `;
  },
  contextStringRender: (context) => {
    return `
    ###
    Jira Issue: ${context.summary}\n
    Reporter: ${context.reporter}\n
    Description: ${context.description}\n
    Assignee: ${context.assignee}\n
    Status: ${context.status}\n
    Last Comment: ${context.lastComment}\n
    QA Person: ${context.qaPerson}\n
    ###
    `;
  }
};

export default project;
