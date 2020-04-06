import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IInputs } from "@app/shared/interfaces";
import { fadeIn, fadeOut } from "@app/shared/animations";
import { FormsService } from "@app/core/services/forms.service";
import { AuthService } from "@app/core/services/auth.service";
import { ApiError } from "@app/shared/models";

@Component({
  selector: "app-change-name",
  templateUrl: "./change-name.component.html",
  styleUrls: ["./change-name.component.scss"],
  animations: [fadeIn, fadeOut],
})
export class ChangeNameComponent implements OnInit {
  @ViewChild("form", { static: true }) form: ElementRef;

  isSubmitted: boolean;
  pending: boolean;

  changeNameForm: FormGroup;
  formInputs: IInputs = {
    name: {
      field: "name",
      label: "Nowe imię",
      name: "name",
      type: "text",
    },
    surname: {
      field: "surname",
      label: "Nowe nazwisko",
      name: "surname",
      type: "text",
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
    this.changeNameForm = this.formBuilder.group({
      name: [""],
      surname: [""],
    });
  }

  submit() {
    this.isSubmitted = true;
    this.changeNameForm.markAllAsTouched();
    if (this.changeNameForm.invalid || this.pending) {
      return;
    }
    this.pending = true;
    this.authService
      .update({
        name: this.changeNameForm.get("name").value,
        surname: this.changeNameForm.get("surname").value,
      })
      .subscribe(
        (res) => {
          this.router.navigate(["/app"]);
        },
        (err: ApiError) => {
          err.errors.forEach((error) => {
            if (error.param) {
              const field = this.changeNameForm.get(error.param);
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
