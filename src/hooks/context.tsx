import { createContext, ReactNode, useContext, useReducer } from "react";

import { todoReducer } from "./todoReducerHook";


const todoListContext = createContext({} as any);


interface contextProps {
    children?: ReactNode
}



const Context = ({ children }: contextProps) => {

    const [state, dispatch] = useReducer(todoReducer, { todos: [] });

    return <todoListContext.Provider value={{ state, dispatch }}>{children}</todoListContext.Provider>
};

export default Context;

export const TodoState = () => {
    return useContext(todoListContext);
}

