
import {FiTrash2, FiFile} from "react-icons/fi"
import { CustomerProps } from "../../customer/components/card";

export interface TicketProps{
    id:string;
    name:string;
    status:string;
    created_at: Date | null;
    updated_at: Date | null;
    customerId:string | null;
}

interface TicketItemProps{
    ticket: TicketProps;
    customer:CustomerProps | null;
}

export function TicketItem({customer,ticket}: TicketItemProps){

    return(
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
                <button className="mr-2  cursor-pointer">
                    <FiTrash2 size={24} color="#EF4444"/>
                </button>
                <button className="cursor-pointer">
                    <FiFile size={24} color="#3b82f6"/>
                </button>
            </td>
            
        </tr>
    )
}