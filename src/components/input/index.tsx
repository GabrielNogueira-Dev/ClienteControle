"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    name:string;
    placeholder?: string;
    type?: string;
    register?: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({name, placeholder, type, register, error, rules}: InputProps){
    return(
        <>
        <input 
        placeholder={placeholder} className="flex flex-col w-full border-2 border-slate-200 rounded-md  h-11 px-2"
        {...register?.(name, rules)}
        id={name}
        type={type}
         />
         {error && <p className="text-red-500 my-1">{error}</p>}
         </>
    )
}