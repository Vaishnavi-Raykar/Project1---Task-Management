import LoginForm from '@/components/Loginform'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions);
 

  if (session) redirect("/");
  return (
    <div>
       <LoginForm/>
    </div>
  )
}

export default page