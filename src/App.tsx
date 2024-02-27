import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import { ContextApp } from "./context/Context";

function App() {
  const {
    todos,
    setTodos,
    onClickAddTodo,
    onClickDeleteTodo,
    onClickCompleteTodo,
  } = useContext(ContextApp);

  const [inContent, setInContent] = useState("");

  return (
    <div>
      <input
        type="text"
        value={inContent}
        onChange={(e) => setInContent(e.target.value)}
      />
      <button
        onClick={() => {
          onClickAddTodo(inContent);
        }}
      >
        AddTodo
      </button>
      <ul>
        {todos.map((todo) => (
          <div>
            <li
              style={{ color: todo.isCompleted === true ? "gray" : "black" }}
              key={todo.id}
            >
              {todo.content}
            </li>
            <button
              onClick={() => {
                onClickDeleteTodo(todo.id);
              }}
            >
              Cancella task
            </button>
            <input
              type="checkbox"
              onClick={() => {
                onClickCompleteTodo(todo.id);
              }}
            ></input>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
