import { inngest } from './client';
import Airtable from 'airtable';
// import { Document } from 'langchain/document';
import { EventVersionHandler } from './EventVersionHandler';
import { AirtableRecord } from 'types';
import { chunkArray } from '../utilities/utils';
// import { chunkArray } from '../utilities/utils';
// import { TokenTextSplitter } from 'langchain/text_splitter';
// import { encoding_for_model } from "@dqbd/tiktoken";

const PINECONE_VECTORS_BATCH_SIZE = 2;
// TODO: Move this to a config file from the settings
// const getNLPSummary = (record: object) => {
//   const string = `${record.fields['Summary']} ${record.fields['Description']}
//     reported by ${record.fields['Reporter']} and assigned to ${record.fields['Assignee']}
//     QA/Quality Assurance by ${record.fields['QA Person'] || 'Unknown'}
//     Linked to Issues: ${record.fields['Linked Issues'] || 'None'}
//     Status: ${record.fields['Status']}
//     `;
//   return string;
// };

const getAirtablePineconeObject = async (airtableRecords: AirtableRecord[]) => {
  const vectors = (
    await Promise.all(
      airtableRecords.map(async (record) => {
        if (!record) {
          return [];
        }

        // const nlpSummary = getNLPSummary(record);

        // return [
        //   {
        //     uid: `Airtable_${record.id}`,
        //     text: nlpSummary,
        //     metadata: {
        //       source: 'airtable',
        //       url: `https://lastrev.atlassian.net/browse/${record.fields['Issue Key']}`,
        //       text: nlpSummary,
        //       table: 'Issues',
        //       view: 'Grid view',
        //       summary: record.fields['Summary'],
        //       // description: record.fields['Description'],
        //       reporter: record.fields['Reporter'],
        //       assignee: record.fields['Assignee'],
        //       qaPerson: record.fields['QA Person'] || 'Unknown',
        //       linkedIssues: record.fields['Linked Issues'] || 'None',
        //       status: record.fields['Status']
        //     }
        //   }
        // ];

        return [];

        // TODO: Chunk these by tokens
        // const markdownChunks = await splitPageHtml(algoliaHit);
        // const encodingName = encoding_for_model('text-davinci-003');
        //   if (!markdownChunks?.length) return [];
        // const splitter = new TokenTextSplitter({
        //   encodingName: 'text-davinci-003',
        //   chunkSize: 3000,
        //   chunkOverlap: 0
        // });

        // const output = await splitter.createDocuments([nlpSummary]);

        // console.log('airtable' + ' nlpSummary: ' + nlpSummary)

        // return output.map((doc: Document) => ({
        //   uid: `Airtable_${record.id}`,
        //   text: doc.pageContent,
        //   metadata: {
        //     source: 'airtable',
        //     url: `${record.fields['Summary']}`
        //   }
        // }));
      })
    )
  )
    .flat()
    .filter(Boolean);

  return vectors;
};

const embedVectors = async (event: any, vectors: any[]) => {
  let outVectors: void[] = [];

  if (vectors?.length && vectors?.every((x: any) => !!x)) {
    outVectors = await Promise.all(
      chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
        console.log('airtable' + ' batchVectors: ' + batchVectors.length);
        // console.log(batchVectors);
        return inngest.send({
          v: '1',
          ts: new Date().valueOf(),
          name: 'pinecone/vectors.upserted',
          data: {
            _page: i,
            _total: vectors.length,
            _batchSize: PINECONE_VECTORS_BATCH_SIZE,
            vectors: batchVectors,
            organizationId: event?.user?.currentOrganizationId
          },
          user: event.user
        });
      })
    );
  }

  return outVectors;
};

const getAirtableRecords = (base: any): Promise<AirtableRecord[]> => {
  return new Promise((resolve, reject) => {
    const allRecords: AirtableRecord[] = [];

    base('AIRTABLE: Customer - Impossible Foods')
      .select({
        view: 'Q12023'
      })
      .eachPage(
        (records: AirtableRecord[], fetchNextPage: () => void) => {
          console.log('airtable' + ' records: ' + records.length);
          allRecords.push(...records);
          fetchNextPage();
        },
        (err: any) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(allRecords);
          }
        }
      );
  });
};

export const processAirtable: EventVersionHandler<{
  apiKey: string;
  baseId: string;
}> = {
  event: 'airtable/app.sync',
  v: '1',
  handler: async ({ event }) => {
    const { apiKey, baseId } = event.data;
    const base = new Airtable({
      apiKey
    }).base(baseId);

    console.log('airtable' + ' event: ' + event);
    try {
      const allRecords: AirtableRecord[] = await getAirtableRecords(base);
      console.log('airtable' + ' allRecords: ' + allRecords.length);
      const pinconeObjs = await getAirtablePineconeObject(allRecords);
      console.log('airtable' + ' pinecone: ' + pinconeObjs.length);
      const embeddedVectors = await embedVectors(event, pinconeObjs);
      // console.log('airtable' + ' embeddedVectors: ' + embeddedVectors.length);
    } catch (error) {
      console.error(`[airtable/app.sync] ${error}`);
    }
  }
};
