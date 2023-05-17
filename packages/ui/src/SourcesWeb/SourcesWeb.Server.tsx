import React from 'react';
import SourcesWebClient from './SourcesWeb.Client';
import { prisma } from 'db/dist';

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

  return <SourcesWebClient sources={sources?.slice(0, 100)} />;
};

export default SourcesWeb;
