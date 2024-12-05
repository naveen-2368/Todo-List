import React from "react";

const TodoItem = ({ text, isComplete, id, toggleTask, deleteTodo }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <label
        onClick={() => toggleTask(id)}
        className={`hover:bg-slate-200 flex-1 p-2 rounded-md cursor-pointer select-none ${
          isComplete ? "line-through text-slate-500" : ""
        }`}
      >
        {text}
      </label>
      <div>
        <div
          onClick={() => deleteTodo(id)}
          className="size-[32px] p-1 hover:bg-red-50 rounded-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ccc"
            className="hover:fill-red-600"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
