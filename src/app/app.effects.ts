import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { TodosService } from './todos-service.service';
import {map, Observable, switchMap, tap} from "rxjs";
import {
  addTodo,
  addTodoSuccess,
  changeTodoTitle,
  changeTodoTitleSuccess,
  completeTodo,
  completeTodoSuccess,
  getTodos,
  getTodosSuccess,
  removeTodo,
  removeTodoSuccess
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
      this.todosService.changeStatus(payload).pipe(
        map((todo) => completeTodoSuccess(todo))
      )
  )));

  changeTodoTitle$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(changeTodoTitle),
    switchMap((payload) =>
      this.todosService.changeTitle(payload).pipe(
        map((todo) => changeTodoTitleSuccess(todo))
      ))
  ))

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
  ) {}
}
