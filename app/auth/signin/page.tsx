"use client";
import React from "react";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
const Signin = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
      });
      
      
      const { email, password } = data;

      const handleChange = (e: any) => {
        setData({...data, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if(result?.ok) {
            
        // Get the session to retrieve the user ID
        const session = await getSession();
        const userId = session?.user?.id;

        if (!userId) {
            alert("Failed to retrieve user ID");
            setLoading(false);
            return;
        }

            const hasWorkspace = await fetch(`/api/check-workspace?id=${userId}`);
            const profileData = await hasWorkspace.json();

            if (profileData.hasWorkspace) {
                const lastWorkspace = profileData.lastWorkspace;
                setData({
                    email: "",
                    password: "",
                });
                setLoading(false)
                router.push(`/user/${userId}/workspace/${lastWorkspace.workspaceName}/dashboard`);
                // window.location.href = `/user/${userId}/workspace/${lastWorkspace.workspaceName}/dashboard`;
                // window.location.href = "/dashboard"
            } else {
                setData({
                    email: "",
                    password: "",
                });
                router.push("/createworkspace")
                // window.location.href = "/createworkspace"
            }
        } else {
            alert("Incorrect email or password")
            setLoading(false)
        }
      }
  return (
    <div className="">

    <div className="flex justify-center hscreen">

        <div className='hidden bg-cover h-screen lg:block lg:w-[60%]'>
        <Image src="/form.jpg"  alt="Finance"   width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: "cover" }} priority={true} />
        </div>
        
        <div className="w-full border2 max-w-md px-6 mx-auto lg:w-2/6">
        <div>
            
        </div>
        <p className="mt-3 md:mt-14 text-xl text-center text-gray-600 dark:text-gray-200">
            Login to your account
        </p>

        <div className="mt-4">
        <Button onClick={() => signIn('google', {callbackUrl: "http://localhost:3000/dashboard"})} className="flex w-full items-center justify-center text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 bg-transparent dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
        </Button>
        </div>

        <div className="flex items-center justify-between mt-4 md:mt-20">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                with email</a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="mt-4">
            <Label className='block mb-2 text-sm font-medium' htmlFor="email">Email Address</Label>
            <Input 
             type="email"
             id="email"
             name="email"
             value={email}
             onChange={handleChange}
             placeholder="john.doe@company.com"
             required
            className='block w-full px-4 py-2' />
        </div>

        <div className="mt-4">
            <div className="flex justify-between">
               
                {/* <a href="#" className="text-xs">Forget Password?</a> */}
                <Label className='block mb-2 text-sm font-medium' htmlFor="password">Password?</Label>
            </div>
            <Input 
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="•••••••••"
            className='block w-full px-4 py-2' />
        </div>
        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
        <div className="mt-6">
            {loading? <Button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> : <Button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600"> Sign In </Button>}
            
        </div>

        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link href="/auth/signup" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
        </form>
        </div>

    </div>

    </div>
  )
}

export default Signin