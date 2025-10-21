"use client"

import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/input"

const schema = z.object({
    name: z.string().min(1,"Chamado +e obrigatório"),
    description: z.string().min(1,"Descreva seu problema")
})

type FormData = z.infer<typeof schema>

export function FormTicket(){
const {register,handleSubmit,setValue, formState:{ errors }} = useForm<FormData>({
resolver: zodResolver(schema)
})

    return(
        <form className="bg-slate-100 mt-6 px-4 py-6 rounded border-none">
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input 
            register={register}
            type="text"
            placeholder="Digite o chamado"
            name="name"
            error={errors.name?.message}
            />

            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <textarea id="description" {...register("description")}
            className="w-full border-2  border-slate-200 rounded-md resize-none mb-2 px-2 h-24"
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