import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IInputs } from "@app/shared/interfaces";
import { fadeIn, fadeOut } from "@app/shared/animations";
import { FormsService } from "@app/core/services/forms.service";

@Component({
  selector: "app-change-email",
  templateUrl: "./change-email.component.html",
  styleUrls: ["./change-email.component.scss"],
  animations: [fadeIn, fadeOut]
})
export class ChangeEmailComponent implements OnInit {
  @ViewChild("form", { static: true }) form: ElementRef;

  isSubmitted: boolean;
  pending: boolean;

  changeEmailForm: FormGroup;
  formInputs: IInputs = {
    email: {
      field: "email",
      label: "Nowy e-mail",
      name: "email",
      type: "email"
    },
    confirmEmail: {
      field: "confirmEmail",
      label: "Powtórz nowy e-mail",
      name: "confirmEmail",
      type: "email"
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
    this.changeEmailForm = this.formBuilder.group(
      {
        email: [
          "",
          Validators.compose([Validators.required, Validators.email])
        ],
        confirmEmail: [
          "",
          Validators.compose([Validators.required, Validators.email])
        ]
      },
      {
        validators: [
          this.formsService.checkIfValuesMatching(
            "email",
            "confirmEmail",
            "email"
          )
        ]
      }
    );
  }

  submit() {
    this.isSubmitted = true;
    this.changeEmailForm.markAllAsTouched();
    if (this.changeEmailForm.invalid || this.pending) {
      return;
    }
    this.router.navigate(["/app"]);
  }
}
