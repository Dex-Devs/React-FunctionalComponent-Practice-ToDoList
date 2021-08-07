import React, {useState, useRef, useEffect} from "react";
import './App.css';
import Header from "./components/Header"
import TodoList from './components/TodoList';
import {v4 as uuid} from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const todoTitleRef = useRef();
  const LOCAL_STORAGE_KEY = "todos.todo"

  // render state on storage once
  useEffect(()=> {
    const todos = localStorage.getItem(LOCAL_STORAGE_KEY)

    // todos fetched?
    if(todos) setTodos(JSON.parse(todos));
  }, []);
  
  // track changes to state -- rerender when needed 
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // add new todo
  const handleAddTodo = (e) => {
    // get ref
    const todoTitle = todoTitleRef.current.value;
    
    if(!todoTitle || !(todoTitle.trim().length > 0)) {
      alert("Input something to add.");
      todoTitleRef.current.value = null;
      return;
    } else if(todos.find(todo => todoTitle.trim() ===  todo.title)) {
      alert("Task already on your list.");
      todoTitleRef.current.value = null;
      return;
    }

    const newTodo = {id: uuid(), title: todoTitle, completed: false};
    
    setTodos(prevTodos =>{
      return [...prevTodos, newTodo];
    }); 

    todoTitleRef.current.value = null;
  }

  // update todo status
  const handleTaskComplete = (id) => {

    // APPROACH 1
    // find todo with id then modify status
    // const start = Date.now();
    // const todosCopy = [...todos]; // for immutability
    // const todoToModify = todosCopy.find(todo => todo.id === id);
    // todoToModify.completed = !todoToModify.completed;

    // setTodos(todosCopy);
    // console.log("USING FIND", new Date(Math.floor(Date.now() - start / 1000)).getMilliseconds())


    //APPROACH 2
    // map every element modify todo with id specified
    // const start1 = Date.now();
    setTodos(prevState => {
      return [...prevState.map(todo => {
        if(id === todo.id) {
          return {...todo, completed: !todo.completed};
        }
        return todo;
      })];
    })

    // console.log("USING MAP", new Date(Math.floor(Date.now() - start1 / 1000)).getMilliseconds())
  }

  // remove already completed todos
  const handleClearTodos = () => {
    setTodos(prevState => {
      return prevState.filter(todo => todo.completed === false);
    });
  }

  return (
    <div className="app-wrapper">
      <Header />
      <div className="actions-container">
        <input 
          ref={todoTitleRef} className="title-input" 
          type="text" 
          placeholder="Add task..."
        />
        <button onClick={handleAddTodo}>Add</button>
        <button 
          className="btn-change-text"
          onClick={handleClearTodos}
        ><span>Clear Done</span>
        </button>
      </div>
      <TodoList todoList={todos} markComplete={handleTaskComplete}/>
    </div>
  );
}

export default App;
