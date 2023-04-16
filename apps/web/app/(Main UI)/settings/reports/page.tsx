import React from 'react';
import Reports from '@ui/Reports';
import { prisma } from 'db/dist';

export const metadata = {
  title: 'Admin Reports | Answers AI',
  description: 'Your chat'
};

const ReportPage = async ({ params }: any) => {
  return <Reports ></Reports>
};

export default ReportPage;
