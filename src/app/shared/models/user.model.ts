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
}

export class UserDecodedTokens extends UserTokens {
  // firstName: string;
  // lastName: string;
  email: string;
  _id: string;
  accessToken: string;
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
  // name: string;
  // surname: string;
  // refreshToken: string;
  accessToken: string;
  email: string;
  id: string;

  constructor(props: Partial<UserDecodedTokens>) {
    this.id = props._id;
    delete props._id;
    Object.assign(this, props);
  }
}
