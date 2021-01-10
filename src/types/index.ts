export type TSession = {
  id: string,
  userId: string,
  dateOfExpiry: number,
};

export type TUser = {
  id: string,
  username: string,
  password: string,
  permissions: {allow: Array<string>, deny: Array<string>},
}

export type TNote = {
  id: string,
  userId: string,
  date: string,
  text: string,
}

export type TError = {
  code: number,
  message: string,
}

export type TRequestData = {
  endpoint: string,
  session?: string,
  username?: string,
  userId?: string,
  data?: string,
}

export type TResponseData = {
  status: {
    code: number,
    message: string,
  },
  session?: string,
  data?: string,
}

export type TApiMethod = (request: TRequestData)=>Promise<TResponseData>;
export type TApi = {[index: string]: TApiMethod, };
