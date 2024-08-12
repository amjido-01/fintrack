import bcrypt from "bcrypt";
import {NextResponse} from "next/server" ;
import { prisma } from "@/lib/prismaDB"

export async function POST(request: any) {
    const body = await request.json()

    const {email, password, userName, name } =  body;

    if (!email || !password || !userName || !name) {
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
            name,
            password: hashedPassword
        }
      } as any)
      console.log(user, "user from register")
      
      return NextResponse.json(user);
}   