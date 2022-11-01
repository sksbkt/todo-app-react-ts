import React, { useState } from 'react';
import './App.css';
import { InputField } from './components/input-field/inputField';
import TodoList from './components/todo-list/todoList';
import { TodoState } from './hooks/context';
import { Todo } from './models/model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const { state: { todos }, dispatch } = TodoState();


  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (todo) {
      //? since both field name and variable name are both todo we can skip :todo
      // setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      dispatch({ type: 'add', payload: { id: 0, todo: todo, isDone: false } })
      setTodo('');
    }
  }

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    console.log('todos', todos);
    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index)
      return;
    let add: Todo;
    let active = todos as Todo[];
    let complete = completedTodos as Todo[];


    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    }
    else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
      dispatch({ type: 'done-value', payload: add, value: false })
    } else {
      complete.splice(destination.index, 0, add);
      dispatch({ type: 'done-value', payload: add, value: true })
    }

    console.log({ active, complete, todos });

    // if (destination.droppableId === 'TodosList') {
    //   dispatch({ type: 'done-value', payload: add, value: false })
    // } else {
    //   dispatch({ type: 'done-value', payload: add, value: true })
    // }

    console.log(source.index);


    setCompletedTodos(complete);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} completedTodos={completedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
