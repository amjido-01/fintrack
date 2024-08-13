import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaDB";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session?.user?.email) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }
  
      const { firstName, lastName } = await req.json();
  
      if (!firstName || !lastName) {
        return NextResponse.json({ error: 'First name and last name are required' }, { status: 400 });
      }
  
      await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          firstName,
          lastName,
          profileCompleted: true,
        },
      });
  
      return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error updating profile:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }