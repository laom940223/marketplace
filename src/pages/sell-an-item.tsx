/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "y/utils/api";

import { isTRPCClientError } from "y/utils/inferTrpcError";


const validationSchema = z
  .object({
        name: z.string().min(1, { message: "Please provide a name" }),
        description: z.string().min(1, { message: "Need to provide a description" }),
        price: z.preprocess(
            (a) => parseFloat(a as string),
            z.number().positive()
          )
    })

type ValidationSchema = z.infer<typeof validationSchema>;


const SellAnItem = ()=>{


    const { mutateAsync, isLoading } = api.listings.createListing.useMutation()

    const {
        register,
        handleSubmit,
        watch,
        formState
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema)
    })


    const onSubmit: SubmitHandler<ValidationSchema> = async (data) =>{



        try{
            const created = await mutateAsync(data)
            
            console.log(created)
        
        }catch(err){
            if(isTRPCClientError(err)){

                console.log(err.message)
            }


            
        }


        


    } 

    const { price, description, name} = formState.errors
 
    return (

        <div className="flex pt-8 min-h-screen flex-col items-center justify-start bg-slate-800">

            <div className="pt-4 text-slate-200   mb-14">
                <h1 className="text-2xl">Sell an item</h1>
            </div>

            
            <form className="w-2/4" onSubmit={handleSubmit(onSubmit)} >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text"  id="name" 
                        {...register("name")}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "  />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    { name ?  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{name.message}</span></p> : null}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea {...register("description")} name="description" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    { description ?  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{description.message}</span></p> : null}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input  {...register("price")} type="number" step={.01} min={0} id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                    { price ?  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{price.message}</span></p> : null}
                </div>
                
                <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )


}



export default SellAnItem