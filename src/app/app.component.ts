import { Component, DoCheck, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, BehaviorSubject, Observable, tap, filter, map, combineLatest } from 'rxjs';
import { Todo } from './interface';
import { LocalStorageService } from './localStorage.service';
import { TodosService } from './todos-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {
  visibleTodos$!: Observable<Todo[]>;
  notCompletedTodos$!: Observable<Todo[]>;
  todos: Todo[] = this.locStorage.getLocalStorage('todos');;
  buttonStatus: boolean = false;
  filter = new BehaviorSubject<string>('all');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locStorage: LocalStorageService,
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    // const filter = this.route.snapshot.queryParamMap.get('filter');
    // this.route.queryParams.subscribe((value) => {
    //   console.log('Filter: from subscribe', value);
    //   this.filter = value['filter'];
    //   console.log('Filter: ', this.filter);
    // });
 
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.route.queryParams
    ).pipe(
      tap(([todos]) => {
        console.log('actual todos', todos)
      }),
      map(([todos, {filter}]) => {
        console.log('todoFilter', filter);
        if (filter === 'all') {
          return todos;
        } else if (filter === 'active') {
          return todos.filter(item => item.completed === false);
        }

        return todos.filter(item => item.completed === true);
      })

    )

    this.notCompletedTodos$ = this.todosService.todos$.pipe(
      tap((todo) => {
        console.log('todo', todo)
        console.log('this.buttonStatus', this.buttonStatus)
        this.buttonStatus = todo.some(el => el.completed)
      }),
      map((todos) => todos.filter((todo) => !todo.completed)), 
    );

    
  }

  ngDoCheck() {
    // this.buttonStatus = this.todosService.todos$.value.some(el => el.completed);
  }

  // This method filters todolist by click
  onFilterChange(value: string) {
    this.router.navigate([''], { queryParams: { filter: value } });
  }

  // Next methods transform list
  addTodo(newTodo: Todo) {
    this.todosService.addTodo(newTodo);
    
  }

  updateTodos(allTodosStatus: boolean) {
    this.todosService.updateTodos(allTodosStatus);
  }

  completedRemove() {
    this.todosService.completedRemove();
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo);
  }

  changeStatus(todo: Todo) {
    this.todosService.changeStatus(todo);
  }

  changeTitle(todo: Todo) {
    this.todosService.changeTitle(todo);
  }
}
