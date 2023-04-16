import React, { useEffect, useState } from 'react';
import ReportsClient from './Reports.Client';
import { PrismaClient } from '@prisma/client';

// Should import from here so it gets the generated schemas.   But, this needs to be done in a server component (i.e. your page)
import { prisma } from 'db/dist';

interface ReportsProps {
  children?: React.ReactNode;
  params?: {
    app?: string[];
  };
  [key: string]: any;
}



const Reports = async () => {
    const users = await prisma.user.findMany();
    const tableNames = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`;
    return (<ReportsClient users={users} tableNames={tableNames} />)
};

export default Reports;
