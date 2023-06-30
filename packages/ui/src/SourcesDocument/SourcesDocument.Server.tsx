import React from 'react';
import SourcesDocumentClient from './SourcesDocument.Client';
import { prisma } from 'db/dist';

const SourcesDocument = () => {
  return <SourcesDocumentClient />;
};

export default SourcesDocument;
