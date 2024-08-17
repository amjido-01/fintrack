import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismaDB";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Description } from "@radix-ui/react-toast";
// Zod schema for validating the request data
const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required"),
  description: z.string().min(1, "Workspace name is required")
});

export async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session?.user?.id;

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { workspaceName, description } = workspaceSchema.parse(body);
  
      // check if workspace already exists
      const existingWorkspace = await prisma.workspace.findFirst({
        where: {
          workspaceName,
          createdById: userId
        },
      });
  
      if (existingWorkspace) {
        return NextResponse.json({
          error: "Workspace already exists",
        }, { status: 400 });
      }
      
  
      // Create the workspace in the database
      const result = await prisma.workspace.create({
        data: {
          workspaceName,
          description,
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
  } else if (req.method === "GET") {
    try {
       // check for user workspaces
       const hasWorkSpace = await prisma.workspace.findMany({
        where: {
          createdById: userId
        },
        orderBy: {
          lastActiveAt: 'desc'
        }
      })
      console.log(hasWorkSpace, "hasWorkspace")
      return NextResponse.json(hasWorkSpace, { status: 200 });

    } catch (err) {
      console.error('Error retrieving workspaces:', err);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

}

export { handler as GET, handler as POST };