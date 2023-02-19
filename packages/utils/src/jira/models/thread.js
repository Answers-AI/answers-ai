import JiraObject from './jiraObject';
class JiraThread extends JiraObject {
  constructor(thread) {
    const tidiedThread = JiraThread.tidy(thread);

    super(tidiedThread);
    this.thread = thread;
    this.object.objectType = 'JIRA Thread';
    this.object.uid = thread.issueKey;
  }

  static tidy(thread) {
    return {
      id: thread?.id,
      issueKey: thread?.issueKey,
      objectType: 'JIRA comments thread',
      text: thread?.text || createContext(thread, this.jiraAdfToMarkdown)
    };
  }

  getVectors() {
    //chunk comments into 10 pero thread and add to vectors
    const vectors = [];
    const { comments } = this.object;
    const chunkSize = 10;
    chunkArray(comments, chunkSize).forEach((chunk, idx) => {
      const vector = {
        id: thread?.id,
        issueKey: `${this.thread?.issueKey}${idx}`,
        objectType: 'JIRA comments thread',
        text: thread?.text || createContext({ ...thread, comments: chunk }, this.jiraAdfToMarkdown)
      };
      vectors.push(vector);
    });
    return vectors;
  }
}
const createContext = (metadata, jiraAdfToMarkdown) => {
  // let string = 'The context for ' + id + ' ';
  let string = '';
  const thread = metadata?.comments
    ?.map(
      ({ author, body, updated, self }) =>
        // `[${self}](${updated} ${author?.displayName}:${jiraAdfToMarkdown(body)}`
        `${author?.displayName}:${jiraAdfToMarkdown(body)}`
    )
    ?.join('\n');
  if (!thread) return '';
  string += `Conversation thread for ${metadata?.issueKey}:\n ${thread}`;
  return string;
};
export default JiraThread;
