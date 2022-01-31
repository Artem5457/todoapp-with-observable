import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from "@ngrx/store";
import {Todo1} from "../interface";

export const TODOS_LIST_KEY = 'todosList';

export const getTodos = createAction('[Todos] Get todos');
export const getTodosSuccess = createAction('[Todos] Get todos success', props<{payload: Todo1[]}>());
export const addTodo = createAction('[Todos] Add todo', props<{payload: Todo1}>());
export const addTodoSuccess = createAction('[Todos] Add todo success', props<{payload: Todo1}>());
export const removeTodo = createAction('[Todos] Remove todo', props<{payload: Todo1}>());
export const removeTodoSuccess = createAction('[Todos] Remove todo success', props<{payload: Todo1}>());
export const deleteCompletedTodos = createAction('[Todos] Delete completed todos');
export const deleteCompletedTodosSuccess = createAction('[Todos] Delete completed todos success');
export const completeAllTodos = createAction('[Todos] Complete all todos');
export const completeAllTodosSuccess = createAction('[Todos] Complete all todos success', props<{payload: boolean}>());
export const changeTodoTitle = createAction('[Todos] Change todo title', props<{payload: Todo1}>());
export const changeTodoTitleSuccess = createAction('[Todos] Change todo title success', props<{payload: Todo1, title: string}>());

export interface TodosState {
  todos: Todo1[]
}

export const initialState: TodosState = {
  todos: []
}

export const todosReducer = createReducer(
  initialState,
  on(getTodosSuccess, (state, action) => ({
    ...state,
    todos: [...action.payload]
  })),
  on(addTodoSuccess, (state, action) => ({
    ...state,
    todos: [...state.todos, action.payload]
  })),
  on(removeTodoSuccess, (state, action) => ({
    ...state,
    todos: state.todos.filter(item => item.id !== action.payload.id)
  })),
  on(deleteCompletedTodosSuccess, (state) => ({
    ...state,
    todos: state.todos.filter(item => !item.completed)
  })),
  on(completeAllTodosSuccess, (state, action) => ({
    ...state,
    todos: state.todos.map(item => {
      return {
        ...item,
        completed: action.payload
      }
    })
  })),
  on(changeTodoTitleSuccess, (state, action) => ({
    ...state,
    todos: state.todos.map(item => {
      if (item.id === action.payload.id) {
        return {
          ...item,
          title: action.title
        };
      }

      return item;
    })
  }))
);

export const featureTodosSelector = createFeatureSelector<TodosState>(TODOS_LIST_KEY);
export const todosSelector = createSelector(
  featureTodosSelector,
  state => state.todos
);
