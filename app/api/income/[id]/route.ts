import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaDB";


// Get an expense by ID
export async function GET(req: NextRequest, { params }: { params: { id: string}}){
    try {
        const { id } = params;

        const income = await prisma.income.findUnique({
            where: {id},
        });

        if (!income) {
            return NextResponse.json({ error: "income not found" }, { status: 404 })
        }

        return NextResponse.json(income, { status: 200 });
    } catch (error) {
        console.error("Error fetching expense:", error);
        return NextResponse.json({ error: "Failed to fetch expense" }, { status: 500 });
    }
}


// Update an expense by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();

        const { incomeSource, date, amount, category, note } = body;

        const updatedIncome = await prisma.income.update({
            where: { id },
            data: {
                incomeSource,
                date: new Date(date),
                amount: parseFloat(amount),
                category,
                // description
            }
        })
        return NextResponse.json(updatedIncome, { status: 200 });
    } catch (error) {
        console.error("Error updating income:", error);
        return NextResponse.json({ error: "Failed to update income" }, { status: 500 });
    }
}


// Delete an expense by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.income.update({
            where: {id},
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })

        return NextResponse.json({ message: "Income deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting income:", error);
        return NextResponse.json({ error: "Failed to delete income" }, { status: 500 });
    }
}