import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(job);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { title, company, location, jobType, description } = body;

  const updated = await prisma.job.update({
    where: { id: params.id },
    data: {
      title,
      company,
      location,
      jobType,
      description,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.job.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
