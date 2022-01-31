import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { forkJoin, map, Observable, of, tap } from 'rxjs';
import { Todo1, userId } from './interface';
import { TodosService } from './todos-service.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  visibleTodos$!: Observable<Todo1[]>;
  notCompletedTodos$!: Observable<Todo1[]>;
  buttonStatus: boolean = false;

  constructor(
    private todosService: TodosService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<Todo1[]>(`https://mate.academy/students-api/todos?userId=${userId}`)
      .subscribe((todos) => {
      this.todosService.todos$.next(todos);
    });

    this.visibleTodos$ = this.todosService.todos$;

    this.notCompletedTodos$ = this.todosService.todos$.pipe(
      tap((todo) => {
        this.buttonStatus = todo.some(el => el.completed)
      }),
      map((todos) => todos.filter((todo) => !todo.completed)),
    );
  }

  completedRemove() {

    forkJoin(this.todosService.todos$.value.map(item =>
      item.completed ? this.http.delete<any>(`https://mate.academy/students-api/todos/${item.id}`) : of(item)
    )).subscribe((data) => this.todosService.todos$.next(data.filter(item => item !== 1)));

  }

  filterByAll() {
    this.http.get<Todo1[]>(`https://mate.academy/students-api/todos?userId=${userId}`)
      .subscribe(todos => {
        this.todosService.todos$.next(todos);
        console.log('Todos: ', todos);
      });
  }

  filterByActive() {
    this.http.get<Todo1[]>(`https://mate.academy/students-api/todos?userId=${userId}&completed=false`)
      .subscribe(todos => {
        this.todosService.todos$.next(todos);
        console.log('Active todos: ', todos);
      });
  }

  filterByCompleted() {
    this.http.get<Todo1[]>(`https://mate.academy/students-api/todos?userId=${userId}&completed=true`)
      .subscribe(todos => {
        this.todosService.todos$.next(todos);
        console.log('Completed todos: ', todos);
      });
  }
}
