export interface IStorage {
  constructor: (database: string) => string,
  create:(document: string) => Promise<string>,
  read: (field: string, value: string) => Promise<string>,
  update: (UUID: string, document: string) => Promise<string>,
  delete: (UUID: string) => Promise<string>,
}
