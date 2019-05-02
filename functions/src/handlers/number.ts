//@ts-ignore
import validate from 'express-validation';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
//@ts-ignore
import morganBody from 'morgan-body';
import ErrorHandler from '../utils/ErrorHandler';
const bodyParser = require('body-parser');


module.exports = (functions: any) => {
  const app = express();
  app.use(bodyParser.json());

  if (process.env.VERBOSE_LOG === 'false') {
    console.log('Using simple log');
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  } else {
    console.log('Using verbose log');
    morganBody(app);
  }

  /* CORS Configuration */
  const openCors = cors({ origin: '*' });
  app.use(openCors);

  




  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}