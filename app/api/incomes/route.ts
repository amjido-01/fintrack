import { NextRequest, NextResponse } from "next/server";
import getServerSession from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prismaDB";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }  

        try {
            const body = await req.json();
          

            const { incomeSource, amount, date, category, customCategory, description, workspaceId, userId } = body;
            console.log(body)


            if (!workspaceId || !userId) {
                console.error('Missing workspaceId or userId');
                return new Response(JSON.stringify({ error: 'Missing workspaceId or userId' }), { status: 400 });
              }


              if (!incomeSource || !date || !category || !amount || !description || !userId || !workspaceId) {
                return NextResponse.json({ error: "All fields are required" }, { status: 400 })
            }

            if (category === "Other" && !customCategory) {
                return NextResponse.json(
                  { error: "Custom category name is required for 'Other' category" },
                  { status: 400 }
                );
              }

            const parsedDate = new Date(date);
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount)) {
                return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
              }

              const income = await prisma.income.create({
                data: {
                incomeSource,
                date: parsedDate,
                category,
                customCategory: category === "Other" ? customCategory : "",
                amount: parsedAmount,
                description,
                workspace: {connect: { id: workspaceId } },
                user: {connect: { id: userId } },
                }
              })
              return NextResponse.json(income, { status: 201 });
        } catch (error) {
            console.error("Error creating expense:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    } 

    export async function DELETE(req: NextRequest) {
      
    }