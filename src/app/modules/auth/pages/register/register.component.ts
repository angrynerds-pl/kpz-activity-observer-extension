import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IInputs } from "@app/shared/interfaces";
import { fadeIn, fadeOut } from "@app/shared/animations";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  animations: [fadeIn, fadeOut]
})
export class RegisterComponent implements OnInit {
  @ViewChild("form", { static: true }) form: ElementRef;

  isSubmitted: boolean;
  pending: boolean;

  registerForm: FormGroup;
  formInputs: IInputs = {
    name: {
      field: "name",
      label: "Imię",
      name: "name",
      type: "text"
    },
    surname: {
      field: "surname",
      label: "Nazwisko",
      name: "surname",
      type: "text"
    },
    email: {
      field: "email",
      label: "Email",
      name: "email",
      type: "text"
    },
    password: {
      field: "password",
      label: "Hasło",
      name: "password",
      type: "password"
    },
    confirmPassword: {
      field: "confirmPassword",
      label: "Powtórz hasło",
      name: "confirmPassword",
      type: "password"
    }
  };
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: ["", Validators.compose([Validators.required])],
        surname: ["", Validators.compose([Validators.required])],
        email: [
          "",
          Validators.compose([Validators.required, Validators.email])
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ])
        ],
        confirmPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ])
        ]
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(control: FormGroup) {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    const passwordsEqual = password.value === confirmPassword.value;

    if (passwordsEqual) {
      confirmPassword.setErrors(null);
    } else {
      confirmPassword.setErrors({
        passwordMismatch: true,
        ...confirmPassword.errors
      });
    }
  }

  submit() {
    this.isSubmitted = true;
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid || this.pending) {
      return;
    }
    this.router.navigate(["/app"]);
  }
}
