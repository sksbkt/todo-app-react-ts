import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import { InputField } from './components/input-field/inputField';
import TodoList from './components/todo-list/todoList';
import { TodoState } from './hooks/context';
import { Todo } from './models/model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const { state: { todos }, dispatch } = TodoState();
  const [initialize, setInitialize] = useState<boolean>(true);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (todo) {
      //? since both field name and variable name are both todo we can skip :todo
      // setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      dispatch({ type: 'add', payload: { id: 0, todo: todo, isDone: false } })
      setInitialize(true);
      setTodo('');
    }
  }

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index)
      return;
    let add: Todo;
    let active = activeTodos;
    let complete = completedTodos;


    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    }
    else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === 'TodosList') {
      add.isDone = false;
      active.splice(destination.index, 0, add);
    } else {
      add.isDone = true;
      complete.splice(destination.index, 0, add);
    }
    setActiveTodos(active);
    setCompletedTodos(complete);
    updateTodos();
  }

  useLayoutEffect(() => {
    if (initialize) {
      let active: Todo[] = [];
      let complete: Todo[] = [];
      (todos as Todo[]).forEach((todo) => { !todo.isDone ? active.push(todo) : complete.push(todo) });
      setActiveTodos(active);
      setCompletedTodos(complete);
      setInitialize(false);
    }
    console.log({ activeTodos, completedTodos, todos });
  }, [todos, activeTodos, completedTodos, initialize]);

  function updateTodos() {
    dispatch({ type: 'update-todos', payload: [...activeTodos, ...completedTodos] })
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} completedTodos={completedTodos} activeTodos={activeTodos} setInitialize={setInitialize} />
      </div>
    </DragDropContext>
  );
}

export default App;
