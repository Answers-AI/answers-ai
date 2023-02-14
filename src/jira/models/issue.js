const JiraObject = require("./jiraObject");

class JiraIssue extends JiraObject {
  constructor(issue) {
    const tidiedIssue = JiraIssue.tidy(issue);
    super(tidiedIssue);
    this.object.objectType = "JIRA Issue";
    this.object.uid = issue.key;
  }

  static tidy(issue) {
    const { fields, key } = issue;
    return {
      objectType: "JIRA Issue",
      // issueTypeId: fields?.issuetype.id,
      issueType: fields?.issuetype.name,
      issueId: key,
      description: fields.description
        ? JiraIssue.jiraAdfToMarkdown(fields.description)
        : "",
      summary: fields?.summary,
      // creatorId: fields.creator?.accountId,
      // creator: fields.creator?.displayName,
      // statusId: parseInt(fields.status?.id, 10),
      status: {
        name: fields.status?.name,
        // statusCategoryId: fields.status?.statusCategory?.id,
        category: fields.status?.statusCategory?.name,
      },
      account: fields.customfield_10037?.value,
      // reporterId: fields.reporter?.accountId,
      reporter: fields.reporter?.displayName,
      // assigneeId: fields.assignee?.accountId,
      assignee: fields.assignee?.displayName,
      // priorityId: fields.priority?.id,
      priority: fields.priority?.name,
      parentIssue: {
        // parentIssueId: fields.parent?.key,
        // parentIssueSummary: fields.parent?.fields?.summary,
        // parentIssueTypeId: fields.parent?.issuetype?.id,
        issueType: fields.parent?.issuetype?.name,
      },
      project: {
        name: fields.project?.name,
        // projectId: fields.project?.key,
        objectType: "JIRA Project",
      },
    };
  }
}

module.exports = JiraIssue;
