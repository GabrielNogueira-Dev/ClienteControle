import { Container } from "@/components/container";
import Link from "next/link";

import {getServerSession} from "next-auth"
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";

export default async function NewTicket(){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where:{
            userId: session.user.id
        }
    })
                //basicamente um "ZOD" do SSR
   async function handleRegisterTicket(formData: FormData){
        "use server"
        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")

        await prismaClient.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id
            }
        })
        console.log("chamado aberto")
        redirect("/dashboard")
    }

    return(
        <Container>
          <main className="mt-9 mb-2">
            <div className="flex items-center gap-3">
                <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900">
                    Voltar
                </Link>
                    <h1 className="text-3xl font-bold">Novos chamados</h1>
            </div>

            <form action={handleRegisterTicket}>
                <label className="flex flex-col mt-6">Nome do chamado</label>
                <input type="text" className="w-full border-2 rounded-md text-lg"
                        placeholder="Digite o nome do chamado" required
                        name="name"
                />

                <label className="flex flex-col mt-6">Descreva o problema</label>
                <textarea  className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                           placeholder="Digite o problema" required
                           name="description"
                           >
                           
                            </textarea>

            {customers.length !== 0 && (
                <>
                    <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                <select  className="w-full border-2 rounded-md px-2 h-11 resize-none bg-white"
                         name="customer"
                >
                    {customers.map( customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
                </>
            )}

            {customers.length === 0 && (
                <Link href="/dashboard/customer/new">
                    Você ainda não possui clientes cadastrados. <strong className="text-blue-700">Cadastre aqui</strong>
                </Link>
            )}

            <button type="submit" disabled={customers.length === 0} className="bg-blue-800 w-full disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold px-2 h-11 rounded-md my-4">Cadastrar</button>
            
            </form>

            </main>
        </Container>
    )
}