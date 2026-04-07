import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import Navigation from "./pages/partials/Navigation";



function App() {


	return (
		<>
		<Navigation/>
		<Container className="py-3">
			<Routes>
				<Route path="/" element= {<HomePage/>}/>
				<Route path="/todos" element= {<TodosPage/>}/>
			</Routes>
		</Container>
		</>
	);
}

export default App;