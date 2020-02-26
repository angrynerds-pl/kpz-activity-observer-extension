import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IInputs} from "@app/shared/interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fadeIn, fadeOut} from "@app/shared/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [fadeIn, fadeOut]
})
export class LoginComponent implements OnInit {
  @ViewChild('form', {static: true}) form: ElementRef;

  isSubmitted: boolean;
  pending: boolean;

  loginForm: FormGroup;
  formInputs: IInputs = {
    email: {
      field: 'email',
      label: 'Email',
      name: 'email',
      type: 'text'
    },
    password: {
      field: 'password',
      label: 'Hasło',
      name: 'password',
      type: 'password'
    }
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
      ]
    });
    this.form.nativeElement.querySelector('.mat-input-element').focus();
  }

  submit() {
    this.isSubmitted = true;
    this.loginForm.markAllAsTouched();
    // if (this.loginForm.invalid || this.pending) {
    //   return;
    // }
    // this.formSubmit.emit(this.loginForm.value);
    this.router.navigate(['/app']);
  }
}
