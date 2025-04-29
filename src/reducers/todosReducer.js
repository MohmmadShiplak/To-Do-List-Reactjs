import { v4 as uuidv4 } from 'uuid';





export default function reducer(currenttodos,action)
{

switch (action.type)
{

case "Added":
{

    const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const updatedTodoes = [...(currenttodos || []), newTodo]; // Handle null case
      localStorage.setItem("todos", JSON.stringify(updatedTodoes));
      return updatedTodoes;

    


}
case "deleted":
    {

        const deletedTodoes =currenttodos.filter((t)=>{

            return t.id !== action.payload.id
        
          })
          localStorage.setItem("todos", JSON.stringify(deletedTodoes));
         return deletedTodoes
    
    }

case "updated":
{

    const updatedTodos = currenttodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos
  
}

case "get":
{

  
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        return storedTodos
}

case "toggledCompleted":
{

  const updatedTodos =currenttodos.map((t)=>{

    if(t.id === action.payload.id )
    {

const updatedtodo={

...t,isCompleted:!t.isCompleted
}

    return updatedtodo;
    }
    
    return t;
    })
    localStorage.setItem("todos",JSON.stringify(updatedTodos))
   return updatedTodos

}




default :{

    throw Error ("Unknow Action "+ action.type);

}


}










return []








}

