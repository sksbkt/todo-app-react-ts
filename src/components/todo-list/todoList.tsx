import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../models/model";
import SingleTodo from "../single-todo/singleTodo";
import '../styles.css'

interface Props {
    todos: Todo[],
    activeTodos: Todo[]
    completedTodos: Todo[],
    setInitialize: React.Dispatch<React.SetStateAction<boolean>>
    // setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function TodoList({ todos, completedTodos, activeTodos, setInitialize }: Props) {
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
                            activeTodos.map((todo, index) => {

                                return (<SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    setInitialize={setInitialize} />
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
                                        todo={todo}
                                        setInitialize={setInitialize}
                                    />
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
