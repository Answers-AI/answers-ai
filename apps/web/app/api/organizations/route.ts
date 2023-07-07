import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { randomUUID } from 'crypto';

export async function PATCH(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');

    const { id, contextFields, ...data } = await req.json();

    if (!session?.user?.organizationId || session?.user?.organizationId !== id)
      return NextResponse.redirect('/auth');

    const organization = await prisma.organization.update({
      where: {
        id
      },
      data: {
        id,
        ...data,
        contextFields: {
          upsert: contextFields.map((field: any) => {
            delete field.organizationId;
            const { fieldId, helpText, fieldType, fieldTextValue } = field;
            const contextFieldID = field.id ?? randomUUID();
            return {
              where: { id: contextFieldID },
              create: { ...field },
              update: {
                fieldId,
                helpText,
                fieldType,
                fieldTextValue
              }
            };
          })
        },
        appSettings: undefined
      },
      include: {
        contextFields: true // Include the updated contextFields in the response
      }
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.log('[POST] error', error);
    throw error;
  }
}
