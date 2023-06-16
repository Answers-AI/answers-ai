import React from 'react';
import SourcesWebClient from './SourcesFiles.Client';
// import { prisma } from '@db/client';

const SourcesWeb = ({ sources }: any) => {
  // TODO: Check why making requests from here makes the app not work
  // const sources = await prisma.document
  //   .findMany({
  //     where: {
  //       source: 'web'
  //     },
  //     take: 50
  //   })
  //   .then((data: any) => JSON.parse(JSON.stringify(data)));

  return <SourcesWebClient />;
};

export default SourcesWeb;
