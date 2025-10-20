"use client"

import {createContext, ReactNode, useState} from "react";
import { TicketProps } from "@/app/dashboard/components/ticket";
import { CustomerProps } from "@/app/dashboard/customer/components/card";
import { ModalTicket } from "@/app/dashboard/components/modal";
//2
interface ModalContextData{
    visible: boolean;
    handleModalVisible:() => void;
    ticket: TicketInfo | undefined;
    setDetailTicket:(detail:TicketInfo) => void;
}

interface TicketInfo{
    ticket: TicketProps;
    customer:CustomerProps | null;
}
//3
export const ModalContext = createContext({} as ModalContextData)

//1
export const ModalProvider = ({children}: {children:ReactNode}) => {
    const [visible, setvisible] = useState(false)
    const [ticket, setTicket] = useState<TicketInfo>()

 function handleModalVisible(){
        setvisible(!visible)
    }

    function setDetailTicket(detail:TicketInfo){
        console.log(detail);
        setTicket(detail)
    }

    //2
    return(
       <ModalContext.Provider value ={{ visible, handleModalVisible, ticket, setDetailTicket }}>
        {visible && <ModalTicket/>}
         {children}
       </ModalContext.Provider>
    )
}