import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaDB";


// Get an expense by ID
export async function GET(req: NextRequest, { params }: { params: { id: string}}){
    try {
        const { id } = params;

        const expense = await prisma.expense.findUnique({
            where: {id},
        });

        if (!expense) {
            return NextResponse.json({ error: "Expense not found" }, { status: 404 })
        }

        return NextResponse.json(expense, { status: 200 });
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

        const { expenseName, date, amount, category, note } = body;

        const updatedExpense = await prisma.expense.update({
            where: { id },
            data: {
                expenseName,
                date: new Date(date),
                amount: parseFloat(amount),
                category,
                note
            }
        })
        return NextResponse.json(updatedExpense, { status: 200 });
    } catch (error) {
        console.error("Error updating expense:", error);
        return NextResponse.json({ error: "Failed to update expense" }, { status: 500 });
    }
}


// Delete an expense by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.expense.delete({
            where: {id}
        })

        return NextResponse.json({ message: "Expense deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting expense:", error);
        return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 });
    }
}