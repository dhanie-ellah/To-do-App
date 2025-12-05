import { createStore } from "redux";
// import rootReducer from "./reducers/rootReducer";
import todoReducer from "./reducers/todoReducer";

export const store = createStore(todoReducer);

export type RootState = ReturnType<typeof todoReducer>;
export type AppDispatch = typeof store.dispatch;