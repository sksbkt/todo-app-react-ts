import React, { useState } from 'react';
import './App.css';
import { InputField } from './components/input-field/inputField';
import TodoList from './components/todo-list/todoList';
import { TodoState } from './hooks/context';
import { Todo } from './models/model';



const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('');
  // const [todos, setTodos] = useState<Todo[]>([]);

  const { state: { todos }, dispatch } = TodoState();
  console.log('sss', todos);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (todo) {
      //? since both field name and variable name are both todo we can skip :todo
      // setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      dispatch({ type: 'add', payload: { id: 0, todo: todo, isDone: false } })
      setTodo('');
    }
  }

  return (
    <div className="App">
      <span className="heading">Tasify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos as Todo[]} setTodos={() => { }} />
    </div>
  );
}

export default App;
