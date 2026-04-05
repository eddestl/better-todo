/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import type { CreateTodoPayload, Todo } from "../types/Todo.types";

const BASE_URL = "http://localhost:3000";

/**
 * Get all todos (fetch edition)
 */
export const getTodosFetch = async () => {
	// Make request to API
	const res = await fetch(BASE_URL + "/todos");
	if (!res.ok) {
		throw new Error("Response was not OK!");
	}

	return await res.json();
}

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get<Todo[]>(BASE_URL + "/todos");
	return res.data;
}

/**
 * Create todo
 */
export const createTodo = async (payload: CreateTodoPayload) => {
	const res = await axios.post<Todo>(BASE_URL + "/todos", payload);
	return res.data;
}
