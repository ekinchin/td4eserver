export interface IStorage {
  constructor: (database: string) => string,
  create:(document: string) => Promise<string>,
  read: (field: string, value: string) => Promise<string>,
  update: (field: string, value: string, document: string) => Promise<string>,
  delete: (field: string, value: string) => Promise<string>,
}
