interface IAuthLogin {
  mobile: string;
  password: string;
}

interface IAuthLoginVo {
  token: string;
  expires: string;
}

export { IAuthLogin, IAuthLoginVo };
