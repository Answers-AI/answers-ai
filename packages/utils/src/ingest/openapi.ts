import { inngest } from './client';
import { openApiLoader } from '../openapi';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { OpenApi } from 'types';

const PINECONE_VECTORS_BATCH_SIZE = 100;

const summarize = (operation: any) => {
  return `The ${operation.operationId} operation is ${
    operation.description ? operation?.description : operation.summary
  }.
    The important tags are ${operation?.tags?.join(
      ', '
    )} and the parameters are: ${operation?.parameters
    ?.map((param: { name: any; in: any; type: any; required: any; description: any }) => {
      return `${param.name} is a property in the ${param.in} of the type ${param.type} and is ${
        param.required ? 'required' : 'optional'
      }. The description is ${param?.description || 'not provided'}.`;
    })
    .join(', ')}
    `;
};

export const processOpenApiUrl: EventVersionHandler<{ urls: string[] }> = {
  event: 'openapi/app.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { urls } = data;

    const openApiUrls = (await openApiLoader.loadMany(urls)) as OpenApi[];

    const vectors = openApiUrls.flatMap((openApiUrl) => {
      const service = openApiUrl.info.title;
      const version = openApiUrl.info.version;

      const paths = Object.keys(openApiUrl.paths);

      return paths.flatMap((pathKey: any) => {
        const path: any = openApiUrl.paths[pathKey];

        for (const methodKey of Object.keys(path)) {
          const operation = path[methodKey];
          console.log(summarize(operation));

          return {
            uid: `OpenApi_${service}_${version}_${operation.operationId}`,
            text: summarize(operation),
            metadata: {
              tags: operation.tags,
              service,
              version,
              operationId: operation.operationId
            }
          };
        }
      });
    });

    if (vectors?.length) {
      // console.log('openapi/app.sync', vectors);
      await Promise.all(
        chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
          //TODO: Save to Redis by page url
          //TODO: In event only send page urls
          inngest.send({
            v: '1',
            ts: new Date().valueOf(),
            name: 'pinecone/vectors.upserted',
            data: {
              _page: i,
              _total: vectors.length,
              _batchSize: PINECONE_VECTORS_BATCH_SIZE,
              vectors: batchVectors
            },
            user: event.user
          });
        })
      );
    }
  }
};
