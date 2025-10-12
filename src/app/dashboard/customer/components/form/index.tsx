"use client"

import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Input } from "@/components/input"

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email válido é obrigatório").min(1,"Email é obrigatório"),
    phone: z.string().refine( (value) => {
        return /^(?:\(\d{3}\)\s?)?\d{9}$/.test(value) || /^\d{3}\s\d{9}$/.test(value) || /^\d{12}$/.test(value)
        
    },{
        message: "Telefone inválido. Formato esperado: (999) 9999999999"
    }),
    address: z.string()
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId}: {userId: string}){ 
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver:zodResolver(schema)
    })

    const router = useRouter()

   async function handleRegisterCustomer(data : FormData){
       await api.post("/api/customer", {
            name: data.name,
            email: data.email,
            phone: data.phone,
            userId: userId,
            address: data.address
    })
    router.refresh()
    router.replace("/dashboard/customer")
    }
    return(
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium"> Nome completo</label>
            <Input name="name"
                   placeholder="Digite o nome completo"
                   type="text"
                   error={errors.name?.message}
                   register={register}  
            />

            <section className="flex flex-col sm:flex-row gap-2 my-2">
                <div className="flex-1">
                 <label className="mb-1 text-lg font-medium"> Telefone</label>
                  <Input 
                    name="phone"
                    placeholder="351 000000000"
                    type="text"
                    error={errors.phone?.message}
                    register={register}  
            />
                </div>

                   <div className="flex-1">
                 <label className="mb-1 text-lg font-medium"> Email</label>
                  <Input 
                    name="email"
                    placeholder="Digite o email"
                    type="text"
                    error={errors.email?.message}
                    register={register}  
            />
                </div>

            </section>

              <label className="mb-1 text-lg font-medium"> Endereço</label>
                  <Input 
                    name="address"
                    placeholder="Digite seu endereço"
                    type="text"
                    error={errors.address?.message}
                    register={register}  
            />

            <button type="submit" className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold">
                Cadastrar    
            </button>  

        </form>
    )
}