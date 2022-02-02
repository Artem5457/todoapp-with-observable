
// @ts-ignore
import {createAction, createFeatureSelector, createReducer, createSelector, on, props, TypedAction} from "@ngrx/store";
import {Todo1} from "../interface";

export const TODOS_LIST_KEY = 'todosList';

export enum ToDoStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export const getTodos = createAction('[Todos] Get todos');
export const getTodosSuccess = createAction('[Todos] Get todos success', props<{payload: Todo1[]}>());
export const addTodo = createAction('[Todos] Add todo', props<Todo1>());
export const addTodoSuccess = createAction('[Todos] Add todo success', props<{payload: Todo1}>());
export const removeTodo = createAction('[Todos] Remove todo', props<Todo1>());
export const removeTodoSuccess = createAction('[Todos] Remove todo success', props<{payload: number}>());
export const deleteCompletedTodos = createAction('[Todos] Delete completed todos');
export const deleteCompletedTodosSuccess = createAction('[Todos] Delete completed todos success');
export const completeTodo = createAction('[Todos] Complete todo', props<Todo1>());
export const completeTodoSuccess = createAction('[Todos] Complete todo success', props<Todo1>());
export const completeAllTodos = createAction('[Todos] Complete all todos', props<{payload: boolean}>());
export const completeAllTodosSuccess = createAction('[Todos] Complete all todos success', props<{payload: Todo1[]}>());
export const changeTodoTitle = createAction('[Todos] Change todo title', props<Todo1>());
export const changeTodoTitleSuccess = createAction('[Todos] Change todo title success', props<Todo1>());
export const filterTodos = createAction('[Todos] Filter todos', props<{payload: ToDoStatus}>());

export interface TodosState {
  todos: Todo1[]
  status: ToDoStatus
}

export const initialState: TodosState = {
  todos: [],
  status: ToDoStatus.ALL
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
    todos: state.todos.filter(item => item.id !== action.payload)
  })),
  on(deleteCompletedTodosSuccess, (state) => ({
    ...state,
    // @ts-ignore
    todos: state.todos.filter(item => item !== 1)
  })),
  on(completeTodoSuccess, (state, {type, ...todo1}) => ({
    ...state,
    todos: state.todos.map(item => {
      if (item.id === todo1.id) {
        return todo1;
      }

      return item;
    })
  })),
  on(completeAllTodosSuccess, (state, action) => ({
    ...state,
    todos: action.payload
  })),
  on(changeTodoTitleSuccess, (state, action) => ({
    ...state,
    todos: state.todos.map(item => {
      if (item.id === action.id) {
        return {
          ...item,
          title: action.title
        };
      }

      return item;
    })
  })),
  on(filterTodos, (state, action) => ({
    ...state,
    status: action.payload
  }))
);

export const featureTodosSelector = createFeatureSelector<TodosState>(TODOS_LIST_KEY);
export const todosSelector = createSelector(
  featureTodosSelector,
  state => {

    if (state.status === ToDoStatus.COMPLETED) {
      return state.todos.filter(item => item.completed);
    } else if (state.status === ToDoStatus.ACTIVE) {
      return state.todos.filter(item => !item.completed);
    }

    return state.todos
  }
);
