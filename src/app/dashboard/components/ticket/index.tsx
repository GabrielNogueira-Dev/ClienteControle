"use client"
import {FiCheckSquare, FiFile} from "react-icons/fi"
import { CustomerProps } from "../../customer/components/card";

import { api } from "@/lib/api";
import {useRouter} from "next/navigation"

import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

export interface TicketProps{
    id:string;
    name:string;
    status:string;
    created_at: Date | null;
    updated_at: Date | null;
    customerId:string | null;
    description:string;
}

interface TicketItemProps{
    ticket: TicketProps;
    customer:CustomerProps | null;
}

export function TicketItem({customer,ticket}: TicketItemProps){
  const router = useRouter()
    const {handleModalVisible, setDetailTicket} = useContext(ModalContext)

    async function handleChangeStatus(){
        try{
         await api.patch("/api/ticket",{
            id:ticket.id,

        })
       router.refresh()

        }catch(err){
            console.log(err)
        }
    }

    function handleOpenModal(){
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket
        })
    }

    return(
        <>
        <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
            <td className="text-left pl-1">
               {customer?.name}
            </td>
            <td className="text-left hidden sm:table-cell">
                {ticket.created_at?.toLocaleDateString('pt-BR')}
            </td>
            <td className="text-left">
                <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
            </td>
            <td className="text-left">
                <button onClick={handleChangeStatus}
                className="mr-3 cursor-pointer">
                    <FiCheckSquare size={24} color="#EF4444"/>
                </button>
                <button onClick={handleOpenModal} 
                className="cursor-pointer">
                    <FiFile size={24} color="#3b82f6"/>
                </button>
            </td>
            
        </tr>
        </>
    )
}