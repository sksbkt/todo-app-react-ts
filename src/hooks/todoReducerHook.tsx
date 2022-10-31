
import { Todo } from "../models/model";

export interface TodoProps {
    todos: Todo[]
}

type Actions =
    { type: 'add', payload: Todo } |
    { type: 'remove', payload: Todo } |
    { type: 'done', payload: Todo } |
    { type: 'edit', payload: Todo, editText: string };

export function todoReducer(state: TodoProps, action: Actions): TodoProps {
    console.log(action.type);
    switch (action.type) {
        case 'add':
            return { todos: [...state.todos, { id: Date.now(), todo: action.payload.todo, isDone: false }] };
        case 'remove':
            return { todos: state.todos.filter((todo) => todo.id !== action.payload.id) };
        case 'done':
            //? using '...' will put all of the other values of the object untouched
            // return { todos: state.todos.map((todo) => todo.id === action.payload.id ? { id: todo.id, todo: todo.todo, isDone: !todo.isDone } : todo) };
            return { todos: state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, isDone: !todo.isDone } : todo) };
        case 'edit':
            return { todos: state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, todo: action.editText } : todo) };
        default:
            console.log('other');
            return state;
    }
}

