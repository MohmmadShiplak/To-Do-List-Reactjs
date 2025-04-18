import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext,useState } from 'react';

//Dialog 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { TodosContext } from '../contexts/TodosContext.js';


//const open =true
export default function Todo({todo,handleCheck})
{

const {todos,setTodoes}=useContext(TodosContext )
const [showdeleteDialog,setShowdeleteDialog]=useState(false);
const [showUpdateDialog,setShowUpdateDialog]=useState(false);
const [updatedTodoes,setupdatedTodoes]=useState({title :todo.title ,details:todo.details});

//Event handlers
 function  handleCheckClick()
{
  const updatedTodoes =todos.map((t)=>{

    if(t.id === todo.id )
    {
       t.isCompleted =!t.isCompleted;
    }
    
    
    return t
    })

    setTodoes(updatedTodoes)
    localStorage.setItem("todos",JSON.stringify(updatedTodoes))
   

}

 function handleDeleteDialogOpen()
 {
setShowdeleteDialog(true)
 }

  function handleDeleteDialogClose()
  {
setShowdeleteDialog(false)
  }

  function handleUpdateDialogClose()
  {
    setShowUpdateDialog(false)
  }

function handleDeleteConfirm()
{

const deletedTodoes =todos.filter((t)=>{
/*
  if(t.id == todo.id)
{
  return false;
}else
{
  return true
}
*/
//2 
return t.id !== todo.id



})
setTodoes(deletedTodoes)
localStorage.setItem("todos",JSON.stringify(deletedTodoes))

}

function handleUpdateConfirm()
{

const updatedTodoesList =todos.map((t)=>{

  if(t.id === todo.id)
{
  return {...t , title : updatedTodoes.title , details : updatedTodoes.details}
}
else
{
  return t
}
})
setTodoes(updatedTodoesList)
localStorage.setItem("todos",JSON.stringify(updatedTodoesList))
setShowUpdateDialog(false)
}
 function handleUpdateDialogOpen()
 {

setShowUpdateDialog(true)
 }



//Event handlers
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
            value={updatedTodoes.title}
            onChange={(e)=>{
setupdatedTodoes({...updatedTodoes, title:e.target.value})
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
            value={updatedTodoes.details}
            onChange={(e)=>{
              setupdatedTodoes({...updatedTodoes, details:e.target.value})
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











        <Card className="todoCard" sx={{ minWidth: 275 , backgroundColor:"#283593", color:"white", marginTop:5 }}>
      <CardContent>

        <Grid container spacing={2}>
        <Grid size={4}  display="flex" justifyContent="space-around"  alignItems="center"  >
            {/* icon buttons */}
      
 {/* delete buttons */}
        <IconButton className="iconButton"  aria-label="delete" style={{color:"#b23c17", backgroundColor:"white" , border:"solid  #b23c17 3px "}}onClick={handleDeleteDialogOpen} >
          <DeleteOutlineOutlinedIcon/>
        </IconButton>

 {/* update buttons */}
        <IconButton className="iconButton" aria-label="delete" style={{color:"#1769aa", backgroundColor:"white" , border:"solid #1769aa 3px "}} onClick={handleUpdateDialogOpen}>
          <EditOutlinedIcon/>
        </IconButton>

        <IconButton className="iconButton" aria-label="delete" style={{color:todo.isCompleted ? "white":"#8bc34a" , backgroundColor:todo.isCompleted ? "#8bc34a":"white"  , border:"solid #8bc34a 3px "}} onClick={()=>{

         handleCheckClick()
        }}>
          <CheckIcon/>
        </IconButton>
       

          {/* icon buttons */}
        </Grid>
        <Grid size={8} >
        <Typography variant="h5" sx={{textAlign:"right",textDecoration:todo.isCompleted? "line-through":"none"}}>
{todo.title}
       </Typography>

       <Typography variant="h6" sx={{textAlign:"right"}}>
{todo.details}
       </Typography>


        </Grid>
        </Grid>
       
    
      </CardContent>

    </Card>
    </>
      )

}