import { createContext,useState } from "react";
import MySnackBar from "../components/MySnackBar";
import { useContext } from "react";

  const  ToastContext =createContext ({})

export const ToastProvider =({children})=>{
   const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");



    function showHideToast(message)
    {
      setOpen(true)
    
    setTimeout(()=>{
      setOpen(false);
      setMessage(message);
    },2000)
    
    }



return (

<ToastContext.Provider value ={{showHideToast}}>
    <MySnackBar open={open} message={message} />
{children}
</ToastContext.Provider>


)


}

export const useToast = () => {
	return useContext(ToastContext);
};

