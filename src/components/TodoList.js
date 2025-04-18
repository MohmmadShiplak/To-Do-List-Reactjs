import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import Grid from '@mui/material/Grid';
import Todo from "./Todo"
import TextField from '@mui/material/TextField';
import { Height } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import {  useContext,useState,useEffect } from 'react';
import { TodosContext } from '../contexts/TodosContext';


export default function TodoList()
{
  const { todos, setTodoes } = useContext(TodosContext);
  const [TitleInput, setTitleInput] = useState("");
  const [displayedTodoesType,setdisplayedTodoesType]=useState("all")


//filteration arrays 

const CompletedTodoes =todos.filter((todo)=>{
  return todo.isCompleted 
})

const NotCompletedTodoes =todos.filter((todo)=>{
  return !todo.isCompleted 
})

let todoesTobeRendered=todos

if(displayedTodoesType == "completed")
{
todoesTobeRendered =CompletedTodoes
}
else if (displayedTodoesType == "non-completed")
{
  todoesTobeRendered =NotCompletedTodoes
}
else
{
  todoesTobeRendered=todos
}




  // Safely handle mapping
  const Todojsx = todoesTobeRendered.map((todo) => (
    <Todo key={todo.id}  todo={todo} />
  ));
  


/*
    // Load todos safely from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoes(storedTodos);
  }, []);
  */

  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      if (Array.isArray(storedTodos)) {
        setTodoes(storedTodos);
      }
    } catch (error) {
      console.error("Failed to load todos", error);
      setTodoes([]);
    }
  }, [setTodoes]);
  






  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: TitleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodoes = [...(todos || []), newTodo]; // Handle null case
    setTodoes(updatedTodoes);
    localStorage.setItem("todos", JSON.stringify(updatedTodoes));
    setTitleInput("");
  }

  function changeDisplayedType(e)
  {
setdisplayedTodoesType(e.target.value)
  }





/*
const StorageTodos=JSON.parse(localStorage.getItem("todos"))
setTodoes(StorageTodos)
*/


  return (
  <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}style={{maxHeight:"80vh",overflow:"scroll"} }>
      <CardContent>
        <Typography variant="h2" style={{display:"flex", justifyContent:"center"}} >
          Todo List 
          <Divider />
        </Typography>
      
{/* Filter buttons   */}
        <ToggleButtonGroup
        exclusive
aria-label="text alignment" onChange={changeDisplayedType} value={displayedTodoesType}
style={{display:"flex",justifyContent:"center", marginTop:"30px"} } color="primary"
      >
    
      <ToggleButton value="non-completed" >
      The unaccomplished
        </ToggleButton>

        <ToggleButton value="completed" >
        The accomplished 
        </ToggleButton>
      
        <ToggleButton value="all" >
        Everything
        </ToggleButton>



      </ToggleButtonGroup>

{/* All Todoes   */}
{Todojsx}
{/* All Todoes   */}

{/* INPUT + ADD BUTTON   */}
 <Grid container spacing={2} style={{marginTop:"20px"}} >

 <Grid size={4} display="flex" justifyContent="space-around"  alignItems="center"   >
 <Button variant="contained" style={{height:"100%", width:"100%"}} onClick={()=>{
handleAddClick();
 }} disabled={TitleInput.length === 0} >add a new task</Button>
   </Grid>

   <Grid size={8}  display="flex" justifyContent="space-around"  alignItems="center"  >
   <TextField value={TitleInput} onChange={(e)=>{
setTitleInput(e.target.value)
   }} id="outlined-basic" label="Title of the task" variant="outlined" style={{width:"100%"}}/>
    </Grid>
 </Grid>

{/* INPUT + ADD BUTTON   */}

      </CardContent>
     
      
    </Card>
      </Container>)
    
}