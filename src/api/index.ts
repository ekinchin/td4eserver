// /* eslint-disable global-require */
// /* eslint-disable import/no-dynamic-require */
// import fs from 'fs';

// const moduleValidate = (module: any) => {
//   if (!module) return false;
//   const { description, run } = module;
//   const typeModule = typeof module;
//   const typeDescription = typeof description;
//   const typeRun = typeof run;
//   if (typeModule !== 'object') return false;
//   if (!description) return false;
//   if (!run) return false;
//   if (typeDescription !== 'string') return false;
//   if (typeRun !== 'function') return false;
//   return true;
// };

// const parser = (data: any) => {
//   const { path } = data;
//   return path;
// };

// const apiLoad = () => {
//   const files = fs.readdirSync('./dist/api');
//   const modules = files.filter((filename) => filename !== 'index.js');
//   return modules.reduce((api, file) => {
//     const endpoint: string = `/${file.slice(0, -3)}`;
//     const modulepath: string = `./${file}`;
//     const module = require(modulepath).default;
//     // eslint-disable-next-line no-param-reassign
//     if (moduleValidate(module)) api[endpoint] = module;
//     return api;
//   }, {});
// };

// const api = apiLoad();

// const dispatch = async (data: any) => {
//   const { endpoint, ...payload } = parser(data);
//   await api[endpoint].run(payload);
// };

// export default dispatch;
