import { Link } from "react-router";
import {Button, ButtonGroup} from "react-bootstrap"
import { toast } from "react-toastify";


const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is on fire 🔥, you need a <Link to="/todos">todo list</Link>.</p>
			<ButtonGroup>
				<Button 
				variant="primary"
				onClick={() => toast("Wow, such success, very influencer, much money", {icon: () => "⭐" })}>
					Celebrate!!
				</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;