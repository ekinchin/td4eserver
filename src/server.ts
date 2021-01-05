/* eslint-disable import/extensions */
/* eslint-disable no-console */
// import https from 'https';
import http from 'http';

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

const createServer = (webController: (request: any, response: any, data: any) => Promise<void>) => {
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
      request.on('end', async () => webController(request, response, data));
    });
};

export default createServer;
