interface InLogin {
  email: string;
  password: string;
}

interface OutLogin {
  idUser: number,
  email: string,
  name: string,
  about: string,
  photo: string
}

export type {
  InLogin,
  OutLogin
}
