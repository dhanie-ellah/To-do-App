export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_FILTER = 'SET_FILTER';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const REORDER_TODOS = 'REORDER_TODOS';

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: text ,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id ,
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id ,
});

export const setFilter = (filter: 'ALL' | 'ACTIVE' | 'COMPLETED') => ({
  type: SET_FILTER,
  payload: filter ,
});

export const clearCompleted = () => ({
  type: CLEAR_COMPLETED,
});

// export const reorderTodos = (startIndex: number, endIndex: number) => ({
//   type: REORDER_TODOS,
//   payload: { startIndex, endIndex },
// });

export const reorderTodos = (todos: any[]) => ({
  type: REORDER_TODOS,
  payload: todos,
});
