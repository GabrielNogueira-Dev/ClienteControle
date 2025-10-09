"use client"
import Link from "next/link";
import Image from "next/image";

import { FiUser, FiLogOut, FiLoader, FiLock} from "react-icons/fi";

import {signIn,signOut,useSession} from "next-auth/react"

export function Header(){

  const session = useSession()

  async function handleLogin(){
 await signIn("google")
  }

  async function handleLogout(){
await signOut()
  }

    return(
      <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md">
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
            <Link href="/">
           <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
             <span className="text-blue-500">DEV</span> CONTROLE
           </h1>
            </Link>

      {session.status === "loading" && (
        <button className="animate-spin">
          <FiLoader size={24} color="#4b5563"/>
        </button>
      )}
      {session.status === "unauthenticated" && (
        <button onClick={handleLogin}>
          <FiLock size={24} color="#4b5563"/>
        </button>
      )}

        {session.status === "authenticated" && (
           <div className="flex self-center gap-4 ">       
             
             <Link href={"/dashboard"}>
               <FiUser size={24} color="#3B82F6"/>
             </Link>
            

            <button onClick={handleLogout}>
                <FiLogOut size={24} color="#F43F5E"/>  
            </button>
         </div>
        )}

    </div>
        </header>
    )
}