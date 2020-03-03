export class ApiResponse<T> {
  status: number;
  data: T;
  meta: any;
}

export class ApiError {
  status: number;
  name?: string;
  errors?: {
    param?: string;
    message?: string;
  }[];

  constructor(error: any) {
    if (error) {
      this.status = error.status;
      this.errors = error.errors;
      this.name = error.name;
    }
  }
}
