import { useState } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import * as TodosAPI from "../services/TodosAPI";
import { Alert } from 'react-bootstrap';
import type { Todo } from '../types/Todo.types';
import { Link } from 'react-router';

const CreateTodoPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | false>(false);

  
    const handleAddTodo = async (title: string) => {
      try{
        setTodo(null);
        const newTodo = await TodosAPI.createTodos({
          title:title,
          completed:false
        });
        console.log("created Todo yayy! Reloading todos...");
  
        setTodo(newTodo)
      } catch (err) {
        console.error("Error thrown when creating Todo: ", err)
            setError( err instanceof Error ? "Could not create TODO" +err.message : "It's not me, it's you")
        
      }
    }
  
  return (
    <>
    
			<AddTodoForm onAddTodo={handleAddTodo} />

			{error && <Alert variant="danger">{error}</Alert>}
      {todo && <Alert variant="success">
        <Link to={"/todos/" + todo.id}>Go to him</Link>
        </Alert>}
    </>
  )
}

export default CreateTodoPage