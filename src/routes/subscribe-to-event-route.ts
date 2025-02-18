import {z} from "zod"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) =>{

    app.post('/subscriptions',{
        schema:{
            summary: "Subscription someone to the event",
            tags:["Subscription"],
            body: z.object({//https://zod.dev/
                name: z.string(),
                email: z.string().email()
            }),
            response: {
                201: z.object({
                    name: z.string(),
                    email: z.string()
                })
            }
        }
    }, async (request, reply)=>{
        const {name, email} = request.body
    
        // criação da inscrição no banco de dados
    
        return reply.status(201).send({
            name,
            email
        })
    })

}