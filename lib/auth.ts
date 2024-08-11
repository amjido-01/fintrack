import { prisma } from "@/lib/prismaDB";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    pages: {
      signIn: "/auth/signin",
    },
    session: {
      strategy: "jwt",
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || 'default-client-id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default-client-id',
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
        }),
        CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
          username: {
            label: "Username",
            type: "text",
            placeholder: "John Smith",
          },
        },
        async authorize(credentials) {
          // check to see if email and password is there
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter an email and password");
          }
  
          // check to see if user exists
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
  
          // if no user was found
          if (!user || !user?.password) {
            throw new Error("No user found");
          }
  
          // check to see if password matches
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
  
          // if password does not match
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }
  
          return user;
        },
      }),
    ],
    callbacks: {
      async signIn({ account, profile }) {
        if (!profile?.email) {
          throw new Error("No email found");
        }
        console.log(profile);
        
        await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            userName: profile.name,
            // password: await bcrypt.hash(profile.password, 10),
          },
          update: {
            email: profile.email,
            name: profile.name,
            userName: profile.name,
            // password: await bcrypt.hash(profile.password, 10),
          },


        })
        return true // Do different verification for other providers that don't have `email_verified`
      },

    }
    // debug: process.env.NODE_ENV === "development",
  };
  