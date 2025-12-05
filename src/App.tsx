import React from "react";
import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import type { RootState } from "./redux/store";
import { addTodo, deleteTodo, toggleTodo, setFilter, clearCompleted, reorderTodos } from "./redux/actions/todoActions";
import lightBGDesktop from "./assets/bg-desktop-light.jpg";
import darkBGDesktop from "./assets/bg-desktop-dark.jpg";
import lightBGMobile from "./assets/bg-mobile-light.jpg";
import darkBGMobile from "./assets/bg-mobile-dark.jpg";
import moonIcon from "./assets/icon-moon.svg";
import sunIcon from "./assets/icon-sun.svg";
import checkIcon from "./assets/icon-check.svg";
import crossIcon from "./assets/icon-cross.svg";

function TodoApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [input, setInput] = useState("")
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // connect to redux
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state: RootState) => state);
  
  // Add new todo
  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      dispatch(addTodo(input.trim()));
      setInput("");
    }
  }
  
  // Toggle todo completion
  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  }
  
  // Delete todo
  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  }
  
  // Set filter
  const handleSetFilter = (filter: "ALL" | "ACTIVE" | "COMPLETED") => {
    dispatch(setFilter(filter));
  }
  
  // Clear completed todos
  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  }

  // filter todos based on current filter
  const filteredTodos = todos.filter((todo: any) => {
    if (filter === "ACTIVE") return !todo.completed;
    if (filter === "COMPLETED") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo: any) => !todo.completed).length;
  
  // Reorder todos
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = "move";
  }
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const draggedIndex = todos.findIndex((todo: any) => todo.id === draggedItem);
    const droppedIndex = todos.findIndex((todo: any) => todo.id === id);

    const updatedTodos = Array.from(todos);
    const [removed] = updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(droppedIndex, 0, removed);

    dispatch(reorderTodos(updatedTodos));
    setDraggedItem(null);
  }

  const handleDragEnd = () => {
    setDraggedItem(null);
  }

  return (
      <div
        className={`relative h-screen w-screen ${
          isDarkMode ? "bg-dark-bg" : "bg-light-bg"
        }`}
      >
        {/* Background Images */}
        <img
          src={isDarkMode ? darkBGDesktop : lightBGDesktop}
          alt="Background Desktop"
          className="md:hidden"
        />
        <img
          src={isDarkMode ? darkBGMobile : lightBGMobile}
          alt="Background Mobile"
          className="hidden md:block md:w-full"
        />

        {/* Main Container */}
        <div className="absolute top-[15%] md:top-[8%] left-1/2 w-[45%] md:w-[90%] transform -translate-x-1/2 px-4 flex flex-col gap-8 md:gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">TODO</h1>
            <img
              src={isDarkMode ? sunIcon : moonIcon}
              alt="Toggle Dark Mode"
              className="cursor-pointer w-[3%]"
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
          </div>

          {/* Input Field */}
          <div
            className={`flex items-center gap-2 ${
              isDarkMode ? "bg-dark-bg" : "bg-light-bg"
            } rounded-md p-4`}
          >
            <div className="w-5 h-5 border-[1.5px] border-light-border rounded-full"></div>
            <input
              type="text"
              placeholder="Create a new todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown = {handleAddTodo}
              className="w-full bg-transparent outline-none text-light-text"
            />
          </div>

          {/* Todo List */}
          <div
            className={`flex items-center flex-col gap-4 ${
              isDarkMode ? "bg-dark-bg" : "bg-light-bg"
            } rounded-md p-4 shadow-lg`}
          >
            {
              filteredTodos.length === 0 ? (
                <p className=" text-light-textMuted">No todos available. Add one above!</p>
              ) : (
                filteredTodos.map((todo: any, index: any) => (
                  <div
                    key={todo.id}
                    className=" w-full flex flex-col gap-2"
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, todo.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className=" flex gap-2 cursor-pointer"
                        onClick={() => handleToggleTodo(todo.id)}
                      >
                        <div className={`w-5 h-5 border-[1.5px] rounded-full flex items-center justify-center ${
                          todo.completed ? "bg-gradient-to-br from-purple-400 to-pink-600" : "border-light-border"
                        }`}>
                          {todo.completed && (
                            <img src={checkIcon} alt="Completed" className="w-3 h-3" />
                          )}
                        </div>
                        <span className={` text-light-text ${todo.completed ? "line-through text-light-textMuted" : ""}`}>
                          {todo.text}
                        </span>
                      </div>
                      <div className=" w-[2%]">
                        <img
                          src={crossIcon}
                          alt="Delete Todo"
                          className="cursor-pointer w-full"
                          onClick={() => handleDeleteTodo(todo.id)}
                        />
                      </div>
                    </div>
                    <hr
                      className={`w-full ${
                        isDarkMode ? "bg-light-border" : "bg-dark-border"
                      }`}
                    />
                  </div>
                ))
              )
            }
            {/* Example Todo Item */}
            {/* <div className=" w-full flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className=" flex gap-2">
                  <div className="w-5 h-5 border-[1.5px] border-light-border rounded-full flex items-center justify-center">
                    <img src={checkIcon} alt="Completed" className="w-3 h-3" />
                  </div>
                  <span className=" text-light-textMuted line-through">
                    Complete online JavaScript course
                  </span>
                </div>
                <div className=" w-[2%]">
                  <img
                    src={crossIcon}
                    alt="Delete Todo"
                    className="cursor-pointer w-full"
                  />
                </div>
              </div>
              <hr
                className={`w-full ${
                  isDarkMode ? "bg-light-border" : "bg-dark-border"
                }`}
              />
            </div> */}
            {/* Add more todo items as needed */}
            <div className=" w-full flex items-center justify-between text-light-text text-sm">
              <p>{activeCount} items left</p>
              <div className=" flex items-center gap-3 md:hidden">
                <p className=" cursor-pointer" onClick={()=> handleSetFilter("ALL")}>All</p>
                <p className=" cursor-pointer" onClick={()=>handleSetFilter("ACTIVE")}>Active</p>
                <p className=" cursor-pointer" onClick={()=>handleSetFilter("COMPLETED")}>Completed</p>
              </div>
              <p onClick={handleClearCompleted} className=" cursor-pointer">Clear completed</p>
            </div>
        </div>
        
        <div className={`w-full justify-center text-light-text text-sm hidden md:flex gap-5 items-center ${isDarkMode ? "bg-dark-bg" : "bg-light-bg"} rounded-md p-4 shadow-lg`}>
                <p className=" cursor-pointer" onClick={()=> handleSetFilter("ALL")}>All</p>
                <p className=" cursor-pointer" onClick={()=>handleSetFilter("ACTIVE")}>Active</p>
                <p className=" cursor-pointer" onClick={()=>handleSetFilter("COMPLETED")}>Completed</p>
            </div>
        </div>
      </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  );
}

export default App;
