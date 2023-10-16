import { BiSolidTrashAlt } from "react-icons/Bi";
import { AiFillEdit } from "react-icons/Ai";
import { useState, useEffect } from "react";
import OverlayBox from "./overlay.component";
import App from "../App";
import CustomCheckbox from "./CheckBox.component";
const ItemRow = ({
  dateArg,
  inputContent,
  onCheckboxChange,
  isChecked,
  selectedOption,
  checked,
  onChange,
  isComplete,
  onDeleteRow,
  onUpdateRow,
  handleCheckboxChange,
  taskToEdit,
  task,
  index,
}) => {
  const taskClass = isComplete ? "completed-task" : "";
  const handleDeleteClick = () => {
    onDeleteRow(index);
  };

  const handleUpdateClick = () => {
    onUpdateRow(task);
  };

  const [showUpdateOverlay, setShowUpdateOverlay] = useState(false);

  const toggleUpdateOverlay = () => {
    setShowUpdateOverlay(!showUpdateOverlay);
  };

  return (
    <div className="flex justify-between items-center flex-row w-full bg-white h-[3.3rem] rounded p-2">
      <div className="flex justify-between w-full">
        <div className="p-2">
          <label htmlFor="" className="container flex flex-row">
            <div className="mt-[1.2rem]">
              <CustomCheckbox
                label=""
                checked={isComplete}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>

            <div className="flex flex-col mt-[0.2rem]">
              <span className="text-md">{dateArg}</span>
              <span className="text-xs">{inputContent}</span>
            </div>

            <span className="checkmark"></span>
          </label>
        </div>
        <div className="flex flex-row gap-4 p-5">
          <BiSolidTrashAlt
            className="bg-lightgray cursor-pointer p-[0.2rem] text-4xl"
            onClick={handleDeleteClick}
          />
          <AiFillEdit
            className="bg-lightgray cursor-pointer p-[0.2rem] text-4xl"
            onClick={toggleUpdateOverlay}
          />
          {showUpdateOverlay && (
            <OverlayBox
              onClose={toggleUpdateOverlay}
              toDoTitle={"Update TODO"}
              btnTitle={"Update Task"}
              taskToEdit={task}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
