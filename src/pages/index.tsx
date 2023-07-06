
import Head from "next/head";
import Link from "next/link";

import { RouterOutputs, api } from "y/utils/api";



type ListingCardProps = RouterOutputs['listings']['getAllListings'][number


];
const ListingCard = (data:ListingCardProps)=>{


  return(

    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link href="#">
        <img className="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
    </Link>
    <div className="px-5 pb-5">
        <Link href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.name}</h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-between">
            <span className=" block w-full  text-3xl font-bold text-gray-900 dark:text-white">{data.price}</span>
            <Link href="#" className="mt-0 ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
        </div>
    </div>
</div>

  )



}




const ListingFee = ()=>{

  const { isLoading, isError, data }  = api.listings.getAllListings.useQuery({ amount: 25})


  if(isLoading) return <p>Loading...</p>


  if(isError) return <p>Something went wrong</p>



  const listCards = data.map(item=> <ListingCard key={item.id} {...item} />)


  return (

      <div className="flex justify-center gap-3">
          
            {listCards}

      </div>
  )

}



export default function Home() {
  

  
  





  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      <main className="flex min-h-screen gap-2 items-center justify-center bg-slate-800 text-slate-200 px-4">

            
          
          <ListingFee/>
          
      </main>
    </>
  );
}
