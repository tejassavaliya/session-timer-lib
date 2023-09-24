import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
    constructor() { }
    delete = (key: string, useSessionStorage: boolean = false): void => {
        useSessionStorage
          ? sessionStorage.removeItem(key)
          : localStorage.removeItem(key);
    };

    save = <T>(
        item: T,
        key: string,
        useSessionStorage: boolean = false
        ): void => {
        useSessionStorage
            ? sessionStorage.setItem(key, JSON.stringify(item))
            : localStorage.setItem(key, JSON.stringify(item));
    };

    exists = (key: string): boolean => {
        return !!localStorage.getItem(key);
    };

    get = (key: string, useSessionStorage: boolean = false): any => {
      return localStorage.getItem(key)
    };
    deleteAllExceptOther = (exceptionKeys: any ): void => {
        for (let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);

            if (key && exceptionKeys.indexOf(key) === -1) {
                localStorage.removeItem(key);
            }
        }
    }
    deleteAll = (): void => {
        localStorage.clear();
    };
}
