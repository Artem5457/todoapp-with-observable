import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {TODOS_LIST_KEY, todosReducer, TodosState} from "./todos";

export interface State {
  [TODOS_LIST_KEY]: TodosState
}

export const reducers: ActionReducerMap<State> = {
  [TODOS_LIST_KEY]: todosReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
