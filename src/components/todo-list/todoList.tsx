import React from "react";
import { Todo } from "../../models/model";
import SingleTodo from "../single-todo/singleTodo";
import '../styles.css'

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
function TodoList({ todos, setTodos }: Props) {
    return <div className="todos">
        {todos.map((todo) => {
            return <SingleTodo todo={todo} key={todo.id} setTodos={setTodos} />
        })}
    </div>;
}

export default TodoList;
