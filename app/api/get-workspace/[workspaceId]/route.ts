import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function GET(req: NextRequest, { params }: { params: { workspaceId: string}}) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { workspaceId } = params;

    try {
        const workspace = await prisma.workspace.findUnique({
            where: {id: workspaceId},
            include: {
                expenses: true,
                income: true,
            }
        })
    
        if (!workspace) {
            return NextResponse.json({ error: "Workspace not found" }, { status: 404 });	
        }

        return NextResponse.json(workspace, { status: 200 });
    } catch (error) {
        console.error("Error fetching workspace:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        
    }
}