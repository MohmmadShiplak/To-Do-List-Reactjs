
import { Route,Routes,Link } from "react-router";
import TodoList from "./components/TodoList";
import './App.css'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/TodosContext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const theme = createTheme({
    typography: {
    fontFamily:["Alexandria"]
    },

palette:{

  primary:{
    main:"#00b8d4"
  }
}



  });

const initialTodoes=[



]


function App() {
  const [todos,setTodoes]=useState(initialTodoes)

return (

 <ThemeProvider theme={theme}>
<>

<div style={{background:"#191b1f", display:"flex",alignItems:"center", height:"100vh",justifyContent:"center"}}>
<TodosContext.Provider value={{todos,setTodoes}}>
<TodoList/>

</TodosContext.Provider>


</div>



</>
</ThemeProvider>

)
}



export default App;
