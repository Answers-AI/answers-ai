import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import path from 'path';

export async function POST(req: Request, res: NextResponse) {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const formData = await req.formData(); // Parse the form data

  const iFile = await formData.get('file'); // Get the file stream from the form data
  if (!iFile)
    return NextResponse.json({
      status: 'error',
      message: 'No file provided'
    });

  // if (!(iFile instanceof File)) {
  //   return NextResponse.json({
  //     status: 'error',
  //     message: 'Invalid file provided'
  //   });
  // }

  const filename = iFile.name;
  const fileExtension = path.extname(filename).toLowerCase(); // Get the extension of the file

  // Check if the file is a .doc, .docx, or .pdf file
  if (!['.doc', '.docx', '.pdf'].includes(fileExtension)) {
    return NextResponse.json({
      status: 'error',
      message: 'Invalid file type. Only .doc, .docx, .pdf files are allowed.'
    });
  }

  const chunks = [];
  for await (let chunk of iFile.stream()) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks); // Convert stream to Buffer
  const base64File = buffer.toString('base64');
  // console.log({ file: base64File });

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'files/doc.sync',
    user,
    data: { appSettings, filename, fileExtension }
  });

  return NextResponse.json({ status: 'ok' });
}
