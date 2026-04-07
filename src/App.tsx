import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import Navigation from "./pages/partials/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import TodoPage from "./pages/TodoPage";
import CreateTodoPage from "./pages/CreateTodoPage";



function App() {


	return (
		<>
		<Navigation/>
		<Container className="py-3">
			<Routes>
				<Route path="/" element= {<HomePage/>}/>
				<Route path="/todos" element= {<TodosPage/>}/>
				<Route path="todos/:id" element= {<TodoPage/>}/>
				<Route path="/todos/create" element= {<CreateTodoPage/>}/>
				<Route path="*" element= {<NotFoundPage/>}/>
			</Routes>
		</Container>
		</>
	);
}

export default App;