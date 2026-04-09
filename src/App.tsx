import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import Navigation from "./pages/partials/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import TodoPage from "./pages/TodoPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import { ToastContainer } from "react-toastify";



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
				<Route path="/todos/:id/edit" element= {<EditTodoPage/>}/>
				<Route path="*" element= {<NotFoundPage/>}/>
			</Routes>
		</Container>

		<ToastContainer
		autoClose={3000}
		closeOnClick={true}
		limit={5}
		newestOnTop={true}
		position="top-right"
		theme={"colored"}
		/>
		</>
	);
}

export default App;