
import { DefaultSession } from "next-auth";


 declare module "nexxxt-auth" {
    interface Session{
        user: {
            id:string;
        } & DefaultSession["user"]
    }
 }