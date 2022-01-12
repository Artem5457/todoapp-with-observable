import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './interface';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  // We do not subscribe in services
  todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(
    private locStorage: LocalStorageService,
    private router: Router,
  ) {
    this.todos$.next(this.locStorage.getLocalStorage('todos'));
  }

  addTodo(newTodo: Todo): void {
    this.todos$.next([
      ...this.todos$.value,
      newTodo
    ]);

    this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  deleteTodo(todo: Todo): void {
    this.todos$.next(this.todos$.value.filter(item => todo.id !== item.id));

    this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  changeStatus(todo: Todo): void {

    this.todos$.next(this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return {
          ...item,
          completed: !item.completed
        }
      }

      return item;
    }));

    this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  changeTitle(todo: Todo) {
    this.todos$.next(this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return {
          ...todo
        }
      }

      return item;
    }));

    this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  completedRemove() {
    this.router.navigate([''], { queryParams: { filter: 'all' } });

    this.todos$.next(this.todos$.value.filter(item => !item.completed));
    this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  updateTodos(allTodosStatus: boolean) {
    // this.todosService.updateTodo(newTodo);
    
    this.todos$.next(this.todos$.value.map(item => {
      return {
        ...item,
        completed: allTodosStatus
      }
    }));

    this.locStorage.setLocalStorage('todos', this.todos$.value);
  }
}
