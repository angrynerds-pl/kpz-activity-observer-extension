import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IInputs } from "@app/shared/interfaces";
import { fadeIn, fadeOut } from "@app/shared/animations";
import { FormsService } from "@app/core/services/forms.service";
import { AuthService } from "@app/core/services/auth.service";
import { ApiError } from "@app/shared/models";

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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private formsService: FormsService,
    private authService: AuthService
  ) {}

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
            Validators.maxLength(32)
          ])
        ],
        confirmPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(32)
          ])
        ]
      },
      {
        validators: [
          this.formsService.checkIfValuesMatching(
            "password",
            "confirmPassword",
            "password"
          )
        ]
      }
    );
  }

  submit() {
    this.registerForm.markAllAsTouched();
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.pending = true;
    this.authService
      .register({
        email: this.registerForm.get("email").value,
        name: this.registerForm.get("name").value,
        surname: this.registerForm.get("surname").value,
        password: this.registerForm.get("password").value
      })
      .subscribe(
        res => {
          if (res.status === 201) {
            this.router.navigate(["/"]);
          }
        },
        (err: ApiError) => {
          err.errors.forEach(error => {
            if (error.param) {
              const field = this.registerForm.get(error.param);
              if (field) {
                field.setErrors({
                  [error.message]: true,
                  ...field.errors
                });
              }
            }
          });
        }
      )
      .add(() => {
        this.pending = false;
      });
  }
}
