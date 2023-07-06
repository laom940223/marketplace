/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router"
import { useForm, type SubmitHandler} from "react-hook-form";
import { api } from "y/utils/api"
import { isTRPCClientError } from "y/utils/inferTrpcError";
import { z } from "zod"

const validationSchema = z
  .object({
        message: z.string().min(1, { message: "Please provide a message" }),
       
    })

type ValidationSchema = z.infer<typeof validationSchema>;




const ListingDetail = ()=>{

    const {  isSignedIn } =  useUser()
    const { query } = useRouter()
    const listing = api.listings.getListingById.useQuery({id : query.id as string}, { enabled: !!query.id })
    const { mutateAsync, isLoading } = api.messages.postAMessage.useMutation()
    
    const { id } = query

    const formId = Array.isArray(id) ? id[0] : id 
    const realId = formId || "replace"
    

    const {
        register,
        handleSubmit,
        watch,
        formState,
        setValue
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema)
    })



    


    if(listing.isLoading){ return   }

    if(listing.isError){ return}

    

    
    const onSubmit: SubmitHandler<ValidationSchema> =  ({message})=>{

        console.log({ message, userId:realId, listingId: listing.data.listing.id })
       
    } 

    return (
        <main className="flex min-h-screen gap-2 items-center justify-center bg-slate-800 text-slate-200 px-4">

            
            <div className="flex flex-col justify-center " >
                <h1 className="flex items-center text-3xl font-extrabold dark:text-white py-4">{listing.data.listing.name}</h1>
                <p className="mb-3 text-gray-500 dark:text-gray-400">{listing.data.listing.description}</p>
                <div className="flex gap-3 mt-4">
                    <p className=" text-gray-500 dark:text-gray-400">{`Price:  ${listing.data.listing.price}`}</p>
                    <p className=" text-gray-500 dark:text-gray-400">{`Posted at ${listing.data.listing.createdAt.toDateString()}`}</p>
                    <p className=" text-gray-500 dark:text-gray-400"> {`Seller: ${listing.data.user.firstName! + " " + listing.data.user.lastName!}`} </p>
                </div>


                {   
                
                    isSignedIn ?

                    
                        <div className="mt-4 flex justify-center" >

                            <form 
                                className=" w-full"
                                    onSubmit={handleSubmit(onSubmit)}>


                            <div className="relative z-0 w-full mb-6 group ">
                                <textarea  id="name" 
                                    {...register("message")}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" "  />
                                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Send a message</label>
                                {/* { message ?  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{name.message}</span></p> : null} */}


                                
                            </div>

                                <button 
                                disabled={isLoading}
                                        type="button" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                                        dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800

                                    ">
                                Send Message</button>

                            </form>
                        </div>
                        :
                        
                        <div className="mt-4 w-full flex justify-center">
                            <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go Back</Link>
                        </div>
                            
                       
                        
                }

            </div>

        
    </main>

      

    )
}



export default ListingDetail