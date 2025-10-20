
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

//ROTA DE CADASTRO DE CLIENTE
export async function POST(request: Request){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return NextResponse.json({error: "Not Authorized"}, {status: 401})
    }

    const {name,email,phone,address,userId} = await request.json();

    try{
        await prismaClient.customer.create({
            data:{
                name,
                phone,
                email,
                userId: userId,
                address: address ? address : "" 
            }
        })
          return NextResponse.json({ message:"CLIENTE CADASTRADO" })

    }catch(err){
        return NextResponse.json({error: "Failed create new customer"}, {status:400})
    }
  
}

 //ROTA DE DELETAR CLIENTE

    export async function DELETE(request: Request){

        const session = await getServerSession(authOptions)

            if(!session || !session.user){
                return NextResponse.json({error: "Not authorized"}, {status:401})
            }

        const {searchParams} = new URL(request.url)
        const userId = searchParams.get("id")
      
            if(!userId){
                return NextResponse.json({error: "Failed delete customer"}, {status:400} )
            }
                //BARRAR O USUARIO DE DELETAR CLIENTE COM TICKET ABERTO
            const findTickets = await prismaClient.ticket.findFirst({
                where: {
                    customerId:userId
                }
            })
            
            if(findTickets){
                NextResponse.json({error:"Chamado aberto"}, {status:400})
            }

        try{
            await prismaClient.customer.delete({
               where:{ 
                id: userId as string }
            })
                return NextResponse.json({message: "Client was deleted with success"})

        }catch(err){
        console.log(err)}

    }