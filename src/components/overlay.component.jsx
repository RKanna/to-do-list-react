import React from "react";
import { useState, useEffect } from "react";
import App from "../App";
import ItemRow from "./ItemRow.component";

const OverlayBox = ({
  onClose,
  inputContent,
  addArray,
  setSelectedOption,
  setInputValue,
  addTask,
  selectedOption,
  toDoTitle,
  btnTitle,
  inputValue,
  taskToEdit,
  onUpdateRow,
}) => {
  return (
    <div className="flex flex-col gap-2 overlay">
      <div
        className="flex justify-center w-[3rem] pb-[0.5rem] bg-lightgray rounded cursor-pointer hover:bg-red-600 hover:text-white ml-[27rem]"
        onClick={onClose}
      >
        <span className="text-2xl">x</span>
      </div>
      <div className="ui-box">
        <h2 className="text-start">{toDoTitle}</h2>
        <br />
        <div className="flex flex-col justify-start gap-2">
          <label className="text-start" htmlFor="title">
            Title
          </label>
          <input
            className="p-3"
            id="title"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            // defaultValue={inputContent}
            defaultValue={taskToEdit ? taskToEdit.title : inputContent}
            value={inputValue}
          />
        </div>

        <div className="flex flex-col justify-start gap-2">
          <label className="text-start" htmlFor="status">
            Status
          </label>
          <select
            name=""
            id=""
            className="p-3"
            onChange={(e) => setSelectedOption(e.target.value)}
            value={
              taskToEdit
                ? taskToEdit.isComplete
                  ? "complete"
                  : "incomplete"
                : selectedOption
            }
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Completed</option>
          </select>
        </div>
        <br />
        <div className="flex gap-4">
          <button
            className="p-2 rounded bg-btnclr"
            onClick={() =>
              taskToEdit
                ? onUpdateRow(taskToEdit)
                : addTask(inputValue, selectedOption)
            }
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
          <button
            className="pl-[1rem] pr-[1rem] bg-cancelbtn rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayBox;
