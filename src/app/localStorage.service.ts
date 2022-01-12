import { Injectable } from '@angular/core';
import { Todo } from './interface';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  setLocalStorage(key: string, value: Todo[]) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}
