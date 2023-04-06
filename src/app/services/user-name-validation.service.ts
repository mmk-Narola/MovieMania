import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserRegistration } from '../models/userRegistration';
import { UserService } from './user.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNameValidationService {
  constructor(private readonly userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.validateUserName(control.value).pipe(
      // TODO: Debounce is not working properly.
      debounceTime(1000),
      distinctUntilChanged(),
      map((isUserNameAvailable) => {
        if (isUserNameAvailable) {
          return null;
        } else {
          return { userNameNotAvailable: true };
        }
      }),
      catchError(() => of(null))
    );
  }
}
