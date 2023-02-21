import JiraObject from './jiraObject';

class JiraIssue extends JiraObject {
  constructor(issue) {
    const tidiedIssue = JiraIssue.tidy(issue);
    super(tidiedIssue);
    this.object.objectType = 'JIRA Issue';
    this.object.uid = issue.key;
    this.vectors = this.getVectors();
  }

  static tidy(issue) {
    const { fields, key } = issue;
    const attrs = {
      objectType: 'JIRA Issue',
      // issueTypeId: fields?.issuetype.id,
      issueType: fields?.issuetype.name,
      issueId: key,
      description: fields.description ? JiraIssue.jiraAdfToMarkdown(fields.description) : '',
      summary: fields?.summary,
      // creatorId: fields.creator?.accountId,
      // creator: fields.creator?.displayName,
      // statusId: parseInt(fields.status?.id, 10),
      statusName: fields.status?.name,
      // statusCategoryId: fields.status?.statusCategory?.id,
      statusCategory: fields.status?.statusCategory?.name,
      account: fields.customfield_10037?.value,
      // reporterId: fields.reporter?.accountId,
      reporter: fields.reporter?.displayName,
      // assigneeId: fields.assignee?.accountId,
      assignee: fields.assignee?.displayName,
      // priorityId: fields.priority?.id,
      priority: fields.priority?.name,
      // parentIssue: {
      parentIssueId: fields.parent?.key,
      // parentIssueSummary: fields.parent?.fields?.summary,
      // parentIssueTypeId: fields.parent?.issuetype?.id,
      // issueType: fields.parent?.issuetype?.name
      // },
      projectName: fields.project?.name,
      // projectId: fields.project?.key,
      objectType: 'JIRA Project'
    };
    return {
      text: createContext(key, attrs)
    };
  }
}
const createContext = (id, metadata) => {
  let string = 'For jira issue ' + id + '\n';
  for (const key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      string += `The ${key} is ${metadata[key]}, `;
    }
  }
  return string;
};
export default JiraIssue;
