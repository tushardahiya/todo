import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchdata();
  }, [setTodos, todo]);

  const fetchdata = () => {
    const fetchedTodos = [];
    db.collection("todos")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          fetchedTodos.push({ id, data });
        });
        console.log(fetchedTodos);
        setTodos(fetchedTodos);
      });
  };

  const addTodoHandler = () => {
    if (todo) {
      db.collection("todos").add({
        name: todo,
        completed: false,
      });
      setTodo("");
    }
  };

  const onRemoveHandler = (todo) => {
    db.collection("todos").doc(todo.id).delete();
    const newTodos = todos.filter((el) => el !== todo);
    setTodos(newTodos);
  };

  const onCompleteHandler = (todo) => {
    const updatedTodos = todos.map((obj) => {
      if (obj.id === todo.id) {
        const updatedData = {
          name: todo.data.name,
          completed: !todo.data.completed,
        };
        return { id: obj.id, data: updatedData };
      } else {
        return obj;
      }
    });
    setTodos(updatedTodos);
    db.collection("todos")
      .doc(todo.id)
      .update({ completed: !todo.data.completed });
  };

  return (
    <div className="App">
      <h1 className="heading">TO-DO APP</h1>
      <div className="input-container">
        <input
          className="input"
          onChange={(event) => setTodo(event.target.value)}
          placeholder="enter your task"
        />
        <button className="add-button" onClick={addTodoHandler}>
          ADD
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className={`todo-container${todo.data.completed}`}>
            <div onClick={() => onCompleteHandler(todo)} className="todo-name">
              {todo.data.name}
            </div>
            <button
              className="todo-remove"
              onClick={() => onRemoveHandler(todo)}
            >
              REMOVE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
