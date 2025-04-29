

import TodoList from "./components/TodoList";
import './App.css'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/TodosContext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MySnackBar from "./components/MySnackBar";
import {  ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/TodosContext";
const theme  = createTheme({
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
<TodosProvider>

<ToastProvider >
<div style={{background:"#191b1f", display:"flex",alignItems:"center", height:"100vh",justifyContent:"center"}}>

<TodoList/>

</div>
</ToastProvider>

</TodosProvider>
</ThemeProvider>

)
}



export default App;
