export type TSession = {
  id: string,
  username: string,
  dateOfExpiry: number,
};

export type TUser = {
  username: string,
  password: string,
  permissions: {allow: Array<string>, deny: Array<string>},
}

export type TNote = {
  id: string,
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

export type TApi = {[index: string]: any, };
