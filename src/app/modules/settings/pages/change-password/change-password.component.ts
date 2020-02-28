import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IInputs } from "@app/shared/interfaces";
import { fadeIn, fadeOut } from "@app/shared/animations";
import { FormsService } from "@app/core/services/forms.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
  animations: [fadeIn, fadeOut]
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("form", { static: true }) form: ElementRef;

  isSubmitted: boolean;
  pending: boolean;

  changePasswordForm: FormGroup;
  formInputs: IInputs = {
    currentPassword: {
      field: "currentPassword",
      label: "Aktualne hasło",
      name: "currentPassword",
      type: "password"
    },
    password: {
      field: "password",
      label: "Nowe hasło",
      name: "password",
      type: "password"
    },
    confirmPassword: {
      field: "confirmPassword",
      label: "Powtórz nowe hasło",
      name: "confirmPassword",
      type: "password"
    }
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private formsService: FormsService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ])
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

  checkPasswords(control: FormGroup) {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    const passwordsEqual = password.value === confirmPassword.value;

    if (passwordsEqual) {
      confirmPassword.setErrors(confirmPassword.errors);
    } else {
      confirmPassword.setErrors({
        passwordMismatch: true,
        ...confirmPassword.errors
      });
    }
  }

  submit() {
    this.isSubmitted = true;
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid || this.pending) {
      return;
    }
    this.router.navigate(["/app"]);
  }
}
