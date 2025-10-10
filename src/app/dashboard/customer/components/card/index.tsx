
export function CardCustomer(){
    return(
        <article className="flex flex-col bg-gray-100 border-2 border-slate-200 p-2 rounded-lg gap-2 hover:scale-105 duration-300 ">
            <h2>
                <a className="font-bold">Nome:</a> Mercado Livre
            </h2>
            <p> <a className="font-bold">Email:</a> Mercado@teste.com </p>
            <p> <a className="font-bold">Telefone:</a> 82545252525 </p>
            <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
                Deletar
            </button>
        </article>
    )
}