import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IInputs } from "@app/shared/interfaces";
import { fadeIn, fadeOut } from "@app/shared/animations";
import { FormsService } from "@app/core/services/forms.service";
import { AuthService } from "@app/core/services/auth.service";
import { ApiError } from "@app/shared/models";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
  animations: [fadeIn, fadeOut],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("form", { static: true }) form: ElementRef;

  isSubmitted: boolean;
  pending: boolean;

  changePasswordForm: FormGroup;
  formInputs: IInputs = {
    password: {
      field: "password",
      label: "Nowe hasło",
      name: "password",
      type: "password",
    },
    confirmPassword: {
      field: "confirmPassword",
      label: "Powtórz nowe hasło",
      name: "confirmPassword",
      type: "password",
    },
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
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ]),
        ],
        confirmPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ]),
        ],
      },
      {
        validators: [
          this.formsService.checkIfValuesMatching(
            "password",
            "confirmPassword",
            "password"
          ),
        ],
      }
    );
  }

  submit() {
    this.isSubmitted = true;
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid || this.pending) {
      return;
    }
    this.pending = true;
    this.authService
      .update({
        password: this.changePasswordForm.get("password").value,
      })
      .subscribe(
        (res) => {
          this.router.navigate(["/app"]);
        },
        (err: ApiError) => {
          err.errors.forEach((error) => {
            if (error.param) {
              const field = this.changePasswordForm.get(error.param);
              if (field) {
                field.setErrors({
                  [error.message]: true,
                  ...field.errors,
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
