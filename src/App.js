import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
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
  }, [setTodos, todo]);

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

  return (
    <div className="App">
      <h1>To-Do app</h1>
      <div>
        <input
          onChange={(event) => setTodo(event.target.value)}
          placeholder="enter your task"
        />
        <button onClick={addTodoHandler}>ADD</button>
      </div>
      <div>
        {todos.map((todo) => (
          <>
            <div>{todo.data.name}</div>
            <button onClick={() => onRemoveHandler(todo)}>remove</button>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
