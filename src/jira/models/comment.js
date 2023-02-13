const JiraObject = require("./baseObject");
class JiraComment extends JiraObject {
  constructor(comment) {
    const tidiedComment = JiraComment.tidy(comment);
    super(tidiedComment);
    this.object.objectType = "JIRA Comment";
    this.object.uid = comment.id;
  }

  static tidy(comment) {
    delete comment.updateAuthor;
    delete comment.jsdPublic;
    delete comment.visibility;

    comment.objectType = "JIRA Comment";
    comment.author = comment.author.displayName;
    comment.body = this.jiraAdfToMarkdown(comment.body.content);

    return comment;
  }
}

module.exports = JiraComment;
