export type sessionType = {
  id: string;
  username: string;
  dateOfExpiry: number;
};

export type sessionDBType = { [index: string]: sessionType };

export type userType = {
  username: string,
  password: string,
  permissions: {allow: Array<string>, deny: Array<string>}
}

export type noteType = {
  id: string,
  date: string,
  text: string,
}
