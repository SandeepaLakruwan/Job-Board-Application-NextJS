// app/api/users/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { hash } from 'bcryptjs';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, fname, lname } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }
  if (!fname || !lname) {
    return NextResponse.json({ error: 'Missing Name' }, { status: 400 });
  }

  try {
    const hashedPassword = await hash(password, 10); 

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fname,
        lname,
      },
    });

    return NextResponse.json(newUser);
  } catch (err) {
    return NextResponse.json({ error: 'Email already exists or DB error' }, { status: 400 });
  }
}
