import React, { useState, useEffect, useReducer, useCallback } from "react";
import { Navigate } from "react-router-dom";
import Todo from "../components/Todo";
import reducer from "../components/reducer";
import { todosApi } from "../config/axios";
import Navbar from "../components/Navbar";
import { Notyf } from 'notyf';
import "../assets/css/todos.css";
const notyf = new Notyf({ duration: 5000, position: { x: 'right', y: 'top' } });

function Todos ({logged}) {
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState("");
	const [filter, setFilter] = useState(0);
	const [items, dispatch] = useReducer(reducer, []);

	useEffect(() => {
	    getItems()
	}, [])

	async function getItems() {
		setLoading(true)
		await todosApi({ method: 'get', url:  'todos/' })
		.then(function (response) {
			setLoading(false)
			dispatch({type: "fetch", items: response.data});
			if (response.data.message) notyf.success(response.data.message);
		}).catch((error) => {
			if (error.response.data.message) notyf.error(error.response.data.message);
			setLoading(false)
		});
  	}

	const handleSubmit = async function (e) {
		e.preventDefault();
		if ( input !== "") {
			const item = {"title": input, completed: 0}
			setLoading(true)
			await todosApi({ method: 'post', url:  'todos/', data: item })
			.then(function (response) {
				setLoading(false)
			  	setInput(input => "")
			  	dispatch({type: "add", item: response.data})
				if (response.data.message) notyf.success(response.data.message);
			}).catch((error) => {
				setLoading(false)
				if (error.response.data.message) notyf.error(error.response.data.message);
			});
		}
	}

	const handleRemove = useCallback(async function (e, id) {
		e.preventDefault()
		setLoading(true)
		await todosApi({ method: 'delete', url:  'todos/', data: {id} })
		.then(function (response) {
			setLoading(false)
			dispatch({type: "remove", id: id})
			if (response.data.message) notyf.success(response.data.message);
		}).catch((error) => {
			setLoading(false)
			if (error.response.data.message) notyf.error(error.response.data.message);
		});
	})

	const handleCompleted = useCallback(async function (e, completed, id) {
		e.preventDefault();
		setLoading(true)
		await todosApi({ method: 'put', url:  'completed/', data: {id, completed} })
			.then(function (response) {
				setLoading(false)
				dispatch({type: "completed", item: {id: id, completed: (completed ? 1 : 0)} });
				if (response.data.message) notyf.success(response.data.message);
			}).catch((error) => {
				if (error.response.data.message) notyf.error(error.response.data.message);
				setLoading(false)
			});
	}, [])

	const RenderTodo = useCallback(function (todo, filter, handleRemove, handleCompleted) {
		return ( <Todo todo={todo} key ={todo.id} filter={filter} handleRemove={handleRemove} handleCompleted={handleCompleted} /> )
	}, [items, filter])

	if (!items) return null;

	const Filter = React.memo(function () {
		return (
			<div className="filter">
				<button className={"btn" + (filter === 0 ? " active" : "")} onClick={(e) => setFilter(filter => 0)}>All</button>
				<button className={"btn" + (filter === 1 ? " active" : "")} onClick={(e) => setFilter(filter => 1)}>Unfinished</button>
				<button className={"btn" + (filter === 2 ? " active" : "")} onClick={(e) => setFilter(filter => 2)}>Finished</button>
			</div>
		)
	}, [filter])

	if (!logged) {
		return <Navigate replace to="/login" />;
	} else {
		return (
			<div>
				<Navbar logged={logged} />

				<div className="todo-box">
					<h1 className="title">{items.length} todo(s) left</h1>

					<form className="form-add" onSubmit={(e) => handleSubmit(e)}>
						<input 
							className="input-add" type="text" placeholder="What needs to be done ?"
							value={input} onChange={(e) => setInput(input => e.target.value)} 
						/>
					</form>

					<Filter />

					{loading ?
						<div className="container-loader mt-7"><div className="loader"></div></div>
					:
						<ul className="list">
							{items.map((todo) => RenderTodo(todo, filter, handleRemove, handleCompleted) )}
						</ul>
					}	


				</div>
				
			</div>
		);
	}
} 

export default Todos;