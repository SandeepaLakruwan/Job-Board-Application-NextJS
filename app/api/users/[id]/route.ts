import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(_: any, { params }: any) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { email, password },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}

export async function DELETE(_: any, { params }: any) {
  try {
    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 400 });
  }
}
