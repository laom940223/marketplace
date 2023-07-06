import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "y/server/api/trpc";
import { getUserInfo } from "y/server/utils/attachUserInfo";


const DEFAULT_LISTINGS = 25

export const listingsRouter = createTRPCRouter({
  
  

  getAllListings: publicProcedure
          .input(z.object({

            amount : z.number().positive().default(DEFAULT_LISTINGS)
          }))
          .query(async({ctx, input})=>{

            const { prisma } = ctx
            const listings = await prisma.listing.findMany()
              
            return listings

          }),


  getListingById: publicProcedure
          .input(z.object({
              id: z.string()
          }))
          
          .query(async( {ctx, input} )=>{
          
              const { prisma } = ctx

              const listing = await prisma.listing.findUniqueOrThrow({where: {
                id: input.id
              }})

              const user = await getUserInfo(listing?.userId)

              return { listing, user  }
          })
          ,


  createListing: protectedProcedure
    .input(z
      .object({
            name: z.string().min(1, { message: "Please provide a name" }),
            description: z.string().min(1, { message: "Need to provide a description" }),
            price: z.number().positive()
              
        }))
    .mutation(async ({ input, ctx }) => {

      const { prisma, auth } = ctx

      
      const createdListing = await prisma.listing.create({data: { userId: auth.userId , ...input }})



      return createdListing

      
    }),


  
});
