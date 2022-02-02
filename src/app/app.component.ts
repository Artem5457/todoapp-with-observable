import { Component, OnInit } from '@angular/core';
import { filter, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Todo1, userId } from './interface';
import { TodosService } from './todos-service.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { filterTodos, getTodos, todosSelector, ToDoStatus } from './reducers/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  visibleTodos$: Observable<Todo1[]> = this.store.select(todosSelector);
  notCompletedTodos$!: Observable<Todo1[]>;
  buttonStatus: boolean = false;

  constructor(
    private todosService: TodosService,
    private http: HttpClient,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodos());

    // this.visibleTodos$ = this.todosService.todos$;

    // this.notCompletedTodos$ = this.todosService.todos$.pipe(
    //   tap((todo) => {
    //     this.buttonStatus = todo.some(el => el.completed)
    //   }),
    //   map((todos) => todos.filter((todo) => !todo.completed)),
    // );
  }

  completedRemove() {

    forkJoin(this.todosService.todos$.value.map(item =>
      item.completed ? this.http.delete<any>(`https://mate.academy/students-api/todos/${item.id}`) : of(item)
    )).subscribe((data) => this.todosService.todos$.next(data.filter(item => item !== 1)));

  }

  filterByAll() {
    this.store.dispatch(filterTodos({
      payload: ToDoStatus.ALL
    }));
  }

  filterByActive() {
    this.store.dispatch(filterTodos({
      payload: ToDoStatus.ACTIVE
    }))
  }

  filterByCompleted() {
    this.store.dispatch(filterTodos({
      payload: ToDoStatus.COMPLETED
    }))
  }
}
