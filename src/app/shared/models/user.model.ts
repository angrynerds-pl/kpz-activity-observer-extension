export class UserCredentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class UserTokens {
  refreshToken: string;
  token: string;
}

export class UserDecodedTokens extends UserTokens {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export class NewUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;

  constructor(props?: any) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
    this.email = props.email;
  }
}

export class User {
  firstName: string;
  lastName: string;
  refreshToken: string;
  token: string;
  email: string;
  id: string;

  constructor(props: Partial<UserDecodedTokens>) {
    Object.assign(this, props);
  }
}
