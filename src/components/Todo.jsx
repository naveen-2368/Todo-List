import React, { useEffect, useRef, useState } from "react";
import TodoItem from "./Todoitem";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  //useEffect 
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList])

  const inputRef = useRef();

  // Add New Task
  const addTask = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const toggleTask = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        id === todo.id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  // Delete todo list
  const deleteTodo = (id) => {
    setTodoList((prev) => {
      // Corrected: Ensure the correct return inside filter
      return prev.filter((todo) => todo.id !== id);
    });
  };

  // Add Task on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <>
      <div className="w-[30-rem]">
        <h1 className="text-lg my-2 font-medium text-amber-500">Todo List</h1>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              ref={inputRef}
              onKeyDown={handleKeyDown} // Listen for Enter key press
              placeholder="Enter your Task"
              className="py-3 px-4 w-full text-sm border focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            className="py-3 px-4 bg-blue-600 text-white hover:bg-blue-800 text-sm font-medium rounded-sm border-none"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <p className="my-3 text-sm text-zinc-400 px-1">Fill Task Details</p>
      </div>

      <div className="w-[30-rem] bg-white shadow py-6 px-4">
        <fieldset className="space-y-3">
          <legend className="text-pink-600 font-medium">List Of Tasks</legend>
          {/* List item start */}
          {todoList.length === 0 ? (
            <p className="text-gray-500 text-sm">No Tasks Found</p>
          ) : (
            todoList.map((todo, index) => (
              <TodoItem
                text={todo.text}
                key={todo.id}
                isComplete={todo.isComplete} // Fix: Access isComplete from the todo item
                id={todo.id}
                toggleTask={toggleTask}
                deleteTodo={deleteTodo}
              />
            ))
          )}
          {/* List item End */}
        </fieldset>
      </div>
    </>
  );
};

export default Todo;
