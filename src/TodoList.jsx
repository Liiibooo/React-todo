import React, { Component, useState, useEffect, useCallback, useRef } from 'react';
import './TodoList.css';

let idSeq = Date.now();

function Control(props) {
  const { addTodo } = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim()
    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    inputRef.current.value = '';
  }

  return (
    <div className="control">
      <h1>
        todoList
      </h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="what needs to be done?" />
      </form>
    </div>
  )
}

function TodoItem(props) {
  const {
    todo: {
      id,
      text,
      complete
    },
    toggleTodo,
    removeTodo } = props;
  const onChange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}

function Todo(props) {
  const { todoList, removeTodo, toggleTodo } = props;
  return (
    <ul>
      {
        todoList.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            >
            </TodoItem>
          )
        })
      }
    </ul>
  )
}



function TodoList() {
  const [todoList, setTodoList] = useState([])

  const addTodo = useCallback((todo) => {
    setTodoList(todoList => [...todoList, todo])
  }, []);

  const removeTodo = useCallback((id) => {
    // return console.log(1);

    setTodoList((todoList) =>
      todoList.filter(todo => {
        return todo.id !== id;
      })
    )
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodoList(todoList => todoList.map(todo => {
      return todo.id == id
        ? {
          ...todo,
          complete: !todo.complete,
        }
        : todo;
    }))
  }, []);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo}></Control>
      <Todo removeTodo={removeTodo} toggleTodo={toggleTodo} todoList={todoList}></Todo>
    </div>
  )
}



export default TodoList;
