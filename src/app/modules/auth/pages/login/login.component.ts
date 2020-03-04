import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IInputs } from "@app/shared/interfaces";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fadeIn, fadeOut } from "@app/shared/animations";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/services/auth.service";
import { ApiError } from "@app/shared/models/api.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  animations: [fadeIn, fadeOut]
})
export class LoginComponent implements OnInit {
  @ViewChild("form", { static: true }) form: ElementRef;

  isSubmitted: boolean;
  pending: boolean;

  loginForm: FormGroup;
  formInputs: IInputs = {
    email: {
      field: "email",
      label: "Email",
      name: "email",
      type: "email"
    },
    password: {
      field: "password",
      label: "Hasło",
      name: "password",
      type: "password"
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
      ]
    });
    this.form.nativeElement.querySelector(".mat-input-element").focus();
  }

  submit() {
    this.isSubmitted = true;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this.pending = true;
    this.authService
      .login({
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value
      })
      .subscribe(
        res => {
          this.router.navigate(["/app"]);
        },
        (err: ApiError) => {
          err.errors.forEach(error => {
            if (error.param) {
              const field = this.loginForm.get(error.param);
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
