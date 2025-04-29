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
import {  useState,useEffect,useMemo,useReducer } from 'react';
import  {useTodos}  from '../contexts/TodosContext';
import { ToastContext, useToast } from '../contexts/ToastContext';
import todosReducer from '../reducers/todosReducer'

//Dialog 

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function TodoList()
{
  const {todos, dispatch } = useTodos();
  //const { todo2, setTodoes } = useContext(TodosContext);
  const {showHideToast} =useToast()
  const [dialogTodo, setDialogTodo] = useState(null);
  const [TitleInput, setTitleInput] = useState("");
  const [displayedTodoesType,setdisplayedTodoesType]=useState("all")
  const [showdeleteDialog,setShowdeleteDialog]=useState(false);
  const [showUpdateDialog,setShowUpdateDialog]=useState(false);

//filteration arrays 

const CompletedTodoes =useMemo(()=>{
  return todos.filter((todo)=>{
    console.log("calling completed todo")
    return   todo.isCompleted
  })

},[todos])





const NotCompletedTodoes =useMemo(()=>{

  return todos.filter((todo)=>{

    console.log("calling not completed todo")
    return !todo.isCompleted 
  })

},[todos])



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
// handle deletes 


function handleDeleteDialogClose()
{
setShowdeleteDialog(false)
}


function openDeleteDialog(todo)
{

setDialogTodo(todo)
setShowdeleteDialog(true)

}

function openUpdateDialog(todo)
{
setDialogTodo(todo)
setShowUpdateDialog(true)
}


function handleUpdateDialogClose()
{

setShowUpdateDialog(false)
}







function handleDeleteConfirm()
{

  dispatch({type:"deleted",payload:dialogTodo})

setShowdeleteDialog(false)
showHideToast("todo deleted sucessfully")
}

function handleUpdateConfirm()
{

  
dispatch({type :"updated", payload :dialogTodo})


  setShowUpdateDialog(false);

  showHideToast("todo updated sucessfully")
}




// handle deletes 


  // Safely handle mapping
  const Todojsx = todoesTobeRendered.map((todo) => (
    <Todo key={todo.id}  todo={todo} showdelete={openDeleteDialog} showupdate={openUpdateDialog} />
  ));
  


/*
    // Load todos safely from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoes(storedTodos);
  }, []);
  */

  useEffect(() => {
    dispatch ({type: "get"})
  });
  






  function handleAddClick() {
  
dispatch ({type:"Added", payload:{title :TitleInput}} )

    setTitleInput("");
    showHideToast("todo added sucessfully :-)")
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
<>
  {/*delete dialog */}

    <Dialog
  
    open={showdeleteDialog}
  onClose={handleDeleteDialogClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
    Are you sure you want to delete?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      Can you undo the deletion after completing it?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteDialogClose}>Closing</Button>
      <Button onClick={handleDeleteConfirm} autoFocus>
      Confirm deletion
      </Button>
    </DialogActions>
  </Dialog>
  {/*===delete dialog */}

 {/*update dialog */}
 <Dialog
  
    open={showUpdateDialog}
  onClose={handleUpdateDialogClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
    Update the task
    </DialogTitle>
    <DialogContent>
    <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label= "Enter task title here"
            fullWidth
            variant="standard"
            value={dialogTodo?.title}
            onChange={(e)=>{
setDialogTodo({...dialogTodo, title:e.target.value})
            }}
          />

<TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Enter task details here "
            fullWidth
            variant="standard"
            value={dialogTodo?.details}
            onChange={(e)=>{
              setDialogTodo({...dialogTodo, details:e.target.value})
                          }}


          />




    </DialogContent>
    <DialogActions>
      {/*Update BUTTON */}
      <Button onClick={handleUpdateDialogClose}>Closing</Button>
      <Button onClick={handleUpdateConfirm} autoFocus>
      Confirm
      </Button>

        {/*===Update BUTTON */}
    </DialogActions>
  </Dialog>
  {/*update dialog */}










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
      </Container>
    </>
  )
}