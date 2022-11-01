import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../models/model";
import '../styles.css';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { TodoState } from "../../hooks/context";
import { Draggable } from "react-beautiful-dnd";


interface Props {
    todo: Todo,
    index: number
}
const SingleTodo: React.FC<Props> = ({ todo, index }) => {
    const { dispatch } = TodoState();
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (todo: Todo) => {
        dispatch({ type: 'done', payload: todo }
        )
    }
    const handleDelete = (todo: Todo) => {
        dispatch({ type: 'remove', payload: todo });

    }

    const handleEdit = (e: React.FormEvent, todo: Todo) => {
        e.preventDefault();
        // setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo));
        dispatch({ type: 'edit', payload: todo, editText: editTodo })
        setEdit(false);
    }
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);



    return <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
            <form className="todos__single"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onSubmit={(e) => handleEdit(e, todo)}
                onBlur={(e) => handleEdit(e, todo)}>
                {
                    edit ? (
                        <input
                            ref={inputRef}
                            type="input"
                            className="todos__single--text"
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)} />
                    ) : (todo.isDone ? (
                        <s className="todos__single--text">{todo.todo}</s>
                    ) : (
                        <span className="todos__single--text" onDoubleClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}>{todo.todo}</span>
                    ))

                }

                <div>
                    {!edit && <span className="icon" onClick={
                        () => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}><AiFillEdit /></span>}
                    <span className="icon" onClick={() => handleDelete(todo)}><AiFillDelete /></span>
                    <span key={todo.id} className="icon" onClick={() => handleDone(todo)}><MdDone /></span>
                </div>
            </form>
        )}
    </Draggable>

};

export default SingleTodo;
