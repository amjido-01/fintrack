import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaDB'; // Ensure this path is correct

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('id');
        

        if (!userId) {
            return NextResponse.json({ error: 'User email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                profileCompleted: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ profileCompleted: user.profileCompleted }, { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
