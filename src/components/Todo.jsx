import moment from "moment";

const Todo = function (props) {
	const {filter, todo, handleCompleted, handleRemove} = props;

	if ( (filter == 0) || (filter == 1 && todo.completed == 0) || (filter == 2 && todo.completed == 1) )  {
		return (
			<div className="todo" key={todo.id}>
				<div className="content">
					<input 
						className="checkbox" type="checkbox"
						defaultChecked={todo.completed} onClick={(e) => handleCompleted(e, !todo.completed, todo.id)}
					/>
					<label className="label">
						{todo.title} - { moment(new Date(todo.created_at)).fromNow() }
					</label>
				</div>
				<button className="btn-remove" onClick={(e) => handleRemove(e, todo.id)}><span className="fa fa-remove"></span></button>
			</div>
		)
	} else { return null; }
}

export default Todo;