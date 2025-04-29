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

import { ToastContext } from '../contexts/ToastContext.js';
//Dialog 

import { useToast } from '../contexts/ToastContext.js';
import  {useTodos}  from '../contexts/TodosContext';
//const open =true
export default function Todo({todo,showdelete,showupdate})
{

//const {todos,setTodoes}=useContext(TodosContext )


const {todos,dispatch}=useTodos();
const {showHideToast} =useToast()
//Event handlers
 function  handleCheckClick()
{
  
dispatch ({type:"toggledCompleted",payload:todo})



   showHideToast("todo completed Sucessfully :-)")

}

 



function handleUpdateConfirm()
{
showupdate(todo)
}




 function handleDeleteClick()
 {

showdelete(todo)
 }

//Event handlers
  return (
    <>
  











        <Card className="todoCard" sx={{ minWidth: 275 , backgroundColor:"#283593", color:"white", marginTop:5 }}>
      <CardContent>

        <Grid container spacing={2}>
        <Grid size={4}  display="flex" justifyContent="space-around"  alignItems="center"  >
            {/* icon buttons */}
      
 {/* delete buttons */}
        <IconButton className="iconButton"  aria-label="delete" style={{color:"#b23c17", backgroundColor:"white" , border:"solid  #b23c17 3px "}}onClick={handleDeleteClick} >
          <DeleteOutlineOutlinedIcon/>
        </IconButton>

 {/* update buttons */}
        <IconButton className="iconButton" aria-label="delete" style={{color:"#1769aa", backgroundColor:"white" , border:"solid #1769aa 3px "}} onClick={handleUpdateConfirm}>
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