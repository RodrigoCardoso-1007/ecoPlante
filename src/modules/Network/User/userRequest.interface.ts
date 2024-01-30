interface InLogin {
  email: string;
  password: string;
}

interface OutLogin {
  email: string,
  name: string,
  about?: string,
  img?: string,
  token: string
}

interface InUpdate {
  name: string,
  about: string,
  img: string
}

interface CreateAccount extends InLogin {
  name: string;
}

export type {
  InLogin,
  OutLogin,
  CreateAccount,
  InUpdate
}
