import { Component, OnInit } from '@angular/core';
import {map, Observable, Subscription, tap} from 'rxjs';
import { Todo1 } from './interface';
import { TodosService } from './todos-service.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  completeAllTodos,
  deleteCompletedTodos,
  filterTodos,
  getTodos,
  todosSelector,
  ToDoStatus
} from './reducers/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  visibleTodos$: Observable<Todo1[]> = this.store.select(todosSelector);
  notCompletedTodos$!: Observable<Todo1[]>;
  buttonStatus: boolean = false;
  visibleTodos: Todo1[] = [];
  subs: Subscription = new Subscription();

  constructor(
    private todosService: TodosService,
    private http: HttpClient,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodos());

    this.subs.add(this.visibleTodos$.subscribe((todos) => {
        this.visibleTodos = todos;
      })
    );

    // Спросить завтра об этом моменте
    this.notCompletedTodos$ = this.visibleTodos$.pipe(
      tap((todo) => {
        this.buttonStatus = todo.some(el => el.completed)
      }),
      map((todos) => todos.filter((todo) => !todo.completed)),
    );
  }

  completeAllTodos(status: boolean) {
    this.store.dispatch(completeAllTodos({payload: this.visibleTodos.map((todo) => {
      return {...todo, completed: status}
      })}));
  }

  clearCompletedTodos() {
    this.store.dispatch(deleteCompletedTodos({payload: this.visibleTodos}));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  filterByAll() {
    this.store.dispatch(filterTodos({
      payload: ToDoStatus.ALL
    }));
  }

  filterByActive() {
    this.store.dispatch(filterTodos({
      payload: ToDoStatus.ACTIVE
    }));
  }

  filterByCompleted() {
    this.store.dispatch(filterTodos({
      payload: ToDoStatus.COMPLETED
    }));
  }
}
