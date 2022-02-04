import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from "@ngrx/store";
import {Todo1} from "../interface";
import {createEntityAdapter, EntityAdapter, EntityState, Update} from "@ngrx/entity";

export const TODOS_LIST_KEY = 'todosList';

export enum ToDoStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export const getTodos = createAction('[Todos] Get todos');
export const getTodosSuccess = createAction('[Todos] Get todos success', props<{ payload: Todo1[] }>());
export const addTodo = createAction('[Todos] Add todo', props<Todo1>());
export const addTodoSuccess = createAction('[Todos] Add todo success', props<{ payload: Todo1 }>());
export const removeTodo = createAction('[Todos] Remove todo', props<Todo1>());
export const removeTodoSuccess = createAction('[Todos] Remove todo success', props<{ payload: number }>());
export const deleteCompletedTodos = createAction('[Todos] Delete completed todos', props<{ payload: Todo1[] }>());
export const deleteCompletedTodosSuccess = createAction('[Todos] Delete completed todos success', props<{ payload: Todo1[] }>());
export const completeTodo = createAction('[Todos] Complete todo', props<Todo1>());
export const completeTodoSuccess = createAction('[Todos] Complete todo success', props<Todo1>());
export const completeAllTodos = createAction('[Todos] Complete all todos', props<{ payload: Todo1[] }>());
export const completeAllTodosSuccess = createAction('[Todos] Complete all todos success', props<{ payload: Update<Todo1>[] }>());
export const changeTodoTitle = createAction('[Todos] Change todo title', props<Todo1>());
export const changeTodoTitleSuccess = createAction('[Todos] Change todo title success', props<Todo1>());
export const filterTodos = createAction('[Todos] Filter todos', props<{ payload: ToDoStatus }>());

export interface TodosState extends EntityState<Todo1> {
  // todos: Todo1[]
  status: ToDoStatus
}

export const adapter: EntityAdapter<Todo1> = createEntityAdapter<Todo1>();

export const initialState: TodosState = adapter.getInitialState({
  status: ToDoStatus.ALL,
  entities: {},
  ids: [],
})

export const todosReducer = createReducer(
  initialState,
  on(getTodosSuccess, (state, {payload}) => {
    return adapter.setAll(payload, state);
  }),
  on(addTodoSuccess, (state, {payload}) => {
    return adapter.addOne(payload, state)
  }),
  on(removeTodoSuccess, (state, {payload}) => {
    return adapter.removeOne(payload, state);
  }),
  on(deleteCompletedTodosSuccess, (state, { payload }) => {
    return adapter.setAll(payload, state);
  }),
  on(completeTodoSuccess, (state, action) => {
    return adapter.upsertOne(action, state);
  }),
  on(completeAllTodosSuccess, (state, { payload }) => {
    return adapter.updateMany(payload, state);
  }),
  on(changeTodoTitleSuccess, (state, action) => {
    return adapter.upsertOne(action, state);
  }),
  on(filterTodos, (state, action) => ({
    ...state,
    status: action.payload
  }))
);

export const selectTodosState = createFeatureSelector<TodosState>(TODOS_LIST_KEY);

// const {selectAll} = adapter.getSelectors();

export const todosSelector = createSelector(
  selectTodosState,
  (state) => {
    if (state.status === ToDoStatus.COMPLETED) {
      return Object.values(state.entities).filter(item => item.completed);
    } else if (state.status === ToDoStatus.ACTIVE) {
      return Object.values(state.entities).filter(item => !item.completed);
    }

    return Object.values(state.entities);
  }
);
