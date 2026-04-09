import { Link, useParams } from 'react-router';
import * as TodosAPI from "../services/TodosAPI";
import { useEffect, useState } from 'react';
import type { Todo } from '../types/Todo.types';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const TodoPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [todo, setTodo] = useState<Todo | null>(null);
    const {id} = useParams();
    const todoId = Number(id);
    const navigate = useNavigate();

    //get Todo from Api
    const getTodo = async (id : number) => {
            setError(false);
            setIsLoading(false);
            setTodo(null);
        try{
            const data = await TodosAPI.getTodo(id);
    
            setTodo(data);
    
         } catch(err){
            console.error("getTodo error: ", err)
            setError(err instanceof Error ? err.message : "It's not me, it's you")
          
        } 
          setIsLoading(false);
    }

    	const handleToggleTodo = async (todo: Todo) => {
		try{
            setError(false);
			const updatedTodo = await TodosAPI.updateTodos(todo.id,{
				completed : !todo.completed
			});
			console.log("Updating toggle!");

            setTodo(updatedTodo)
		} catch (err) {
			console.error("Error thrown when updating Todo: ", err)
      		setError( err instanceof Error ? "Could not update TODO" +err.message : "It's not me, it's you")
       		setIsLoading(false);
		}
	}

    	const handleDeleteTodo = async (todo: Todo) => {
		try{
            const title = todo.title;
			 await TodosAPI.deleteTodo(todo.id);

             toast.success("Todo Item: " + title + " is deleted" )
            navigate("/todos", {replace :true,})
		} catch (err) {
			console.error("Error thrown when deleting Todo: ", err)
      		setError( err instanceof Error ? "Could not delete TODO" +err.message : "It's not me, it's you")
       		setIsLoading(false);
		}
	}


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getTodo(todoId)
    }, [todoId]);

    if(error){
        return <Alert variant="warning">{error}</Alert>
    }

        if(isLoading){
        return <span>Is loading...</span>
    }
 
  return todo &&(
    <>
    <h1>{todo.title}</h1>
    <p><strong>Status: </strong>{todo.completed ? "Completed" : "Not completed"}</p>
    <div className="button mb-3">
        <Button
			onClick={() => handleToggleTodo(todo)}
			variant="success"
        >Toggle completion</Button>
        <Button
			onClick={() => handleDeleteTodo(todo)}
            
			variant="danger"
        >Delete item</Button>
    


    </div>
    <Link to={"/todos"} className="btn btn-secondary" role="button">
    &laquo; All todos
    </Link>

    </>
  )
}
export default TodoPage;

