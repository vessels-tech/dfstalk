//@ts-ignore
import validate from 'express-validation';
import express from 'express';
import cors from 'cors';
import ErrorHandler from '../utils/ErrorHandler';

import CreateNumberValidation from '../validators/CreateNumberValidation';
import enableLogging from '../utils/Logging';
import { validateBasicAuth } from '../middleware';

const bodyParser = require('body-parser');

module.exports = (functions: any) => {
  const app = express();
  app.use(bodyParser.json());
  enableLogging(app); 
 
  /* CORS Configuration */
  const openCors = cors({ origin: '*' });
  app.use(openCors);

  /* Auth Middleware */
  app.use(validateBasicAuth);


  /**
   * CreateNumber
   * 
   * @description Specify the number and language to generate an audio file
   */
  app.post('/', validate(CreateNumberValidation), async (req, res) => {
    const { language, number } = req.body;

    console.log("lang and number is:", language, number);

    //TODO: make sure language code is available

    //Using NumberBuilder, generate a list of audio files to be compiled
    //Using FileBuilder, load files and append into a single file
    //Set expiry on file, upload to storage
    //get the download url, and format response

    res.json({
      expiry: 10,
      url: "url.com",
    });
  });

  /**
   * GetNumberLanguages
   * 
   * @description Gets the available language codes for the number audio generator
   */
  app.get('/languages', async (req, res) => {
    
    //TODO: make sure language code is available

    res.json([
      'en_au',
    ]);
  });


  /* Error Handling - must be at bottom! */
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}