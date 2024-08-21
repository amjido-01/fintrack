import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaDB'; // Ensure this path is correct

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("id");

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                workspaces: {
                    orderBy: {
                        lastActiveAt: 'desc',
                    },
                    take: 1, // Get the last active workspace
                    select: {
                        id: true,
                        workspaceName: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const hasWorkspace = user.workspaces.length > 0;
        const lastWorkspace = hasWorkspace ? user.workspaces[0] : null;

        return NextResponse.json({ hasWorkspace, lastWorkspace }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
