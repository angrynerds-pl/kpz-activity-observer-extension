export class UserCredentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class UserTokens {
  accessToken: string;
  token?: string;
  refreshToken?: string;
}

export class UserDecodedTokens extends UserTokens {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export class NewUser {
  name: string;
  surname: string;
  password: string;
  email: string;

  constructor(props?: any) {
    this.name = props.name;
    this.surname = props.surname;
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
