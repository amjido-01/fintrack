import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"


export async function GET(req: NextRequest, { params }: { params: { workspaceName: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { workspaceName } = params;
      const userId = session?.user?.id;

      try {
        const workspace = await prisma.workspace.findFirst({
            where: {
                workspaceName,
                createdById: userId,
            }
        })
        if (!workspace) {
          return NextResponse.json({ error: `Workspace '${workspaceName}' not found for user ${userId}` }, { status: 404 });
          }

          return NextResponse.json(workspace, { status: 200 });
      } catch (err) {
        console.error("Error fetching workspace:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
}