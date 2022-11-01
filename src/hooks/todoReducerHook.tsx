
import { Todo } from "../models/model";

export interface TodoProps {
    todos: Todo[]
}

type Actions =
    { type: 'update-todos', payload: Todo[] } |
    { type: 'add', payload: Todo } |
    { type: 'remove', payload: Todo } |
    { type: 'done', payload: Todo } |
    { type: 'done-value', payload: Todo, value: boolean } |
    { type: 'edit', payload: Todo, editText: string };

export function todoReducer(state: TodoProps, action: Actions): TodoProps {
    switch (action.type) {
        case 'update-todos':
            return { todos: action.payload };
        case 'add':
            return { todos: [...state.todos, { id: Date.now(), todo: action.payload.todo, isDone: false }] };
        case 'remove':
            return { todos: state.todos.filter((todo) => todo.id !== action.payload.id) };
        case 'done':
            //? using '...' will put all of the other values of the object untouched
            // return { todos: state.todos.map((todo) => todo.id === action.payload.id ? { id: todo.id, todo: todo.todo, isDone: !todo.isDone } : todo) };
            return { todos: state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, isDone: !todo.isDone } : todo) };
        case 'done-value':
            return { todos: state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, isDone: action.value } : todo) };
        case 'edit':
            return { todos: state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, todo: action.editText } : todo) };
        default:
            console.log('other');
            return state;
    }
}

