import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"


export async function GET(req: NextRequest, { params }: { params: { workspaceId: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { workspaceId } = params;
      const userId = session?.user?.id;

      try {
        const workspace = await prisma.workspace.findFirst({
            where: {
                id: workspaceId,
                createdById: userId,
            }
        })
        if (!workspace) {
          return NextResponse.json({ error: `Workspace '${workspaceId}' not found for user ${userId}` }, { status: 404 });
          }

          return NextResponse.json(workspace, { status: 200 });
      } catch (err) {
        console.error("Error fetching workspace:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
}


// delete workspace
export async function DELETE(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  try {
      const { workspaceId } = params;

      await prisma.workspace.update({
          where: {id: workspaceId},
          data: {
              isDeleted: true,
              deletedAt: new Date()
          },
          include: {
            income: true,
            expenses: true
          }
      })

      return NextResponse.json({ message: "Income deleted successfully" }, { status: 200 });
  } catch (error) {
      console.error("Error deleting income:", error);
      return NextResponse.json({ error: "Failed to delete income" }, { status: 500 });
  }
}