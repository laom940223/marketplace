import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "y/utils/api";
import "y/styles/globals.css";
import NavBar from "y/components/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  
  
      return(
        <ClerkProvider {...pageProps}>
          <NavBar/>
          <Component {...pageProps} />;
          
        </ClerkProvider>
      ) 
      
          

};

export default api.withTRPC(MyApp);




 

