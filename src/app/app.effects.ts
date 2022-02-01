import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { TodosService } from './todos-service.service';
import { HttpClient } from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {getTodos} from "./reducers/todos";

@Injectable()
export class AppEffects {
  getTodos$: Observable<Actions> = createEffect(() => this.actions$.pipe(
    ofType(getTodos),
    switchMap((payload) =>
      this.todosService
        )
  ))

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
    private http: HttpClient
  ) {}
}
