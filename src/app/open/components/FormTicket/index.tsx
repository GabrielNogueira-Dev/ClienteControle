"use client"

import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/input"

import { CustomerDataInfo } from "../../page"
import { api } from "@/lib/api"

const schema = z.object({
    name: z.string().min(1,"Chamado +e obrigatório"),
    description: z.string().min(1,"Descreva seu problema")
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
    customer: CustomerDataInfo
}

export function FormTicket({customer}:FormTicketProps){
const {register,handleSubmit,setValue, formState:{ errors }} = useForm<FormData>({
resolver: zodResolver(schema)
})

async function handleRegisterTicket(data: FormData){
const responsoe = await api.post("/api/ticket",{
        name: data.name,
        description: data.description,
        customerId: customer.id
})
setValue("name","")
setValue("description", "")
}

    return(
        <form onSubmit={handleSubmit(handleRegisterTicket)}
         className="bg-slate-100 mt-6 px-4 py-6 rounded border-none">
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input 
            register={register}
            type="text"
            placeholder="Digite o chamado"
            name="name"
            error={errors.name?.message}
            />

            <label className="mb-1 font-medium text-lg">Descrição</label>
            <textarea id="description" {...register("description")}
            className="w-full border-2  border-slate-200 rounded-md resize-none mb-4 mt-1 px-2 h-24"
            placeholder="Descreve o problema"
            >
            </textarea>
              {errors.description?.message && <p className="text-red-500 my-1">{errors.description?.message}</p>}

            <button type="submit" className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold cursor-pointer">
               Cadastrar
            </button>

        </form>
    )
}