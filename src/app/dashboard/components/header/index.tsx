import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader(){

    return(
       <Container>
        <header className="flex items-center justify-evenly bg-slate-700 gap-4 p-3 rounded-xl mt-4 text-white">
        <Link href={"/dashboard"} className=" hover:font-bold duration-300">Chamados</Link>
        <Link href={"/dashboard/customer"} className=" hover:font-bold duration-300">Clientes</Link>
        </header>
       </Container>
    )
}