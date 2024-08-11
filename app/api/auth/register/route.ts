import bcrypt from "bcrypt";
import {NextResponse} from "next/server" ;
import { prisma } from "@/lib/prismaDB"

export async function POST(request: any) {
    const body = await request.json()

    const {email, password, userName } =  body;

    if (!email || !password || !userName) {
        return new NextResponse("Missing Fields", { status: 400 });
      }

      const exist = await prisma.user.findUnique({
        where: {email}
      })

      if (exist) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
            email,
            userName,
            password: hashedPassword
        }
      } as any)
      return NextResponse.json(user);
}   