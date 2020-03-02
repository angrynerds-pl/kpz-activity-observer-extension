import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { messageTypes } from "@app/shared/types";
import { ApiError } from "@app/shared/models";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  config: MatSnackBarConfig = {
    duration: 5000
  };

  constructor(private snackBar: MatSnackBar) {}

  open(message: string, type: messageTypes) {
    this.snackBar.open(message, "", { ...this.config, panelClass: type });
  }

  openErrors(err: ApiError, errorsToDisplay?: string[]) {
    if (!err.errors) {
      return this.open("Wystąpił nieznany błąd 🤖", "danger");
    }
    // TODO: tłumaczenie kodów błędów z API żeby wyświetlać komunikaty

    // err.errors.forEach(item => {
    //   if (errorsToDisplay) {
    //     if (errorsToDisplay.includes(item.message)) {
    //       this.open(item.translatedMessage, 'danger');
    //     }
    //   } else {
    //     this.open(item.translatedMessage, 'danger');
    //   }
    // });
  }
}
