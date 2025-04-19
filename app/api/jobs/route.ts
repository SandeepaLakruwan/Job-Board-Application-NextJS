import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const jobs = await prisma.job.findMany();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  console.log("SESSION ON API SIDE:", session);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, company, location, jobType, description } = body;

  const newJob = await prisma.job.create({
    data: {
      title,
      company,
      location,
      jobType,
      description,
      userId: session.user.id, 
    },
  });

  return NextResponse.json(newJob);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  console.log("SESSION ON API SIDE:", session);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  try {
    await prisma.job.delete({
      where: {
        id,
        userId: session.user.id, 
      },
    });

    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting job" }, { status: 500 });
  }
}
