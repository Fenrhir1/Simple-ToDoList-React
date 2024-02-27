import { ReactNode, createContext, useState } from "react";
import { ToDo } from "../declaration";

type ContextProps = {
  children: ReactNode;
};

type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

export const ContextApp = createContext({
  todos: [] as ToDo[],
  onClickAddTodo: (content: ToDo["content"]) => {},
  onClickDeleteTodo: (id: number) => {},
  onClickCompleteTodo: (id: number) => {},
  setTodos: (todos: Todo[]) => {},
});

export const ContextProvider = ({ children }: ContextProps) => {
  const [todos, setTodos] = useState([]) as any[];

  const onClickAddTodo = (content: ToDo["content"]) => {
    const newTodos = {
      id: Math.floor(Math.random() * 1000),
      content,
      isCompleted: false,
    };
    setTodos([...todos, newTodos]);
  };

  const onClickDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo: { id: number }) => todo.id !== id));
  };

  const onClickCompleteTodo = (id: number) => {
    setTodos(
      todos.map((todo: { id: number; isCompleted: any }) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      })
    );
  };

  return (
    <ContextApp.Provider
      value={{
        todos,
        setTodos,
        onClickAddTodo,
        onClickDeleteTodo,
        onClickCompleteTodo,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
