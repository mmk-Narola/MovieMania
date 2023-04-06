import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { UserRegistration } from 'src/app/models/userRegistration';
import { UserRegistrationForm } from 'src/app/models/userRegistrationForm';
import { CustomFormValidatorService } from 'src/app/services/custom-form-validator.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserNameValidationService } from 'src/app/services/user-name-validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  userRegistrationForm: FormGroup<UserRegistrationForm>;
  private destroyed$ = new ReplaySubject<void>(1);
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBarService: SnackbarService,
    private readonly userNameValidationService: UserNameValidationService,
    private readonly customFormValidator: CustomFormValidatorService
  ) {}

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group(
      {
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        userName: this.fb.control('', {
          asyncValidators: [
            this.userNameValidationService.validate.bind(
              this.userNameValidationService
            ),
          ],
          validators: [Validators.required],
          updateOn: 'blur',
        }),
        password: this.fb.control('', [
          Validators.required,
          this.customFormValidator.passwordPatternValidor(),
        ]),
        confirmPassword: this.fb.control('', Validators.required),
        gender: this.fb.control('', Validators.required),
      },
      {
        validators: [
          this.customFormValidator.matchPasswordValidator(
            'password',
            'confirmPassword'
          ),
        ],
      }
    );
  }

  protected get registrationFormControl() {
    return this.userRegistrationForm.controls;
  }

  registerUser(): void {
    if (this.userRegistrationForm.valid) {
      this.userService
        .registerUser(this.userRegistrationForm.value as UserRegistration)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.snackBarService.showSnackBar('Error occurred!! Try again');
            console.error(
              'error occurred while trying to register a new user : ',
              error
            );
          },
        });
    } else {
      this.snackBarService.showSnackBar('Please Fill The Form');
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
