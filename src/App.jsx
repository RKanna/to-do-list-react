import { useState, useEffect } from "react";
import "./App.css";
import ItemRow from "./components/ItemRow.component";
import OverlayBox from "./components/overlay.component";
import CustomCheckbox from "./components/CheckBox.component";

function App({ dateArg, inputContent }) {
  //for Overlay open and close
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };
  //End of Overlay code

  //for CheckBox Checking

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isComplete = !updatedTasks[index].isComplete;
    setTasks(updatedTasks);
  };

  //End of Checkbox code

  //for filtering
  const [completeTasks, setCompleteTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [selectedOptionTwo, setSelectedOptionTwo] = useState("All");
  //end of filter code

  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("incomplete");
  const [completeArray, setCompleteArray] = useState([]);
  const [incompleteArray, setIncompleteArray] = useState([]);
  const [allArray, setAllArray] = useState([
    ...completeArray,
    ...incompleteArray,
  ]);
  // const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const currentDateTime = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      currentDateTime
    );

    const isComplete = selectedOption === "complete";

    const newTask = {
      title,
      status: formattedDateTime,
      isComplete,
      checked: isComplete,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
    toggleOverlay();

    if (isComplete) {
      setCompleteTasks([...completeTasks, newTask]);
    } else {
      setIncompleteTasks([...incompleteTasks, newTask]);
    }
  };

  const addArray = () => {
    if (selectedOption === "complete") {
      setCompleteArray([inputValue, ...completeArray]);
      console.log("hit");
      console.log(completeArray);
    } else if (selectedOption === "incomplete") {
      setIncompleteArray([inputValue, ...incompleteArray]);
      console.log("hit2");
      console.log(incompleteArray);
    }
    setInputValue("");
  };

  //for Deletion of Row

  const onDeleteRow = (index) => {
    const updatedTasks = [...tasks];
    const taskToDelete = updatedTasks[index];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    if (taskToDelete) {
      if (taskToDelete.isComplete) {
        setCompleteTasks(completeTasks.filter((task) => task !== taskToDelete));
      } else {
        setIncompleteTasks(
          incompleteTasks.filter((task) => task !== taskToDelete)
        );
      }
    }
  };

  //End of Deletion

  //For Updating a Row

  const [taskToEdit, setTaskToEdit] = useState(null);
  const onUpdateRow = (task) => {
    setTaskToEdit(task);
    setInputValue(task.title);
    setSelectedOption(task.isComplete ? "complete" : "incomplete");
    toggleOverlay();
  };

  //for Updating

  const updateTask = () => {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex((task) => task === taskToEdit);

    if (index !== -1) {
      updatedTasks[index] = {
        ...taskToEdit,
        title: inputValue,
        isComplete: selectedOption === "complete",
      };

      setTasks(updatedTasks);

      if (selectedOption === "complete") {
        setCompleteTasks(updatedTasks);
      } else {
        setIncompleteTasks(updatedTasks);
      }

      toggleOverlay();
    }
  };

  //End of update code

  //For local storage

  // const [tasks, setTasks] = useState(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //   return storedTasks;
  // });

  const [filteredTasks, setFilteredTasks] = useState([]);

  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });

  useEffect(() => {
    // Update filteredTasks here
    setFilteredTasks(
      selectedOption === "Complete"
        ? tasks.filter((task) => task.isComplete)
        : selectedOption === "Incomplete"
        ? tasks.filter((task) => !task.isComplete)
        : tasks
    );
    // Store tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, selectedOption]);

  useEffect(() => {
    setFilteredTasks(
      selectedOption === "Complete"
        ? tasks.filter((task) => task.isComplete)
        : selectedOption === "Incomplete"
        ? tasks.filter((task) => !task.isComplete)
        : tasks
    );
  }, [selectedOption, tasks]);

  //End of local storage

  return (
    <>
      <main className="h-screen w-[50%] mx-auto flex flex-col justify-center items-center gap-2">
        <div className="h-[10%] w-screen flex justify-center items-center">
          <h1 className="text-4xl font-bold uppercase">todo list</h1>
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            className="p-2 font-bold text-white bg-blue-400 border rounded"
            onClick={toggleOverlay}
          >
            Add Task
          </button>
          {showOverlay && (
            <OverlayBox
              onClose={toggleOverlay}
              setInputValue={setInputValue}
              setSelectedOption={setSelectedOption}
              inputContent={inputValue}
              addArray={addArray}
              addTask={addTask}
              selectedOption={selectedOption}
              toDoTitle={taskToEdit ? "Update TODO" : "Add TODO"}
              btnTitle={taskToEdit ? "Update Task" : "Add Task"}
              inputValue={inputValue}
              taskToEdit={taskToEdit}
              updateTask={updateTask}
            />
          )}
          <select
            className="p-2 font-bold bg-blue-400 rounded"
            name=""
            id=""
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        <div className="flex flex-col justify-between w-full h-auto gap-2 p-4 bg-blue-400 rounded gitems-center">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <ItemRow
                // key={task.id}
                key={index}
                dateArg={task.title}
                inputContent={task.status}
                // checked={checked}
                isComplete={task.isComplete}
                checked={task.checked}
                onChange={() => handleCheckboxChange(index)}
                onDeleteRow={() => onDeleteRow(index)}
                onUpdateRow={() => onUpdateRow(task)}
                index={index}
              />
            ))
          ) : (
            <div className="flex justify-center">
              <span className="text-xl text-white">No Todos</span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
