/* eslint-disable import/extensions */
/* eslint-disable no-console */
// import https from 'https';
import http from 'http';
// import fs from 'fs';
// import path from 'path';
// eslint-disable-next-line no-unused-vars
import type { TRequestData, TResponseData } from './types';

const DEFAULT_PORT: number = 8000;
const PORT: string | number = process.env.PORT || DEFAULT_PORT;

// const DEFAULT_CERT_DIR: string = './cert';

type CERTIFICATE = {
  key: string,
  cert: string,
  ca: string,
}

// const readCertificate = (dir: string) : CERTIFICATE => {
//   const cwd: string = process.cwd();
//   const fullPath: string = path.resolve(cwd, dir).normalize();
//   if (!fullPath.startsWith(cwd)) throw new Error('access dinied');
//   try {
//     fs.statSync(fullPath);
//   } catch (err) {
//     throw new Error('path not exists');
//   }

//   const cert: CERTIFICATE = {
//     key: fs.readFileSync(`${dir}/privkey.pem`).toString(),
//     cert: fs.readFileSync(`${dir}/cert.pem`).toString(),
//     ca: fs.readFileSync(`${dir}/chain.pem`).toString(),
//   };
//   return cert;
// };

const parseRequest = (request: any, data: string): TRequestData => ({
  endpoint: request.url,
  data,
  session: request.headers.session,
});

const createServer = (ondata: (request: TRequestData) => Promise<TResponseData>) => {
  // https.createServer(readCertificate(DEFAULT_CERT_DIR))
  http.createServer()
    .listen(PORT)
    .on('listen', () => {
      console.log(`server running on port ${PORT}`);
    })
    .on('error', (err: Error) => {
      console.error(err);
    })
    .on('request', (request, response) => {
      const { url, method } = request;
      if (!url.startsWith('/api/') || method !== 'POST') {
        response.statusCode = 403;
        response.end();
      }
      let data: string = '';
      request.on('data', (chunk: string) => { data += chunk; });
      request.on('end', async () => {
        const parsedRequest: TRequestData = parseRequest(request, data);
        const endpointAnswer: TResponseData = await ondata(parsedRequest);
        response.statusCode = endpointAnswer.status.code ? 400 : 200;
        response.setHeader('Content-Type', 'application/json');
        if (endpointAnswer.data) response.write(JSON.stringify(endpointAnswer.data));
        response.end();
      });
    });
};

export default createServer;
