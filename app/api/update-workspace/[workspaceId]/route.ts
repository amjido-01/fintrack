import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaDB";

export async function PUT(req: NextRequest, { params }: { params: { workspaceId: string } }) {
    try {
        const { workspaceId } = params;
        const body = await req.json();

        if (!workspaceId) {
            return NextResponse.json({ error: "Workspace ID is required" }, { status: 400 });
        }

        const { workspaceName, currency } = body;

        const updatedWorkspace = await prisma.workspace.update({
            where: { id: workspaceId },
            data: {
                workspaceName,
                currency,
            }
        })
        return NextResponse.json(updatedWorkspace, { status: 200 });
    } catch (error) {
        console.error("Error updating workspace:", error);
        return NextResponse.json({ error: "Failed to update workspace" }, { status: 500 });
    }
}
