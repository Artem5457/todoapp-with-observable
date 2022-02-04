import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { TodosService } from './todos-service.service';
import {forkJoin, map, Observable, switchMap, tap, of} from "rxjs";
import {
  addTodo,
  addTodoSuccess,
  changeTodoTitle,
  changeTodoTitleSuccess,
  completeAllTodos,
  completeAllTodosSuccess,
  completeTodo,
  completeTodoSuccess, deleteCompletedTodos, deleteCompletedTodosSuccess,
  getTodos,
  getTodosSuccess,
  removeTodo,
  removeTodoSuccess, todosSelector
} from "./reducers/todos";
import {Action} from "@ngrx/store";
import {Todo1} from "./interface";
import {TypedAction} from "@ngrx/store/src/models";

@Injectable()
export class AppEffects {
  getTodos$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(getTodos),
    switchMap((payload) =>
      this.todosService
        .getTodos().pipe(
          map((todos) => getTodosSuccess({payload: todos}))
        ))
  ));

  addTodo$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(addTodo),
    switchMap((payload) =>
      this.todosService
        .addTodo(payload).pipe(
          map((todo) => addTodoSuccess({payload: todo}))
        ))
  ));

  removeTodo$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(removeTodo),
    switchMap(({id}:TypedAction<string> & Todo1) =>
      this.todosService.removeTodo(id).pipe(
        map((todo) => removeTodoSuccess({payload: id}))
      )
  )));

  changeTodo$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(completeTodo),
    switchMap((payload) =>
      this.todosService.patchTodo(payload.id, {completed: !payload.completed}).pipe(
        map((todo) => completeTodoSuccess(todo))
      )
  )));

  changeTodoTitle$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(changeTodoTitle),
    switchMap((payload) =>
      this.todosService.patchTodo(payload.id, {title: payload.title}).pipe(
        map((todo) => changeTodoTitleSuccess(todo))
      ))
  ));

  completeAllTodos$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(completeAllTodos),
    switchMap((action) => {
      const observables = action.payload.map(item => this.todosService.patchTodo(item.id, {completed: item.completed}));
      return forkJoin(observables).pipe(
        map(todos => todos.map(item => {
          return {
            id: item.id,
            changes: {
              ...item,
              completed: item.completed
            }
          };
        }))
      );
    }),
    map((todos) => completeAllTodosSuccess({payload: todos}))
  ));

  clearCompletedTodos$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deleteCompletedTodos),
    switchMap((action) => {
      const observables = action.payload.map(item => item.completed ? this.todosService.removeTodo(item.id) : of(item));
      return forkJoin(observables).pipe(
        map(todos => todos.filter(item => item !== 1))
      )
    }),
    // @ts-ignore
    map((todos) => deleteCompletedTodosSuccess({payload: todos}))
  ))

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
  ) {}
}
