import { Link, useParams } from 'react-router';
import * as TodosAPI from "../services/TodosAPI";
import { useEffect, useState } from 'react';
import type { Todo } from '../types/Todo.types';
import { Alert } from 'react-bootstrap';

const TodoPage = () => {
    const [error, setError] = useState<string | false>(false);

    const [isLoading, setIsLoading] = useState(true);
    const [todo, setTodo] = useState<Todo | null>(null);
    const {id} = useParams();
    const todoId = Number(id);

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
    

    </div>
    <Link to={"/todos"} className="btn btn-secondary" role="button">
    &laquo; All todos
    </Link>

    </>
  )
}
export default TodoPage;

