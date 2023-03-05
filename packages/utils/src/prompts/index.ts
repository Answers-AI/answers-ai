// Export an object as a module export
import { jiraAdfToMarkdown } from '../utilities/jiraAdfToMarkdown';

interface PromptConfigurations {
    [key: string]: {
        summarizer: (data: any) => string;
        pinconeQuery: (embeddings: number[]) => any;
        metadata: (data: any) => any;
        queries: {
            [key: string]: (prompt: string, context: string) => string;
        };
    };
}

const prompts: PromptConfigurations = {
    'bradprompts': {
        'summarizer':(data: any) => {
            return `${data?.key} is a Jira ticket and the ${Object.entries({
                'status category': data?.fields.status?.statusCategory?.name,
                'status': data?.fields.status?.name,
                'account': data?.fields.customfield_10037?.value,
                'priority': data?.fields.priority?.name,
                'the project name': data?.fields.project?.name,
                'the reporter': data?.fields.reporter?.displayName,
                'assigned to': data?.fields.assignee?.displayName || 'Unassigned',
                'assignee email': data?.fields.assignee?.email,
                'the parent key': data?.fields.parent?.key,
                'the link': `https://lastrev.atlassian.net/browse/${data?.key}`,
                'the description': data?.fields.description
                  ? jiraAdfToMarkdown(data?.fields.description)
                  : '',
                'the summary': data?.fields?.summary
              })
                .filter(([key, value]) => !!value)
                .map(([key, value]) => `${key} is ${value}`)
                ?.join(', ')}\n The comments for ${data?.key} are ${data?.comments
                ?.map(
                  ({ author, body, updated, self }: any) =>
                    // `[${updated} - ${author?.displayName}](${self}): ${jiraAdfToMarkdown(body)}`
                    `${author?.displayName} at ${updated}: "${jiraAdfToMarkdown(body)}"`
                )
                ?.join('\n')}`;
        },
        'pinconeQuery': (embeddings: number[]) => {
            return {
                vector: embeddings,
                topK: 5,
                includeMetadata: true,
                namespace: process.env.PINECONE_INDEX_NAMESPACE
            }
        },
        'metadata': (data: any) => {
            return {
                'key': data?.key,
                'account': data?.fields.customfield_10037?.value,
                'projectName': data?.fields.project?.name,
                'reporter': data?.fields.reporter?.displayName,
                'assignee name': data?.fields.assignee?.displayName || 'Unassigned',
                'assignee email': data?.fields.assignee?.email,
                'priority': data?.fields.priority?.name,
                'status': data?.fields.status?.name,
                'status category': data?.fields.status?.statusCategory?.name,
                'parent key': data?.fields.parent?.key,
                'bradstest': 'true',
                'description': data?.fields.description
                  ? jiraAdfToMarkdown(data?.fields.description)
                  : ''
            }
        },
        'queries': {
            'bundlestatus': (prompt: string, context: string) => {
                return `You are a brad expert in software project management. You will provide answers with related information.
                        Answer the following request based on the context provided.
                        I will give you the questions in the format: 
                        CONTEXT: {CONTEXT}
                        Question: {QUESTION}
                        \n\nCONTEXT:\n${context}\n\n
                        Question:\n${prompt}\n\nAnswer:{ANSWER} Sources:{sources}\n`
            },
        }
    },
}

export default prompts;