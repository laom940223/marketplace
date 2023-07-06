

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod"


export const messageRouter = createTRPCRouter({



        getAllMessages : publicProcedure
                .query(async({ctx})=>{


                    const messages = await ctx.prisma.message.findMany()

                    return messages
                }),





        postAMessage : protectedProcedure
            .input(z.object({

                message: z.string().min(10, { message:"Please provide a message"}),
                toUserId: z.string(),
                listingId: z.string()
            }))

            
 
            .mutation( async({ctx, input})=>{

                const {  listingId, message, toUserId } = input

                
                const { prisma, auth}= ctx


                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const createdMessage = await prisma.message.create({ data:{
                    message,
                    fromUserId: auth.userId,
                    toUserId,
                    listingId
                }})

            })


})