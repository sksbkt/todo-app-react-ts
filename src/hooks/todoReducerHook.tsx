
import { Todo } from "../models/model";

type Actions =
    { type: 'add', payload: string } |
    { type: 'remove', payload: number } |
    { type: 'done', payload: number } |
    { type: 'edit', editTodoText: string, payload: number };

export function TodoReducer(state: Todo[], action: Actions) {
    console.log(action.type);
    switch (action.type) {
        case 'add':
            return [...state, { id: Date.now(), todo: action.payload, isDone: false }];
        case 'remove':
            return state.filter((todo) => todo.id !== action.payload);
        case 'done':
            return state.map((todo) => todo.id === action.payload ? { ...state, isDone: !todo.isDone } : todo) as Todo[];
        case 'edit':
            console.log("EDIT:", action);
            return state.map((todo) => todo.id === action.payload ? { ...state, todo: action.editTodoText } : todo) as Todo[];
        default:
            console.log('other');
            return state;
    }
}

