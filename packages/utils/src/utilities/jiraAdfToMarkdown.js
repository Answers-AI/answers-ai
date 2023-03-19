export const jiraAdfToMarkdown = (node) => {
  if (!node) return '';

  if (node.type === 'doc') {
    return node.content.map((item) => `${jiraAdfToMarkdown(item)}`).join('');
  } else if (node.type === 'text') {
    return node.text;
  } else if (node.type === 'hardBreak') {
    return '..';
  } else if (node.type === 'mention') {
    return `@${node.attrs.username}`;
  } else if (node.type === 'emoji') {
    return ''; //`:${node.attrs.shortName}:`;
  } else if (node.type === 'link') {
    return `[${node.text}](${node.attrs.url})`;
  } else if (node.type === 'mediaGroup') {
    return node.content.map(jiraAdfToMarkdown).join('');
  } else if (node.type === 'paragraph') {
    return `${node.content.map(jiraAdfToMarkdown).join(' ')} `;
  } else if (node.type === 'bulletList') {
    return node.content.map((item) => `${jiraAdfToMarkdown(item)}`).join(', ');
  } else if (node.type === 'listItem') {
    return node.content.map((item) => `- ${jiraAdfToMarkdown(item)}`).join(', ');
  } else if (node.type === 'orderedList') {
    return node.content.map((item, index) => `${index + 1}. ${jiraAdfToMarkdown(item)}`).join(' ');
  } else if (node.type === 'heading') {
    return `${'#'.repeat(node.attrs.level)} ${node.content.map(jiraAdfToMarkdown).join(' ')}`;
  } else if (node.type === 'codeBlock') {
    return `\`\`\`${node.text}\`\`\``;
  } else if (node.type === 'blockquote') {
    return `> ${node.content.map(jiraAdfToMarkdown).join('')}`;
  } else {
    return '';
  }
};
