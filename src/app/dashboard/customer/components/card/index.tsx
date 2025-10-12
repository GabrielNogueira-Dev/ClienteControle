"use client"

import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

export interface CustomerProps{
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string | null;
    created_at: Date | null;
    updeted_at: Date | null;
    userId: string | null;
}

export function CardCustomer( {customer}: {customer: CustomerProps}){
    const router = useRouter()

    async function handleDelete( ){
      try{
          const res = await api.delete("/api/customer",{
            params:{ id: customer.id}
        })

     router.refresh()

      }catch(err){
        new Error(err + "Falha ao deletar cliente")
      }
    }
    return(
        <article className="flex flex-col bg-gray-100 border-2 border-slate-200 p-2 rounded-lg gap-2 hover:scale-105 duration-300 ">
            <h2>
                <a className="font-bold">Nome:</a> {customer.name}
            </h2>
            <p> <a className="font-bold">Email:</a> {customer.email} </p>
            <p> <a className="font-bold">Telefone:</a> {customer.phone} </p>
            {customer.address? <p> <a className="font-bold">Endereço:</a> {customer.address} </p> : null}
            <button className="bg-red-500 px-4 rounded text-white mt-2 self-start"
            onClick={handleDelete}>
                Deletar
            </button>
        </article>
    )
}