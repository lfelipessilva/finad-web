export type User = {
  name: string;
  lastName: string;
  password: string;
  email: string;
}

export type SignUpUserProps = {
  name: string,
  lastName: string,
  email: string,
  password: string,
}

export type SignInUserProps = {
  email: string;
  password: string;
}