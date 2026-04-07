
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import AddTodoForm from "../components/AddTodoForm";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";
import "../assets/scss/App.scss";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";

const TodosPage = () => {
	const [todos, setTodos] = useState<Todo[] |null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);

	const getTodos = async () => {
      try{
		const data = await TodosAPI.getTodos();

      setTodos(data);
      setIsLoading(false);
  } catch(err){
      console.error("getTodos error: ", err)
      setError(err instanceof Error ? err.message : "It's not me, it's you")
       setIsLoading(false);
  } 

}

	const handleDeleteTodo = async (todo: Todo) => {
		try{
			await TodosAPI.deleteTodo(todo.id);
			await getTodos();
		} catch (err) {
			console.error("Error thrown when deleting Todo: ", err)
      		setError( err instanceof Error ? "Could not delete TODO" +err.message : "It's not me, it's you")
       		setIsLoading(false);
		}
	}

	const handleToggleTodo = async (todo: Todo) => {
		try{
			const updatedTodo = await TodosAPI.updateTodos(todo.id,{
				completed : !todo.completed
			});
			console.log("Updating toggle!");

			setTodos(prev => prev ? prev.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo): []);
		} catch (err) {
			console.error("Error thrown when updating Todo: ", err)
      		setError( err instanceof Error ? "Could not update TODO" +err.message : "It's not me, it's you")
       		setIsLoading(false);
		}
	}

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodos();
	}, []);
    return (
 <Container>
	
			<h1>Simple Todos</h1>

			{error && <Alert variant="danger">{error}</Alert>}

      {isLoading && <p>Loading todo items</p>}
      

			{todos && ( todos.length ? (
				<>
			<ListGroup className="todoList mb-4">
				{todos.map(todo => 
					<ListGroup.Item
					action
					as={Link}
					className={todo.completed ? "completed" :""}
					key={todo.id}
					to={"/todos/" + todo.id}
					>
						<span className="todo-title">{todo.title}</span>

					</ListGroup.Item>
				)}
			</ListGroup>
			<TodoCounter completed={todos.filter(todo => todo.completed).length} total={todos.length}/>
			</>
			) : (
				<p>You ain't got no todos to do, time to party!!111 Untz untz untz 🥳!</p>
			)
      )}
	    <Link to={"/todos/create"} className="btn btn-primary" role="button">Do you have something that needs to be done?</Link>
		</Container>
        )
}
export default TodosPage;