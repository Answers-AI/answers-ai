import { Document } from 'types';

interface TreeNode {
  id: string;
  path: string;
  children: TreeNode[];
}

export function buildTree(urls: Document[]): TreeNode {
  const root: TreeNode = {
    id: 'root',
    path: '',
    children: []
  };

  const insertNode = (node: TreeNode, path: string[]): void => {
    const [current, ...rest] = path;

    let child = node.children.find((child) => child.path === current);
    if (!child) {
      child = {
        id: `${node.id}-${node.children.length + 1}`,
        path: current,
        children: []
      };
      node.children.push(child);
    }

    if (rest.length > 0) {
      insertNode(child, rest);
    }
  };

  for (const url of urls) {
    const domain = new URL(url.url).hostname;
    const path = url.url
      .replace(`https://${domain}`, '')
      .split('/')
      .filter((segment) => segment.length > 0);
    insertNode(root, [domain, ...path]);
  }

  return root;
}
