import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaDB";
import getServerSession from "next-auth/next";
import { authOptions } from "../../../lib/auth"

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // return NextResponse.redirect(new URL("/login", req.url));
    }    

    // const userId = session?.user?.id;
        try {
            console.log("hello world")
            // const body = await req.json();
            const body = await req.json();
            console.log('Received request body:', body);
        
            const { expenseName, date, amount, category, note, workspaceId, userId } = body;
        
            if (!workspaceId || !userId) {
                console.error('Missing workspaceId or userId');
                return new Response(JSON.stringify({ error: 'Missing workspaceId or userId' }), { status: 400 });
              }
              
            if (!expenseName || !date || !amount || !category || !userId || !workspaceId) {
                return NextResponse.json({ error: "All fields are required" }, { status: 400 })
            }

            const parsedDate = new Date(date);
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount)) {
                return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
              }


            const expense = await prisma.expense.create({
                data: {
                    expenseName,
                    date: parsedDate,
                    note,
                    category,
                    amount: parsedAmount,
                    workspace: {connect: { id: workspaceId } },
                    user: {connect: { id: userId } }
                }
            })
            return NextResponse.json(expense, { status: 201 });
        } catch (error) {
            console.error("Error creating expense:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }
   
 export async function GET(req: NextRequest, res: NextResponse) {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session?.user?.id;
        try {
            const expense = await prisma.expense.findMany({
                where: {userId: userId},
                include: {workspace: true}
            })
            return NextResponse.json(expense, { status: 200 });
        } catch (error) {
            console.error("Error fetching expenses:", error);
            return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
        }
    }