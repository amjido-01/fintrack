import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismaDB";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
   
    const { workspaceName, userId } = req.body;

    if(!workspaceName){
        return res.status(400).json({
            message: "workspace name is required",
            error: true
        })
    }

    try {
        const result = await prisma.workspace.create({
            data: {
                workspaceName,
                createdById: userId
            }
        })
        console.log(result, "result from workspace")
        return res.status(200).json(result);
    }