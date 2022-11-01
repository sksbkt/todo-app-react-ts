import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../models/model";
import SingleTodo from "../single-todo/singleTodo";
import '../styles.css'

interface Props {
    todos: Todo[],
    completedTodos: Todo[],
    // setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function TodoList({ todos, completedTodos }: Props) {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided) => (
                    <div
                        className="todos"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <span className="todos__heading">
                            Active tasks
                        </span>
                        {
                            todos.map((todo, index) => {

                                return (<SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo} />
                                )
                            })
                        }
                        {
                            provided.placeholder
                        }
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="CompletedTodosList">
                {(provided) => (
                    <div
                        className="todos remove"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">
                            Active tasks
                        </span>
                        {
                            completedTodos.map((todo, index) => {
                                return (
                                    <SingleTodo
                                        index={index}
                                        key={todo.id}
                                        todo={todo} />
                                )
                            }
                            )
                        }
                        {
                            provided.placeholder
                        }
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default TodoList;
