import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prismaDB";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// import { useRouter } from "next/navigation";
// Zod schema for validating the request data


const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required"),
  currency: z.string().min(1, "Currency is required"),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // const router = useRouter()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session?.user?.id;

    try {
      const body = await req.json();
      const { workspaceName, description, currency } = workspaceSchema.parse(body);
  
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
          currency,
          description,
          createdById: userId
        },
      });
  
      // Return the newly created workspace
      // router.push(`/user/${userId}/workspace/${workspaceName}`)
      // window.location.href=`/user/${userId}/workspace/${workspaceName}`
      // redirect(`/user/${userId}/workspace/${workspaceName}`)
      return NextResponse.json(result, { status: 201 });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json({ error: err.errors }, { status: 400 });
      }
  
      console.error('Error creating workspace:', err);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  } 
   
export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  // const router = useRouter()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session?.user?.id;
  try {
    // check for user workspaces
    const hasWorkSpace = await prisma.workspace.findMany({
     where: {
       createdById: userId
     },
     orderBy: {
       lastActiveAt: 'desc'
     },
     include: {
       expenses: true,
       income: true
     },
   })
   return NextResponse.json(hasWorkSpace, { status: 200 });

 } catch (err) {
   return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}