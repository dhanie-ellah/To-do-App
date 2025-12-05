import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  CLEAR_COMPLETED,
  REORDER_TODOS,
} from "../actions/todoActions";

// Define the Todo type
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Define the state type
interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
}

// Initial state
const initialState: TodoState = {
  todos: [],
  filter: "all",
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Todo reducer
export default function todoReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: generateId(), text: action.payload, completed: false },
        ],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case SET_FILTER:
      return { ...state, filter: action.payload };

    case CLEAR_COMPLETED:
      return { ...state, todos: state.todos.filter((todo) => !todo.completed) };

    case REORDER_TODOS:
      return { ...state, todos: action.payload };

    default:
      return state;
  }
}
