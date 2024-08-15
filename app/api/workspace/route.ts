import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismaDB";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// Zod schema for validating the request data
const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workspaceName } = workspaceSchema.parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user?.id;

    // Create the workspace in the database
    const result = await prisma.workspace.create({
      data: {
        workspaceName,
        createdById: userId
      },
    });

    // Return the newly created workspace
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }

    console.error('Error creating workspace:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}